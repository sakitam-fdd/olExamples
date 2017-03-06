/**
 * Created by FDD on 2016/7/14.
 */
/**
 * Created by FDD on 2016/7/5.
 */
'use strict';
define(['ol', 'truf', 'proj4', 'broadcastNameEnum', 'mappopup', 'maplegend', 'maptitle', 'util', 'echarts', 'appConfig','thematicService'],
  function (ol, truf, proj4, broadcastNameEnum, MapPopup, MapLegend, MapTitle, util, echarts, appConfig,thematicService) {
    //弄清楚需要哪些依赖？
    window.ol = ol;
    require(["p-ol3"], function (P) {
      window.P = P;
    });
    var app = {};
    app.Drag = function () {//地图手势交互
      ol.interaction.Pointer.call(this, {
        handleDownEvent: app.Drag.prototype.handleDownEvent,
        handleDragEvent: app.Drag.prototype.handleDragEvent,
        handleMoveEvent: app.Drag.prototype.handleMoveEvent,
        handleUpEvent: app.Drag.prototype.handleUpEvent
      });
      this.customType = "appDrag";
      /**
       * @type {ol.Pixel}
       * @private
       */
      this.coordinate_ = null;

      /**
       * @type {string|undefined}
       * @private
       */
      this.cursor_ = 'pointer';

      /**
       * @type {ol.Feature}
       * @private
       */
      this.feature_ = null;

      /**
       * @type {string|undefined}
       * @private
       */
      this.previousCursor_ = undefined;

    };
    ol.inherits(app.Drag, ol.interaction.Pointer);//继承的原型方法构造函数（child,parent）

    /**
     * @param {ol.MapBrowserEvent} evt Map browser event.
     * @return {boolean} `true` to start the drag sequence.
     */
    app.Drag.prototype.handleDownEvent = function (evt) {
      if (evt.originalEvent.button === 0/*鼠标左键*/) {
        var map = evt.map;
        var feature = map.forEachFeatureAtPixel(evt.pixel,
          function (feature) {
            return feature;
          });
        if (feature && feature.get("params") && feature.get("params").moveable) {
          this.coordinate_ = evt.coordinate;
          this.feature_ = feature;
        }
        return !!feature;
      }
    };

    /**
     * @param {ol.MapBrowserEvent} evt Map browser event.
     */
    app.Drag.prototype.handleDragEvent = function (evt) {
      if (!this.coordinate_) {
        return;
      }
      var deltaX = evt.coordinate[0] - this.coordinate_[0];
      var deltaY = evt.coordinate[1] - this.coordinate_[1];
      var geometry = /** @type {ol.geom.SimpleGeometry} */
        (this.feature_.getGeometry());
      geometry.translate(deltaX, deltaY);
      this.coordinate_[0] = evt.coordinate[0];
      this.coordinate_[1] = evt.coordinate[1];
      this.feature_.dispatchEvent("featureMove");
    };

    /**
     * @param {ol.MapBrowserEvent} evt Event.
     */
    app.Drag.prototype.handleMoveEvent = function (evt) {
      if (this.cursor_) {
        var map = evt.map;
        var feature = null;
        if (this.feature_) {
          feature = this.feature_;
        } else {
          feature = map.forEachFeatureAtPixel(evt.pixel,
            function (feature) {
              return feature;
            });
        }

        var element = evt.map.getTargetElement();
        if (feature) {
          if (element.style.cursor != this.cursor_) {
            this.previousCursor_ = element.style.cursor;
            element.style.cursor = this.cursor_;
          }
        } else if (this.previousCursor_ !== undefined) {
          element.style.cursor = this.previousCursor_;
          this.previousCursor_ = undefined;
        }
      }
    };

    /**
     * @return {boolean} `false` to stop the drag sequence(拖拽顺序).
     */
    app.Drag.prototype.handleUpEvent = function () {
      window.testdrag = false;
      this.coordinate_ = null;
      this.feature_ = null;
      return false;
    };
    /*
     * 定义一个地图对象
     * */
    var HDMap = function () {
      proj4.defs("EPSG:4490", "+proj=longlat +ellps=GRS80 +no_defs");
      ol.proj.setProj4(proj4);
      this.queryparams = null;
      this.polygonLayers = [];//面图层集合
      this.lineLayers = [];//线图层集合
      this.pointLayers = [];//点图层集合
      this.plotDraw = null;//标绘工具
      this.plotEdit = null;
      this.layerparams = null;//地图叠加路线时，把路线的qdzh、zdzh、lxdm、sxxfx组织起来，供图层列表叠加使用，形如{qdzh:0,zdzh:12,sxxfx:1,lxdm:'G104'}
      window.ObservableObj = new ol.Object();
      this.map = null;
      this.tempVectorLayer = null;
      this.tempAddline = [];//线段临时绘制图层
      this.wgs84Sphere = new ol.Sphere(6378137);
      this.popupOverlay = null;
      this.drawPointermove = null;
      /**
       * 当前绘制的要素.
       * @type {ol.Feature}
       */
      this.drawSketch = null;
      this.listener = null;
      /**
       * Overlay to show the help messages.
       * @type {ol.Overlay}
       */
      this.measureHelpTooltip = null;
      this.selectInteraction = null;
      this.draw = null;
      this.tempVectorLayer = null;
      this.mapTools = {
        drawPlot: false, drawSquare: false, drawArraw: false,
        drawLine: false, drawCircle: false, drawPolygon: false,
        drawRect: false, addPoint: false,
        addTitle: false, addTextArea: false, zoomIn: false,
        zoomOut: false, iQuery: false, measureLength: false,
        measureArea: false, showLayers: false, drawBox: false,
        toolsType: {
          drawPlot: "drawPlot", drawSquare: "drawSquare",
          drawArraw: "drawArraw", drawLine: "drawLine",
          drawCircle: "drawCircle", drawPolygon: "drawPolygon",
          drawRect: "drawRect", drawBox: "drawBox", addPoint: "addPoint",
          addTitle: "addTitle", addTextArea: "addTextArea",
          zoomIn: "zoomIn", zoomOut: "zoomOut",
          iQuery: "iQuery", measureLength: "measureLength",
          measureArea: "measureArea", showLayers: "showLayers"
        }
      }

      /*
       *   初始化地图
       * */
      this.initHDMap = function (mapDiv) {//此函数在mainCtrl里调用
        proj4.defs("EPSG:4490", "+proj=longlat +ellps=GRS80 +no_defs");//GIS坐标转换库
        var tileUrl;
        var self = this;
        var len = appConfig.layerConfig.baseLayers.length;
        for (var i = 0; i < len; i++) {
          var layerConfig = appConfig.layerConfig.baseLayers[i];
          if (layerConfig.isDefault) {
            tileUrl = layerConfig.layerUrl;
            break;
          }
        }
        $.ajax({
          url: tileUrl + "?f=pjson",
          type: "GET",
          dataType: 'jsonp',
          jsonp: 'callback',
          success: function (data) {
            if (data && data.error) {
              window.hdsxRootScope.$broadcast(broadcastNameEnum.alertWindowShow, {
                flag: true,
                data: {
                  title: "提示",
                  content: "加载地图失败，请联系地图服务提供商！"
                }
              });
              return;
            }
            appConfig.mapinfo = data;
            var fullExtent = [data.fullExtent.xmin, data.fullExtent.ymin, data.fullExtent.xmax, data.fullExtent.ymax];
            var projection = ol.proj.get("EPSG:" + data.spatialReference.wkid);
            projection.setExtent(fullExtent);
            var resolutions = [];
            var origin = [data.tileInfo.origin.x, data.tileInfo.origin.y];
            var len = data.tileInfo.lods.length;

            for (var i = 0; i < len; i++) {
              resolutions.push(data.tileInfo.lods[i].resolution);
            }
            var tileGrid = new ol.tilegrid.TileGrid({
              tileSize: data.tileInfo.cols,
              origin: origin,
              extent: fullExtent,
              resolutions: resolutions
            });
            var urlTemplate = tileUrl + "/tile/{z}/{y}/{x}";
            var tileArcGISXYZ = new ol.source.XYZ({//XYZ 格式的切片数据，继承自 ol.source.TileImage
              wrapX: false,//是否包含世界地图，默认true
              tileGrid: tileGrid,//瓦片网格
              projection: projection,//地图投影映射
              tileUrlFunction: function (tileCoord) {//获得给定一个瓦片地图URL坐标和投影
                var url = urlTemplate.replace('{z}', (tileCoord[0]).toString())
                  .replace('{x}', tileCoord[1].toString())
                  .replace('{y}', (-tileCoord[2] - 1).toString());
                return url;
              }
            });
            var baseLayer = new ol.layer.Tile({//基本图层：二维，影像，DOM
              isBaseLayer: true,//通用基本图层
              isCurrentBaseLayer: true,//当前通用基本图层
              layerName: appConfig.layerConfig.baseLayers[0].layerName,
              source: tileArcGISXYZ,
              extent: fullExtent
            });
            /*
             *   创建一个地图图层
             * */
            self.map = new ol.Map({
              target: mapDiv,
              interactions: ol.interaction.defaults({doubleClickZoom: false}).extend([new app.Drag()]),
              controls: [new ol.control.ScaleLine({//Controls initially added to the map. If not specified, ol.control.defaults() is used.
                target: "hdscalebar"
              }), new ol.control.Loading()],
              layers: [baseLayer],    //必须定义
              view: new ol.View({
                center: ol.proj.fromLonLat(appConfig.mapConfig.center, projection),//从经度/纬度坐标转换到一个不同的投影,pro:目标投射
                zoom: appConfig.mapConfig.zoom,//目标缩放
                projection: projection,
                extent: fullExtent,
                maxResolution: resolutions[0],
                minResolution: resolutions[len - 1]
              })
            });
            window.ObservableObj.dispatchEvent("MapInitialized");
            self._addImageBaseLayer();
            self._addGlobeBaseLayer();
            //添加鼠标移动交互
            self.moveInteraction = new ol.interaction.Select({
              condition: ol.events.condition.pointerMove,
              style: function (fea, resolution) {
                var styles = [];
                var style = new ol.style.Style({
                  stroke: new ol.style.Stroke({
                    color: '#D97363',
                    width: 10
                  })
                });
                styles.push(style);
                return styles
              },
              layers: function (layer) {
                return layer.get("selectable");
              },
              filter: function (feat, layer) {
                if (feat.get('features')) {
                  return feat.get('features').length <= 1;
                }
                return true;
              }
            });

            self.moveInteraction.on('select', function (evt) {
              var ret = evt.selected;
              if (ret.length == 0) {
                var deselected = evt.deselected;
                if (deselected.length > 0) {
                  var feat = deselected[0];
                  var layer = feat.get("belongLayer");
                  if (layer && (layer.getSource() instanceof ol.source.Cluster)) {
                    feat.setStyle(layer.getStyle());
                  } else if (feat.get("features")) {
                    var feats = feat.get("features");
                    if (feats[0]) {
                      var _layer = feats[0].get("belongLayer");
                      if (feats[0].get("belongLayer")) {
                        feat.setStyle(_layer.getStyle());
                      }
                    }
                  } else {//恢复鼠标滑过之前的样式
                    var _style = feat.get("unSelectStyle");
                    if (_style) {
                      feat.setStyle(_style);
                    }
                  }
                }
                return;
              }
              var feat = ret[0];
              var layer = self.moveInteraction.getLayer(feat);
              var _style = feat.get("selectStyle") || layer.get("selectedStyle");
              if (_style) {
                feat.setStyle(_style);
              }
              if (feat.get('features')) {
                feat = feat.get('features')[0];
              }
              feat.set("belongLayer", layer);
              window.ObservableObj.set("mouseOnFeature", feat);
            });
            self.map.addInteraction(self.moveInteraction);
            var len = appConfig.layerConfig.baseLayers.length;
            var layerUrl = appConfig.layerConfig.baseLayers[0].url;
            for (var i = 0; i < len; i++) {
              var layerConfig = appConfig.layerConfig.baseLayers[i];
              if (layerConfig.isDefault) {
                layerUrl = layerConfig.layerUrl;
                break;
              }
            }
            self.tempVectorLayer = self.getTempVectorLayer(appConfig.layerConfig.tempLayer.tempVectorLayer, {create: true});
            self.map.on("pointerdrag", function () {
              if (self.popup) {
                self.popup.hide();
              }
            });
            var mapView = document.querySelector(".ol-viewport .ol-unselectable");

            /* $(mapView).on("mousedown", function () {
             mapView.style.cursor = "url(./dist/images/cur/closedhand.cur) 8 8, default";
             });
             $(mapView).on("mouseup", function () {
             mapView.style.cursor = "url(./dist/images/cur/openhand.cur) 8 8, move";
             });*/

            self.map.on("click", function (evt) {
              if (self.popup) {
                self.popup.hide();
              }
              var eventCoordinate = evt.coordinate;
              if (self.mapTools.iQuery) {
                if (self.queryparams != null && self.queryparams.drawend != null) {
                  self.queryparams.drawend(evt);
                  self.mapTools.iQuery = false;
                }
                return;
              } else if (self.mapTools.addTextArea) {
                self._addTextPopup(eventCoordinate);
                return;
              }
              else if (self.plotDraw && !self.plotDraw.isDrawing()) {
                var feature = self.map.forEachFeatureAtPixel(evt.pixel, function (feature) {
                  return feature;
                });
                if (feature && feature.getGeometry().isPlot) {
                  self.plotEdit.activate(feature);  // 开始编辑
                  window.location.hash = "#/app/composite/plotEdit";
                } else {
                  self.plotEdit.deactivate(); // 结束编辑
                  if (window.location.hash == "#/app/composite/plotEdit") {
                    window.location.hash = "#/app/composite/plot";
                  }
                }
              }
              var overlays = self.map.getOverlays();
              overlays.forEach(function (item, index) {
                if (item.get("isEditorContainer") && item.getElement().editor) {
                  item.getElement().editor.destroy();
                  item.getElement().editor.isDestroy = true;
                }
              });
            }, self);

            appConfig.hdmap = self;
            self.popup = new MapPopup();
            var mapLegend = new MapLegend({
              domNodeToAppend: document.getElementsByClassName("ol-viewport")[0]
            });
            self.legend = mapLegend;
            var mapTitle = new MapTitle();
            self.title = mapTitle;
            $(window).resizeend({
              delay: 50
            }, function () {
              self.updateSize();//当页面变化刷新地图
            });

            /*                     var mapSelectInteraction = new MapSelectInteraction();
             self.mapSelectInteraction = mapSelectInteraction;*/
            return self.map;
          },
          error: function (err) {
            console.error(err);
          }
        });
      };
      /*在初始化地图的时候调用，其他情况不允许调用*/
      this._addImageBaseLayer = function () {
        var layerConfig = this.getLayerConfigByName('影像地图');
        var baseLayer = this.initTdtLayer(layerConfig);
        var imglayerConfig = {
          layerName: 'tdtyxzj',
          layer: 'cia',
          layerUrl: 'http://171.34.40.68:6080/arcgis/rest/services/JXMAP_2016/MapServer'
        };
        var imgtitlelayer = this.initTdtLayer(imglayerConfig);
        this.map.getLayers().insertAt(0, baseLayer);
        this.map.getLayers().insertAt(1, imgtitlelayer);
      };
      /*在初始化地图的时候调用，其他情况不允许调用*/
      this._addGlobeBaseLayer = function () {
        var layerConfig = this.getLayerConfigByName('全国地图');
        var baseLayer = this.initGlobeLayer(layerConfig);
        var GlobelayerConfig = {
          layerName: 'GlobeMap',
          layer: 'cia',
          layerUrl: 'http://171.34.40.68:6080/arcgis/rest/services/JXMAP_2016/MapServer'
        };
        var Globetitlelayer = this.initGlobeLayer(GlobelayerConfig);
        this.map.getLayers().insertAt(0, baseLayer);
        this.map.getLayers().insertAt(1, Globetitlelayer);
      };
      /**
       * 初始化全国地图图服务
       * @param layerConfig{layerName,layer,layerUrl} 这三个参数为必须
       */
      this.initGlobeLayer = function (layerConfig) {
        if (!layerConfig || !layerConfig['layerName']) {
          return null;
        }
        var _projection = ol.proj.get('EPSG:4326');
        var size = ol.extent.getWidth(_projection.getExtent()) / 256;
        var _resolutions = new Array(14);
        var matrixIds = new Array(14);
        for (var z = 0; z < 14; ++z) {
          // generate resolutions and matrixIds arrays for this WMTS
          _resolutions[z] = size / Math.pow(2, z);
          matrixIds[z] = z;
        }
        var layer = new ol.layer.Tile({
          isBaseLayer: true,
          isCurrentBaseLayer: true,
          layerName: layerConfig['layerName'],
          opacity: 1,
          visible: false,
          source: new ol.source.WMTS({
            url: layerConfig['layerUrl'],
            layer: layerConfig['layer'],
            matrixSet: 'c',
            format: 'tiles',
            projection: _projection,
            tileGrid: new ol.tilegrid.WMTS({
              origin: ol.extent.getTopLeft(_projection.getExtent()),
              resolutions: _resolutions,
              matrixIds: matrixIds
            }),
            style: 'default',
            wrapX: false
          })
        });
        return layer;
      };
      /**
       * 初始化天地图服务，支持wmmts
       * @param layerConfig{layerName,layer,layerUrl} 这三个参数为必须
       */
      this.initTdtLayer = function (layerConfig) {
        if (!layerConfig || !layerConfig['layerName']) {
          return null;
        }
        var _projection = ol.proj.get('EPSG:4326');
        var size = ol.extent.getWidth(_projection.getExtent()) / 256;
        var _resolutions = new Array(14);
        var matrixIds = new Array(14);
        for (var z = 0; z < 14; ++z) {
          // generate resolutions and matrixIds arrays for this WMTS
          _resolutions[z] = size / Math.pow(2, z);
          matrixIds[z] = z;
        }
        var layer = new ol.layer.Tile({
          isBaseLayer: true,
          isCurrentBaseLayer: true,
          layerName: layerConfig['layerName'],
          opacity: 1,
          visible: false,
          source: new ol.source.WMTS({
            url: layerConfig['layerUrl'],
            layer: layerConfig['layer'],
            matrixSet: 'c',
            format: 'tiles',
            projection: _projection,
            tileGrid: new ol.tilegrid.WMTS({
              origin: ol.extent.getTopLeft(_projection.getExtent()),
              resolutions: _resolutions,
              matrixIds: matrixIds
            }),
            style: 'default',
            wrapX: false
          })
        });
        return layer;
      };
      /*
       * 功能：当页面窗口变化时刷新地图
       * */
      this.updateSize = function () {
        this.map.updateSize();
      };

      /**
       * 判断点是否在视图内，如果不在地图将自动平移
       */
      this.MovePointToView = function (coord) {
        var extent = this.getMapCurrentExtent();
        if (!(ol.extent.containsXY(extent, coord[0], coord[1]))) {
          this.map.getView().setCenter([coord[0], coord[1]]);
        }
      };
      this.removeLayerByName = function (layerName) {
        var layer = this.getlayerByName(layerName);
        if (layer) {
          this.map.removeLayer(layer);
        }
      };
      /*
       * 功能：基本底图切换
       * */
      this.changeBaseLayer = function (layerName) {
        this.map.getLayers().forEach(function (layer) {
          if (layer.get("isBaseLayer")) {
            layer.set("isCurrentBaseLayer", false);
            layer.setVisible(false);
          }
        });
        var baseLayer = this.getlayerByName(layerName);
        if (baseLayer) {
          baseLayer.setVisible(true);
          baseLayer.set("isCurrentBaseLayer", true);
          switch (layerName){
            case "全国地图":
              var GlobeMaplayer = this.getlayerByName('GlobeMap');
              GlobeMaplayer.setVisible(true);
              /*var view = this.map.getView();
               view.setCenter(115.92466595234826, 27.428038204473552);*/
              break;
            case "影像地图":
              var yxlayer = this.getlayerByName('tdtyxzj');
              yxlayer.setVisible(true);
              /*var view = this.map.getView();
               view.setCenter(115.92466595234826, 27.428038204473552);*/
              break;
          }
        }
      };
      /*
       *  功能：获取基础地图
       *
       * */
      this.getBaseLayer = function () {
        var baseLayer = null;
        this.map.getLayers().forEach(function (layer) {
          if (layer.get("isBaseLayer") && layer.get("isCurrentBaseLayer")) {
            baseLayer = layer;
          }
        });
        if (!baseLayer) {
          console.error("获取基础底图出错!");
        }
        return baseLayer;
      };
      /*
       * 功能：获取基础配置
       * */
      this.getLayerConfigByName = function (layerName) {
        var baseLayerConfig = appConfig.layerConfig.baseLayers;
        var featureLayers = appConfig.layerConfig.featureLayers;
        var layers = baseLayerConfig.concat(featureLayers);
        var layer = null;
        for (var length = layers.length, i = 0; i < length; i++) {
          layer = layers[i];
          if (layerName === layer.layerName) {
            break;
          }
        }
        return layer;
      };
      /*
       * 功能：获取临时图层
       * */
      this.getTempTileLayer = function (layerName, params) {
        var vectorLayer = null;
        if (this.map) {
          var layers = this.map.getLayers();
          layers.forEach(function (layer) {
            var layerNameTemp = layer.get("layerName");
            if (layer instanceof ol.layer.Tile && layerNameTemp === layerName) {
              vectorLayer = layer;
              return vectorLayer;
            }
          }, this);
        }
        if (vectorLayer) {
          return vectorLayer;
        }
        if (params && params.create) {
          var urlTemplate = params["urlTemplate"];
          var tileArcGISXYZ = new ol.source.XYZ({
            tileGrid: params.tileGrid,
            projection: params.projection,
            tileUrlFunction: function (tileCoord) {
              var url = urlTemplate.replace('{z}', (tileCoord[0]).toString())
                .replace('{x}', tileCoord[1].toString())
                .replace('{y}', (-tileCoord[2] - 1).toString());
              return url;
            }
          });
          vectorLayer = new ol.layer.Tile({
            source: tileArcGISXYZ
          });
        }
        return vectorLayer;
      };
      /*
       * 功能：创建临时图层，用来放绘制的要素
       * 如果该临时图层存在，则直接返回，如果不存在，则重新创建
       * */
      this.getTempVectorLayer = function (layerName, params) {
        var vectorLayer = this.getlayerByName(layerName);
        if (!(vectorLayer instanceof ol.layer.Vector)) {
          vectorLayer = null;
        }
        if (!vectorLayer) {
          if (params && params.create) {
            var vectorSource = new ol.source.Vector({
              wrapX: false
            });
            vectorLayer = new ol.layer.Vector({
              layerName: layerName,
              source: vectorSource,
              style: new ol.style.Style({
                fill: new ol.style.Fill({
                  color: 'rgba(67, 110, 238, 0.4)'
                }),
                stroke: new ol.style.Stroke({
                  color: '#4781d9',
                  width: 2
                }),
                image: new ol.style.Circle({
                  radius: 7,
                  fill: new ol.style.Fill({
                    color: '#ffcc33'
                  })
                })
              })
            });
            if (layerName == "routestlayer") {//创建标点的开始和结束point
              vectorSource.on("addfeature", function (event) {
                var type = event.feature.get("params").featureType;
                var imgURL = appConfig.markConfig.getMarkConfig(type).imgURL;
                var iconStyle = new ol.style.Style({
                  image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
                    anchor: [0.5, 25],
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'pixels',
                    opacity: 0.75,
                    src: imgURL
                  }))
                });
                event.feature.setStyle(iconStyle);
                var features = vectorSource.getFeatures();
                var tempFeatures = [];
                if (features.length >= 2) {
                  for (var i = 0; i < features.length; i++) {
                    var fea = features[i];
                    var feaType = fea.get("featureType");
                    if (type === "startPoint") {
                      if (feaType === type) {
                        tempFeatures.push(fea);
                      }
                    } else if (type === "endPoint") {
                      if (feaType === type) {
                        tempFeatures.push(fea);
                      }
                    }
                  }
                  for (var m = 0; m < tempFeatures.length - 1; m++) {
                    vectorSource.removeFeature(tempFeatures[m]);
                  }
                }
              }, this);
            }
          }
        }
        if (vectorLayer && (layerName == appConfig.layerConfig.tempLayer.plotDrawLayer || layerName == appConfig.layerConfig.tempLayer.perimeterSerach)) {
          ol.Observable.unByKey(vectorLayer.addFeatureHandler);
          vectorLayer.addFeatureHandler = vectorLayer.getSource().on("addfeature", function (event) {
            var params = event.feature.get("params");
            if (!params) {
              params = event.feature.getGeometry().get("params");
            }
            var config;
            if (params && params.featureType) {
              config = appConfig.markConfig.getMarkConfig(params.featureType);
            } else if (params && params.layerName) {
              config = appConfig.markConfig.getMarkConfigByetype(params.layerName);
            }

            if (config) {
              var imgURL = config.imgURL;
              if (imgURL) {
                var iconStyle = new ol.style.Style({
                  image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
                    anchor: [0.5, 25],
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'pixels',
                    opacity: 0.75,
                    src: imgURL
                  }))
                });
                event.feature.setStyle(iconStyle);
              }
            }

          }, this);
        }

        if (this.map && vectorLayer) {
          if (!this.getlayerByName(layerName)) {
            this.map.addLayer(vectorLayer);
          }
        }
        return vectorLayer;
      };

      /**
       * 判断地图上是否已加载图层
       */
      this.getlayerByName = function (layername) {
        var targetLayer = null;
        if (this.map) {
          var layers = this.map.getLayers();
          layers.forEach(function (layer) {
            var layernameTemp = layer.get("layerName");
            if (layernameTemp === layername) {
              targetLayer = layer;
            }
          }, this);
        }
        return targetLayer;
      };

      /**
       * 功能：获取预警要素
       */
      this.getWarnOverlays = function () {
        var warnOverlays = [];
        var overLay = this.map.getOverlays().getArray();
        for (var i = 0; i < overLay.length; i++) {
          var obj = overLay[i];
          if (obj.get("type") === "warn") {
            warnOverlays.push(obj);
          }
        }
        return warnOverlays;
      };

      /*
       * 工具：激活工具
       * */
      this.activeTool = function (toolType, params) {
        this.deactiveAll();
        var self = this;
        if (this.mapTools.hasOwnProperty(toolType)) {
          this.mapTools[toolType] = true;
          if (toolType === this.mapTools.toolsType.measureLength) {
            self.measureLengthClick = self.map.on("singleclick", function (event) {
              self.measureLengthClick.clickCount += 1;
              if (self.mapTools.measureLength) {
                if (self.measureLengthClick.clickCount == 1) {
                  self.drawSketch.length = "起点";
                }
                self._addMeasureOverLay(event.coordinate, self.drawSketch.length);
              }
            });
            self.measureLengthClick.clickCount = 0;
            this.addDrawInteraction("LineString", {
              featureType: "长度"
            });
            /*测距时候禁止鼠标鼠标其他交互*/
            this._activePointInteraction(false);
            /*设置鼠标光标样式*/
            this.map.getTargetElement().style.cursor = "url(images/cur/measureLength.cur) 8 8, default";
            /*当鼠标移动时的一些处理*/
            this.beforeMeasurePointerMoveHandler = this.map.on('pointermove', this._beforeDrawPointMoveHandler, this);
          } else if (toolType === this.mapTools.toolsType.measureArea) {
            this.createMeasureAreaTooltip();
            /*设置鼠标光标样式*/
            this.map.getTargetElement().style.cursor = "url(images/cur/measureArea.cur) 8 8, default";
            self.measureAreaClick = self.map.on("singleclick", function (event) {
              self.measureAreaClick.clickCount += 1;
              if (self.mapTools.measureLength) {
                if (self.measureAreaClick.clickCount == 1) {
                  self.drawSketch.length = "起点";
                }
                self._addMeasureOverLay(event.coordinate, self.drawSketch.length);
              }
            });
            self.measureAreaClick.clickCount = 0;
            this.addDrawInteraction("Polygon", {
              featureType: "面积"
            });
            /*测距时候禁止鼠标鼠标其他交互*/
            this._activePointInteraction(false);
          }
          else if (toolType === this.mapTools.toolsType.drawLine) {
            this.addDrawInteraction("LineString");
          } else if (toolType === this.mapTools.toolsType.drawPolygon) {
            this.addDrawInteraction("Polygon", params);
          } else if (toolType === this.mapTools.toolsType.zoomIn) {
            this.zoomIn();
          } else if (toolType === this.mapTools.toolsType.zoomOut) {
            this.zoomOut();
          } else if (toolType === this.mapTools.toolsType.addPoint) {
            self.addPointHandlerClick = self.map.on("singleclick", function (event) {
              self.addPoint({
                geometry: event.coordinate
              }, params);
            });
          } else if (toolType === this.mapTools.toolsType.iQuery) {
            this.queryparams = params;
          } else if (toolType === this.mapTools.toolsType.addTitle) {
          } else if (toolType === this.mapTools.toolsType.addTextArea) {
            this.mapTools.addTextArea = true;
          } else if (toolType === this.mapTools.toolsType.drawPlot) {
            if (!self.plotEdit) {
              self.plotDraw = new P.PlotDraw(self.map);
              // 初始化标绘编辑工具
              self.plotEdit = new P.PlotEdit(self.map);
              self.plotDraw.on(P.Event.PlotDrawEvent.DRAW_END, function (event) {
                var feature = event.feature;
                self.getTempVectorLayer(appConfig.layerConfig.tempLayer.plotDrawLayer, {create: true}).getSource().addFeature(feature);
              }, false, self);
            }
            self.plotEdit.deactivate();
            self.plotDraw.activate(eval(params.plotType), params);
          } else if (toolType === this.mapTools.toolsType.drawSquare) {
            this.addDrawInteraction("Square", params);
          } else if (toolType === this.mapTools.toolsType.drawBox) {
            this.addDrawInteraction("drawBox", params);
          }
        }
      };
      /**
       * 使某个工具处于激活状态
       * @param {HDMap.mapTools.toolsType} toolType 具体的工具
       * */
      this.deactiveTool = function (toolType) {
        if (this.mapTools[toolType]) {
          this.mapTools[toolType] = false;
        } else {
          console.error("没有这种工具");
        }
      };
      /*使所有工具处于非激活状态
       * */
      this.deactiveAll = function () {
        for (var key in this.mapTools) {
          if (typeof this.mapTools[key] == 'boolean')
            this.mapTools[key] = false;
        }
        this.removeDrawInteraion();
        if (this.plotDraw) {
          this.plotDraw.deactivate();
          this.plotEdit.deactivate();
        }
      };
      /*
       * 删除某个要素
       *
       * */
      this.removeFeature = function (featuer) {
        if (featuer instanceof ol.Feature) {
          var tragetLayer = this.getLayerByFeatuer(featuer);
          if (tragetLayer) {
            if (this.plotEdit && this.plotEdit.activePlot && this.plotEdit.activePlot === featuer) {
              this.plotEdit.deactivate();
            }
            var source = tragetLayer.getSource();
            if (source && source.removeFeature) {
              source.removeFeature(featuer);
            }
          }
        } else {
          console.error("传入的不是要素");
        }
      };
      /*
       *  根据feature得到该feature所在的图层
       *
       *  */
      this.getLayerByFeatuer = function (feature) {
        var tragetLayer = null;
        if (feature instanceof ol.Feature) {
          var bin = false, source = null;
          var layers = this.map.getLayers().getArray();
          var length = layers.length;
          for (var i = 0; i < length; i++) {
            if (!tragetLayer) {
              var source = layers[i].getSource();
              if (source.getFeatures) {
                var features = source.getFeatures();
                var feaLength = features.length;
                for (var j = 0; j < feaLength; j++) {
                  var fea = features[j];
                  if (fea == feature) {
                    tragetLayer = layers[i];
                    break;
                  }
                }
              }
            } else {
              break;
            }
          }
        } else {
          console.error("传入的不是要素");
        }
        return tragetLayer;
      };
      /*
       *  调整地图范围
       * */
      this.adjustExtent = function (extent) {
        var width = ol.extent.getWidth(extent);
        var height = ol.extent.getHeight(extent);
        var adjust = 0.2;
        if (width < 0.05) {
          var bleft = ol.extent.getBottomLeft(extent);//获取xmin,ymin
          var tright = ol.extent.getTopRight(extent);//获取xmax,ymax
          var xmin = bleft[0] - adjust;
          var ymin = bleft[1] - adjust;
          var xmax = tright[0] + adjust;
          var ymax = tright[1] + adjust;
          extent = ol.extent.buffer(extent, adjust);
        }
        return extent;
      };
      /*
       * 添加交互工具：测距、测面
       * */
      this.addDrawInteraction = function (drawType, params) {
        var self = this;
        self.removeDrawInteraion();
        self.draw = self._createDraw(drawType, params);
        self.map.addInteraction(self.draw);
        if (drawType !== "Point") {
          self._getDragPanInteraction().setActive(false);
        }
        self.draw.on('drawstart', function (evt) {
          self.drawSketch = evt.feature;
          /** @type {ol.Coordinate|undefined} */
          var tooltipCoord = evt.coordinate;
          if (self.mapTools.measureLength) {
            ol.Observable.unByKey(self.beforeMeasurePointerMoveHandler);
            self.listener = self.drawSketch.getGeometry().on('change', function (evt) {
              var geom = evt.target;
              /*                       if (self.drawSketch.length) {
               self.drawSketch.prevLength = self.drawSketch.length;
               } else {
               self.drawSketch.prevLength = "起点";
               }*/
              if (geom instanceof ol.geom.LineString) {
                var output = self.formatLength(/** @type {ol.geom.LineString} */ (geom.getCoordinates()));
                self.drawSketch.length = output;
                self.measureHelpTooltip.getElement().firstElementChild.firstElementChild.innerHTML = output;
              }
            }, self);

            self.drawPointermove = self.map.on("pointermove", self._drawPointerMoveHandler, self);
            /*                        self.drawPointermove = self.map.on("pointermove", function (event) {
             /!**@type {ol.Coordinate}*!/
             var position = self.map.getEventPixel(event.originalEvent);
             var element = self.map.getTargetElement();
             if (element.offsetHeight - position[1] <= 10 || element.offsetWidth - position[0] <= 10) {
             console.log("接近边界!");
             }
             });*/

          } else if (self.mapTools.measureArea) {
            self.listener = self.drawSketch.getGeometry().on('change', function (evt) {
              var coordinates = self.drawSketch.getGeometry().getCoordinates()[0];
              var area = Math.abs(self.wgs84Sphere.geodesicArea(coordinates));
              area = self.formatArea(area);
              if (self.measureAreaTooltip) {
                var poly = {
                  "type": "Feature",
                  "properties": {},
                  "geometry": {
                    "type": "Polygon",
                    "coordinates": [coordinates]
                  }
                };
                self.measureAreaTooltipElement.innerHTML = "面积:" + area;
                self.measureAreaTooltip.setPosition(truf.centroid(poly).geometry.coordinates);
              }
            }, self);
          }
        }, self);

        self.draw.on("drawend", function (evt) {
          evt.feature.set("params", params);
          self._getDragPanInteraction().setActive(true);
          self._activePointInteraction(true);
          self.map.getTargetElement().style.cursor = "default";
          self.map.removeOverlay(self.measureHelpTooltip);
          self.measureHelpTooltip = null;
          if (self.mapTools.measureLength) {
            self._addMeasureOverLay(evt.feature.getGeometry().getLastCoordinate(), self.drawSketch.length, "止点");
            self.mapTools.measureLength = false;
            ol.Observable.unByKey(self.listener);
            ol.Observable.unByKey(self.drawPointermove);
            ol.Observable.unByKey(self.measureLengthClick);
          } else if (self.mapTools.measureArea) {
            ol.Observable.unByKey(self.listener);
          }
          if (params && params.drawend) {
            params.drawend(evt);
          }
          self.drawSketch = null;
          self.removeDrawInteraion();
        });
      };
      /*
       * 移除交互工具
       * */
      this.removeDrawInteraion = function () {
        if (this.draw) {
          this.map.removeInteraction(this.draw);
        }
        this.draw = null;
      };
      /*
       *  测量工具
       *
       *  */
      this._createDraw = function (drawType, params) {
        if (!params) {
          params = {};
        }
        var fill = {color: 'rgba(254, 164, 164, 1)'};
        var stroke = {color: 'rgba(252, 129, 129, 1)', width: 3};
        var image = {radius: 1, fill: new ol.style.Fill({color: '#ffcc33'})};
        if (!params.layerName) {
          params.layerName = appConfig.layerConfig.tempLayer.tempVectorLayer;
        }
        if (!params.fill) {
          params.fill = fill;
        }
        if (!params.stroke) {
          params.stroke = stroke;
        }
        if (!params.image) {
          params.image = image;
        }
        var draw = new ol.interaction.Draw({
          source: this.getTempVectorLayer(params.layerName, {create: true}).getSource(),
          type: drawType,
          style: new ol.style.Style({
            fill: new ol.style.Fill(params.fill),
            stroke: new ol.style.Stroke(params.stroke),
            image: new ol.style.Circle(params.image)
          })
        });
        return draw;
      };

      this._drawPointerMoveHandler = function (event) {
        if (this.mapTools.measureLength) {
          if (event.dragging) {
            return;
          }
          var helpTooltipElement = this.measureHelpTooltip.getElement();
          helpTooltipElement.className = " BMapLabel BMap_disLabel";
          helpTooltipElement.style.position = "absolute";
          helpTooltipElement.style.display = "inline";
          helpTooltipElement.style.cursor = "inherit";
          helpTooltipElement.style.border = "1px solid rgb(255, 1, 3)";
          helpTooltipElement.style.padding = "3px 5px";
          helpTooltipElement.style.whiteSpace = "nowrap";
          helpTooltipElement.style.fontVariant = "normal";
          helpTooltipElement.style.fontWeight = "normal";
          helpTooltipElement.style.fontStretch = "normal";
          helpTooltipElement.style.fontSize = "12px";
          helpTooltipElement.style.lineHeight = "normal";
          helpTooltipElement.style.fontFamily = "arial,simsun";
          helpTooltipElement.style.color = "rgb(51, 51, 51)";
          helpTooltipElement.style.backgroundColor = "rgb(255, 255, 255)";
          helpTooltipElement.style.webkitUserSelect = "none";
          helpTooltipElement.innerHTML = "<span>总长:<span class='BMap_disBoxDis'></span></span><br><span style='color: #7a7a7a;'>单击确定地点,双击结束</span>";
          this.measureHelpTooltip.setPosition(event.coordinate);
        }
      };

      this._beforeDrawPointMoveHandler = function (event) {
        if (!this.measureHelpTooltip) {
          var helpTooltipElement = document.createElement('label');
          helpTooltipElement.className = "BMapLabel";
          helpTooltipElement.style.position = "absolute";
          helpTooltipElement.style.display = "inline";
          helpTooltipElement.style.cursor = "inherit";
          helpTooltipElement.style.border = "none";
          helpTooltipElement.style.padding = "0";
          helpTooltipElement.style.whiteSpace = "nowrap";
          helpTooltipElement.style.fontVariant = "normal";
          helpTooltipElement.style.fontWeight = "normal";
          helpTooltipElement.style.fontStretch = "normal";
          helpTooltipElement.style.fontSize = "12px";
          helpTooltipElement.style.lineHeight = "normal";
          helpTooltipElement.style.fontFamily = "arial,simsun";
          helpTooltipElement.style.color = "rgb(51, 51, 51)";
          helpTooltipElement.style.webkitUserSelect = "none";
          helpTooltipElement.innerHTML = "<span class='BMap_diso'><span class='BMap_disi'>单击确定起点</span></span>";
          this.measureHelpTooltip = new ol.Overlay({
            element: helpTooltipElement,
            offset: [55, 20],
            positioning: 'center-center'
          });
          this.map.addOverlay(this.measureHelpTooltip);
        }
        this.measureHelpTooltip.setPosition(event.coordinate);
      };
      /*
       * 测量时禁止鼠标其他交互事件
       * */
      this._activePointInteraction = function (b) {
        var interactions = this.map.getInteractions();
        interactions.forEach(function (interaction) {
          if (interaction.customType && interaction.customType == "appDrag") {
            interaction.setActive(b);
          }
        });

      };

      /**
       * 对距离的显示进行格式化
       * @param {ol.geom.LineString} line
       * @private
       * @return {string}
       */
      this.formatLength = function (coordinates) {
        var length = 0;
        for (var i = 0, ii = coordinates.length - 1; i < ii; ++i) {
          length += this.wgs84Sphere.haversineDistance(coordinates[i], coordinates[i + 1]);
        }
        var output;
        if (length > 100) {
          output = (Math.round(length / 1000 * 100) / 100) +
            ' ' + '公里';
        } else {
          output = (Math.round(length * 100) / 100) +
            ' ' + '米';
        }
        return output;
      };
      /*
       * 获取拖拽工具
       * */
      this._getDragPanInteraction = function () {
        if (!this.dragPanInteraction) {
          var items = this.map.getInteractions().getArray();
          for (var i = 0; i < items.length; i++) {
            var interaction = items[i];
            if (interaction instanceof ol.interaction.DragPan) {
              this.dragPanInteraction = interaction;
              break;
            }
          }
        }
        return this.dragPanInteraction;
      };
      /*
       * 添加测量图层
       * */
      this._addMeasureOverLay = function (coordinate, length, type) {
        var helpTooltipElement = document.createElement('label');
        helpTooltipElement.style.position = "absolute";
        helpTooltipElement.style.display = "inline";
        helpTooltipElement.style.cursor = "inherit";
        helpTooltipElement.style.border = "none";
        helpTooltipElement.style.padding = "0";
        helpTooltipElement.style.whiteSpace = "nowrap";
        helpTooltipElement.style.fontVariant = "normal";
        helpTooltipElement.style.fontWeight = "normal";
        helpTooltipElement.style.fontStretch = "normal";
        helpTooltipElement.style.fontSize = "12px";
        helpTooltipElement.style.lineHeight = "normal";
        helpTooltipElement.style.fontFamily = "arial,simsun";
        helpTooltipElement.style.color = "rgb(51, 51, 51)";
        helpTooltipElement.style.webkitUserSelect = "none";
        if (type == "止点") {
          helpTooltipElement.style.border = "1px solid rgb(255, 1, 3)";
          helpTooltipElement.style.padding = "3px 5px";
          helpTooltipElement.className = " BMapLabel BMap_disLabel";
          helpTooltipElement.innerHTML = "总长<span class='BMap_disBoxDis'>" + length + "</span>";
          this.addMeasureRemoveBtn(coordinate);
        } else {
          helpTooltipElement.className = "BMapLabel";
          helpTooltipElement.innerHTML = "<span class='BMap_diso'><span class='BMap_disi'>" + length + "</span></span>";
        }
        var tempMeasureTooltip = new ol.Overlay({
          element: helpTooltipElement,
          offset: [0, -5],
          positioning: 'bottom-center'
        });
        this.map.addOverlay(tempMeasureTooltip);
        tempMeasureTooltip.setPosition(coordinate);
      };

      /**
       * 对面积的显示进行格式化
       * @param {ol.geom.Polygon} area
       * @private
       * @return {string}
       */
      this.formatArea = function (area) {
        var output;
        if (area > 100000000000) {
          output = (Math.round(area / (1000 * 1000 * 10000) * 100) / 100) +
            ' ' + '万平方公里';
        }
        if (area > 10000000) {
          output = (Math.round(area / (1000 * 1000) * 100) / 100) +
            ' ' + '平方公里';
        } else {
          output = (Math.round(area * 100) / 100) +
            ' ' + '平方米';
        }
        return output;
      };
      /*
       * 测量面积
       * */
      this.createMeasureAreaTooltip = function () {
        this.measureAreaTooltipElement = document.createElement('div');
        this.measureAreaTooltipElement.style.marginLeft = "-6.25em";
        this.measureAreaTooltipElement.className = 'measureTooltip hidden';
        this.measureAreaTooltip = new ol.Overlay({
          element: this.measureAreaTooltipElement,
          offset: [15, 0],
          positioning: 'center-left'
        });
        this.map.addOverlay(this.measureAreaTooltip);
      };
      /*
       * 添加工具移除按钮
       * */
      this.addMeasureRemoveBtn=function(coordinate){
        var self=this;
        //添加移除按钮
        var tempLayer= self.getTempVectorLayer(appConfig.layerConfig.tempLayer.tempVectorLayer);
        var pos=[coordinate[0]-5*this.map.getView().getResolution(),coordinate[1]];
        var btnImg=document.createElement('img');
        btnImg.src="images/map/map_range_end.png";
        btnImg.style.cursor = "pointer";
        btnImg.title="清除测量结果";
        btnImg.groupId=this.drawSketch.get("uuid");
        btnImg.pos=coordinate;
        btnImg.onclick=function (evt) {
          // console.info(this.groupId);
          var imgSelf=this;
          var groupId=this.groupId;
          var overlays=self.map.getOverlays().getArray();
          $(overlays).each(function(i,overlay){
            if(overlay.get("groupId")==groupId){
              self.map.removeOverlay(overlay);
            }
          });
          if(tempLayer){
            var source=tempLayer.getSource();
            var features=source.getFeatures();
            $(features).each(function(i,feat){
              var lastCoord=feat.getGeometry().getLastCoordinate();
              if(lastCoord[0]==imgSelf.pos[0]&&lastCoord[1]==imgSelf.pos[1]){
                source.removeFeature(feat);
              }
            });
          }
        }
        var closeBtn = new ol.Overlay({
          element: btnImg,
          offset: [0, -5],
          positioning: 'bottom-center'
        });
        this.map.addOverlay(closeBtn);
        closeBtn.setPosition(pos);
        closeBtn.set("groupId",this.drawSketch.get("uuid"));
      }
      /**
       * 清除地图上的东西
       */
      this.clearGraphics = function () {
        this.removeDrawInteraion();
        this.deactiveAll();
        this.map.getOverlays().clear();
        /*销毁文字标记中的编辑器*/
        if (this.editor) {
          this.editor.destroy();
          delete this.editor;
        }
        this.circleSerachFea = null;
        this._removeYJTitle();
        this.cleartempgraphiclayers();
        //清除叠加的专题图
        thematicService.removeOverLayer();
        window.ObservableObj.dispatchEvent("clearGraphics");
      };

      /**
       * 根据names集合清除地图上的临时绘制图层
       * @params{array} names 图层集合
       */
      this.clearGraphicsByLayerNames = function (names) {
        if (!names || (names && names.length == 0)) {
          return;
        }
        for (var i = 0; i < names.length; i++) {
          var layer = this.getlayerByName(names[i]);
          if (layer != null) {
            layer.getSource().clear();
          }
        }
      };
      /**
       * 根据names集合清除地图上的临时绘制图层
       * @params{array} names 图层集合
       * @params{boolean} overlayclear 是否清除临时叠加图层
       * @params{array} saveNames 除了图层
       */
      this.clearGraphicsByLayerNames = function (names, overlayclear, saveNames) {
        if (names == undefined || names == null || names.length == 0) {
          return;
        }
        for (var i = 0; i < names.length; i++) {
          if (saveNames != undefined && saveNames != null) {
            if (saveNames.indexOf(names[i]) >= 0)
              continue;
          }
          var layer = this.getlayerByName(names[i]);
          if (layer != null) {
            layer.getSource().clear();
          }
        }
        if (overlayclear) {
          this.map.getOverlays().clear();
        }
      };
      /**
       * 清除除地图上的临时绘制要素
       * @params{Array} Ids 要素id集合
       * @params{boolean} isclear 是否清除，若为true,则根据ids清除，若为false，则是除ids集合其它全部清除
       */
      this.ClearGraphicsByIds = function (Ids, isclear) {
        if (isclear) {//根据ids清除overlay popup
          var tempIds = [];
          for (var i = 0; i < Ids.length; i++) {
            var id = Ids[i];
            var overlay = this.map.getOverlayById(id);
            if (overlay == null)
              tempIds.push(id);
            else {
              this.map.removeOverlay(overlay);
            }
          }

          //清除临时要素
          for (var j = 0; j < tempIds.length; j++) {
            var id = tempIds[j];
            var layers = appConfig.hdmap.map.getLayers();
            layers.forEach(function (layer) {
              if (layer instanceof ol.layer.Vector) {
                var targetFeature = layer.getSource().getFeatureById(id);
                if (targetFeature != null)
                  layer.getSource().removeFeature(targetFeature);
              }
            }, this);
          }

        } else {//保留ids其它全部清除
          var tempIds = [];
          var overlays = this.map.getOverlays;
          for (var i = 0; i < overlays.length; i++) {
            var overlay = overlays[i];
            if (Ids.indexOf(overlay.getId()) >= 0) {
              tempIds.push(overlay.getId());
              continue;
            }
            this.map.removeOverlay(overlay);
          }
          //临时要素
          var layers = appConfig.hdmap.map.getLayers();
          layers.forEach(function (layer) {
            var idss = [];
            var features = [];
            for (var k = 0; k < Ids.length; k++) {
              if (tempIds.indexOf(Ids[k]) < 0)
                idss.push(Ids[k]);
            }
            Ids = idss;
            if (Ids.length > 0) {
              if (layer instanceof ol.layer.Vector) {
                for (var nn = 0; nn < Ids.length; nn++) {
                  var id = Ids[nn];
                  var targetFeature = layer.getSource().getFeatureById(id);
                  if (targetFeature != null) {
                    features.push(targetFeature);
                    tempIds.push(id);
                  }
                }

              }
            }
            layer.getSource().clear;
            if (features.length > 0)
              layer.getSource().addFeatures(features);
          }, this);
        }

      };

      /**
       * 根据featureid进行清除
       */
      this.clearGraphicsByFeaturesIds = function (layerName, ids) {
        layerName = layerName.toUpperCase();
        if (ids == null || ids.length == 0)
          return;
        var layer = this.getlayerByName(layerName);
        if (layer != null) {
          var source = layer.getSource();
          for (var i = 0; i < ids.length; i++) {
            var feature = layer.getSource().getFeatureById(ids[i]);
            if (feature == null)
              continue;
            layer.getSource().removeFeature(feature);
          }
        }
      };

      /**
       * 清除临时绘制图层
       */
      this.cleartempgraphiclayers = function () {
        if (this.map) {
          var layers = this.map.getLayers();
          if (layers) {
            layers.forEach(function (layer) {
              if (layer instanceof ol.layer.Vector) {
                if (layer.getSource() && layer.getSource().clear) {
                  layer.getSource().clear();
                }
              }
            }, this);
          }
        }
        this.tempAddline = [];
      };

      /*
       *@param{ol.Extent} extent缩放到的范围
       *@param{bool} isanimation是否使用动画
       *@param{number} duration可选的动画时常
       * */
      this.zoomToExtent = function (extent, isanimation, duration) {
        var view = this.map.getView();
        var size = this.map.getSize();
        /**
         *  @type {ol.Coordinate} center The center of the view.
         */
        var center = ol.extent.getCenter(extent);
        if (!isanimation) {
          view.fit(extent, size);
          view.setCenter(center);

        } else {
          if (!duration) {
            duration = 1000;
            var start = +new Date();
            var pan = ol.animation.pan({
              duration: duration,
              source: /** @type {ol.Coordinate} */ (view.getCenter()),
              start: start
            });
            var bounce = ol.animation.bounce({
              duration: duration,
              resolution: view.getResolution(),
              start: start
            });
            this.map.beforeRender(pan, bounce);
            view.setCenter(center);
            view.fit(extent, size);
          }
        }
      };

      /*
       * 功能：地图添加单个点（标点）
       * @param attr:包含点空间信息坐标
       * @param params:包含点类型信息
       * */
      this.addPoint = function (point, params) {
        var geometry = null;
        if(!params){
          params = {};
        }
        //获取geometry的三种方式
        if (point instanceof ol.geom.Geometry) {
          geometry = point;
        } else if ($.isArray(point.geometry)) {//如果指定的参数是数组，则返回true，否则返回false
          geometry = new ol.geom.Point(point.geometry);
        } else {
          geometry = new ol.format.WKT().readGeometry(point.geometry);
        }
        var iconFeature = new ol.Feature({
          geometry: geometry,
          params: params
        });
        //集合空间类型:所标绘点的样式
        var featureType = params.featureType;
        if (featureType) {
          var imgURL = appConfig.markConfig.getMarkConfig(featureType).imgURL;
          var iconStyle = new ol.style.Style({
            image: new ol.style.Icon({
              anchor: [0.5, 25],
              anchorXUnits: 'fraction',
              anchorYUnits: 'pixels',
              opacity: 0.75,
              src: imgURL
            })
          });
          iconFeature.setStyle(iconStyle);
        }
        if(point["attributes"]){
          iconFeature.setProperties(point["attributes"],false);
        }
        if (params.layerName) {
          params["create"]=true;
          var layer = this.getTempVectorLayer(params.layerName,params);
          layer.getSource().addFeature(iconFeature);
        } else {
          this.tempVectorLayer.getSource().addFeature(iconFeature);
        }
        if (params.drawend && typeof(params.drawend) == "function") {
          params.drawend({
            feature: iconFeature
          });
        }
        this.mapTools.addPoint = false;
        if (this.addPointHandlerClick) {
          ol.Observable.unByKey(this.addPointHandlerClick);//移除对key的监听
        }
        return iconFeature;
      };
      /**
       * 添加多个点
       * @param {Array.<object>} points:多点传入数组对象，
       *
       * @return {Array.<ol.geom.Point>} addedPoints
       */
      this.addPoints = function (points,params) {
        var multiPoint = new ol.geom.MultiPoint([]);
        var addedPoints = [];
        var tempAddedPoints = [];
        var length = points.length;
        var layer=null;
        if(params["layerName"]){
          layer = this.getlayerByName(params["layerName"]);
          if(!layer){
            params["create"]=true;
            layer=this.getTempVectorLayer(params["layerName"],params);
          }

        }else{
          layer = this.tempVectorLayer;
        }
        for(var i=0;i<points.length;i++){
          var point = points[i].attributes ? points[i].attributes : points[i];
          if (!point) {
            throw new Error("传入的数据结构不正确!");
          } else {
            var id=point.id||point.ID;
            if (!id) {
              throw new Error("传入的数据缺少id!");
            }
            if(!points[i].geometry){
              continue;
            }
          }
          layer.set("selectable", params.selectable);
          var WKT = new ol.format.WKT();
          var geom = WKT.readGeometry(points[i].geometry);
          var featureType = params.featureType;
          var unSelectImgURL = appConfig.markConfig.getImgURL(featureType).imgUrl;
          var selectImgURL = appConfig.markConfig.getHightImgURL(featureType).imgURL;
          if(featureType == "dingwei"){
            var selectStyle = new ol.style.Style({
              image: new ol.style.Icon({
                anchor: [0.5, 25],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                opacity: 0.75,
                src: selectImgURL
              }),
              text: new ol.style.Text({
                text: i + 1 + "",
                offsetX: 0.6,
                offsetY: -15,
                fill: new ol.style.Fill({
                  color: "#51BBEB"
                })
              })
            });
            var unSelectStyle = new ol.style.Style({
              image: new ol.style.Icon({//标绘点的样式
                anchor: [0.5, 25],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                opacity: 0.75,
                src: unSelectImgURL
              }),
              text: new ol.style.Text({//标绘点的文字
                text: i + 1 + "",
                offsetX: 0.6,
                offsetY: -15,
                fill: new ol.style.Fill({
                  color: "#EF7968"
                })
              })
            });
          }else {
            var selectStyle = new ol.style.Style({
              text: new ol.style.Text({
                image: new ol.style.Icon({
                  anchor: [0.5, 25],
                  anchorXUnits: 'fraction',
                  anchorYUnits: 'pixels',
                  opacity: 0.75,
                  src: selectImgURL
                })
              })
            });
            var unSelectStyle = new ol.style.Style({
              image: new ol.style.Icon({//标绘点的样式
                anchor: [0.5, 25],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                opacity: 0.75,
                src: unSelectImgURL
              })
            });
          }
          var iconFeature = new ol.Feature({
            selectStyle: selectStyle,
            unSelectStyle: unSelectStyle,
            geometry: geom
          });
          iconFeature.setId(point.id||point.ID);
          iconFeature.setStyle(unSelectStyle);
          if(points[i]["attributes"]){
            iconFeature.setProperties(points[i]["attributes"],false);
          }
          multiPoint.appendPoint(geom);
          addedPoints.push(iconFeature);
          layer.getSource().addFeature(iconFeature);
        }
        if (multiPoint.getPoints().length > 0) {
          var extent = multiPoint.getExtent();
          var bExtent = true;
          for (var m = 0; m < 4; m++) {
            if (extent[m] == Infinity || extent[m] == NaN) {
              bExtent = false;
              break;
            }
          }
          if (bExtent) {
            this.zoomToExtent(extent, true);
          }
        }
        return addedPoints;
      };
      this.getTempVectorLayer = function (layerName, params) {
        var vectorLayer = this.getlayerByName(layerName);
        if (!(vectorLayer instanceof ol.layer.Vector)) {
          vectorLayer = null;
        }
        if (!vectorLayer) {
          if (params && params.create) {
            var vectorSource = new ol.source.Vector({
              wrapX: false
            });
            vectorLayer = new ol.layer.Vector({
              layerName: layerName,
              source: vectorSource,
              selectable:params["selectable"],
              style: new ol.style.Style({
                fill: new ol.style.Fill({
                  color: 'rgba(67, 110, 238, 0.4)'
                }),
                stroke: new ol.style.Stroke({
                  color: '#4781d9',
                  width: 2
                }),
                image: new ol.style.Circle({
                  radius: 7,
                  fill: new ol.style.Fill({
                    color: '#ffcc33'
                  })
                })
              })
            });
          }
        }
        if (this.map && vectorLayer) {
          if (!this.getlayerByName(layerName)) {
            this.map.addLayer(vectorLayer);
          }
        }
        return vectorLayer;
      };
      this.addPolyline = function (layerName, feature, style) {
        var layer = this.getlayerByName(layerName);
        if (layer == null) {
          layer = this.getTempVectorLayer(layerName, {create: true});
          layer.set("selectable", true);
          this.lineLayers.push(layerName);
        }
        var lineStyle = null;
        if (!style) {//如果没有定义样式，使用默认
          style = {width: 4, color: '#0000EE'};
        }
        lineStyle = new ol.style.Style({
          stroke: new ol.style.Stroke(style)
        });
        var features = [];
        if (feature instanceof Array)
          features = feature;
        else
          features.push(feature);
        var linefeature;
        for (var i = 0; i < features.length; i++) {
          var _feat = features[i];
          if(_feat.geometry ==undefined||_feat.geometry == null){
            continue;
          }
          if (_feat.geometry.hasOwnProperty('paths')) {
            var feat = {
              'type': 'Feature',
              'geometry': {
                'type': 'LineString',
                'coordinates': _feat.geometry.paths[0]
              }
            };
            this.tempAddline.push(_feat.geometry.paths[0]);
            linefeature = (new ol.format.GeoJSON()).readFeature(feat);
          } else {
            linefeature = new ol.Feature({
              geometry: new ol.format.WKT().readGeometry(_feat.geometry)
            });
            var extent = linefeature.getGeometry().getExtent();
            this.tempAddline.push([[extent[0], extent[1]], [extent[2], extent[3]]]);
          }
          _feat.attributes['layername'] = layerName;
          _feat.attributes['style'] = lineStyle;
          linefeature.setProperties(_feat.attributes);
          if (lineStyle != null)
            linefeature.setStyle(lineStyle);//设置线段样式
          layer.getSource().addFeature(linefeature);
        }
        return linefeature;
      };
      /**
       * 添加路线集合
       * @param layerName 图层名称
       * @param features 图层集合
       */
      this.addPolylines = function (layerName, features, isclear) {
        if (isclear == undefined)
          isclear = true;
        this.tempAddline = [];
        if (isclear)
          this.clearGraphics();
        if (features != null && features.length > 0) {
          for (var i = 0; i < features.length; i++) {
            this.addPolyline(layerName, features[i]);
          }
          var extent = new ol.geom.MultiLineString(this.tempAddline, null).getExtent();
          extent = this.adjustExtent(extent);
          this.zoomToExtent(extent, true);
        }
      };
      /**
       * 根据线要素进行定位
       */
      this.zoomByLineFeature = function (feature) {
        var linefeature = null;
        if (feature.geometry.hasOwnProperty('paths')) {
          var feat = {
            'type': 'Feature',
            'geometry': {
              'type': 'LineString',
              'coordinates': feature.geometry.paths[0]
            }
          };
          linefeature = (new ol.format.GeoJSON()).readFeature(feat);
        } else {
          linefeature = new ol.Feature({
            geometry: new ol.format.WKT().readGeometry(feature.geometry)
          });
        }
        if (linefeature != null) {
          var extent = linefeature.getGeometry().getExtent();
          this.zoomToExtent(extent, true);
        }

      };
      /**
       * 绘制圆
       * @param x
       * @param y
       * @param radius 半径 米
       * @param layerName 图层 可以为null
       * @param islayerclear 是否清除当前绘制图层的临时绘制
       * @param isclear 是否清除地图上所有绘制图层
       */
      this.drawCircle = function (x, y, radius, layerName, islayerclear, isclear) {
        if (layerName == null) {
          layerName = 'bufferlayer';
        }
        radius = parseFloat((radius / 111000).toFixed(4));
        var layer = this.getlayerByName(layerName);
        if (layer == null) {
          layer = this.getTempVectorLayer(layerName, {create: true});
          this.polygonLayers.push(layerName);
        }
        layer.setZIndex(1);
        if (islayerclear) {
          layer.getSource().clear();
        }
        if (isclear) {//绘制前是否需要清除地图上的所有临时绘制图层
          this.clearGraphics();
        }
        var style = new ol.style.Style({
          fill: new ol.style.Fill({
            color: 'rgba(65,105,225, 0.5)'
          })
        });

        var feature = new ol.Feature({
          geometry: new ol.geom.Circle([x, y], radius)
        });
        feature.setStyle(style);
        layer.getSource().addFeature(feature);
        this.OrderLayerZindex();
      };


      /**
       * 调整图层的顺序，保证点压线，线压面
       */
      this.OrderLayerZindex = function () {
        var self = this;
        if (this.map) {
          var layerindex = 5;
          var layers = this.map.getLayers();
          //调整面图层
          layers.forEach(function (layer) {
            var layerNameTemp = layer.get("layerName");
            if (self.polygonLayers.indexOf(layerNameTemp) >= 0) {
              layer.setZIndex(layerindex++);
            }
          }, this);
          //调整线图层
          layers.forEach(function (layer) {
            var layerNameTemp = layer.get("layerName");
            if (self.lineLayers.indexOf(layerNameTemp) >= 0) {
              layer.setZIndex(layerindex++);
            }
          }, this);
          //调整点图层
          layers.forEach(function (layer) {
            var layerNameTemp = layer.get("layerName");
            if (self.pointLayers.indexOf(layerNameTemp) >= 0) {
              layer.setZIndex(layerindex++);
            }
          }, this);
        }
      };
      /*
       * 添加应急标绘标题
       *
       * */

      this.addYJTitle = function (title) {
        if (!title) {
          return;
        }
        var yjtitle = document.getElementById("yingjiTitle");
        if (!yjtitle) {
          /*id='yingjiTitle' 不要修改和删除*/
          yjtitle = document.getElementById("yingjiTitle");
          if (!yjtitle) {
            yjtitle = "<div id='yingjiTitle'" +
              "contenteditable='true' style='position: absolute;left:400px;right:400px;" +
              "top: 85px;font-size: 30px;font-weight: bold;text-align: center;z-index: 1'>" +
              "<p contenteditable='true' style='border-width: 1px;margin: 0 auto;'>请输入标题</p></div>";
            yjtitle = yjtitle.replace("请输入标题", title);
            $(document.body).append(yjtitle);
          }
        }
        $("#yingjiTitle").find("p").text(title);
      };
      /*
       *  删除应急标绘标题
       *
       *  */
      this._removeYJTitle = function () {
        $("#yingjiTitle").remove();
      };
      /**
       * 打印地图
       */
      this.printMap = function () {
        ol.util.print();
        // appConfig.hdmap.saveMapToImage();
      };

      /**
       * 将地图保存为图片
       */
      this.saveMapToImage = function () {
        var exportPNGElement = document.getElementById('export-png');
        this.map.once('postcompose', function (event) {
          var canvas = event.context.canvas;
          exportPNGElement.href = canvas.toDataURL('image/png');
        });
        this.map.renderSync();
      };

      /**
       * 全图
       */
      this.zoomMaxExtent = function () {
        this.map.getView().setCenter(this.appConfig.mapConfig.center);
        this.map.getView().setZoom(this.appConfig.mapConfig.zoom);
      };
      /*
       * 地图放大缩小工具
       * */
      this.zoomIn = function () {
        var zoom = this.map.getView().getZoom();
        this.map.getView().setZoom(zoom + 1);
      };

      this.zoomOut = function () {
        var zoom = this.map.getView().getZoom();
        this.map.getView().setZoom(zoom - 1);
      };
      /*
       * 功能：气泡弹窗popup
       * */
      this.showPopup = function (obj) {
        if (!this.popupOverlay) {
          var m = {
            positioning: 'center-center',
            offset:[1, -13]
          };
          obj = $.extend(obj, m);
          this.popupOverlay = new ol.Overlay.Popup(obj);
          this.map.addOverlay(this.popupOverlay);
        }
        this.map.addOverlay(this.popupOverlay);
        this.popupOverlay.show(obj.coordinate, obj.content);
        this.mapTools.iQuery = false;
      };
      /*
       * 关闭popup
       * */
      this.closePopup = function () {
        window.ObservableObj.set("selectFeature", null);
        window.ObservableObj.set("mouseOnFeature", null);
        if (this.popupOverlay) {
          this.popupOverlay.hide();
          this.popupOverlay = null;
        }
        return false;
      };

      /**
       * add by zhangfk 20160709
       * @param layerName
       * @desc 清除叠加图层
       */
      this.removeTileLayer = function (layerName) {
        var self = this;
        if (this.map) {
          var layers = this.map.getLayers();
          layers.forEach(function (layer) {
            var titleTemp = layer.get("title");
            if (titleTemp === layerName) {
              self.map.removeLayer(layer);
            }
          }, this);
        }
      };
    };
    return {
      HDMap: HDMap
    };
  });

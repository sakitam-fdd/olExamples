/**
 * Created by ASUS on 2016/7/30.
 */
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
    if (feature && feature.get("params") && feature.get("params").moveable) {//通过判断params中是否设置moveable来确定要素是否可以移动。
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
  window.ObservableObj.set('featureMove',this.feature_);
  window.ObservableObj.dispatchEvent('featureMove');
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
var hdsxMap = function () {
  this.drawPointermove = null;
  window.ObservableObj = new ol.Object();//定义新对象
};
hdsxMap.prototype ={
  init:function (view,baseLayer) {//地图初始化
    var self = this;
    self.Map = new ol.Map({
      target: 'map',
      controls: ol.control.defaults({
        attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
          collapsible: false
        })
      }).extend([
        new ol.control.ScaleLine({//比例尺的设置：'degrees', 'imperial', 'nautical', 'metric', 'us'
          units: 'metric'
        })
      ]),
      interactions: ol.interaction.defaults({doubleClickZoom: false}).extend([new app.Drag()]),
      layers: baseLayer,    //必须定义
      view: view
    });
    var zoomslider = new ol.control.ZoomSlider();
    self.Map.addControl(zoomslider);
    /*self.Map.on('click',function (evt) {
      console.log(evt.coordinate);
    })*/
  },
  getBaselayerByName:function (layername) {//获得底图
    var targetLayer = null;
    if (this.Map) {
      var layers = this.Map.getLayers();
      layers.forEach(function (layer) {
        layer.setVisible(false);
        var layernameTemp = layer.get("layerName");
        if (layernameTemp === layername) {
          targetLayer = layer;
        }
      }, this);
    }
    return targetLayer;
  },
  getlayerByName:function (layername) {//判断地图是否加载此图层
    var targetLayer = null;
    if (this.Map) {
      var layers = this.Map.getLayers();
      layers.forEach(function (layer) {
        var layernameTemp = layer.get("layerName");
        if (layernameTemp === layername) {
          targetLayer = layer;
        }
      }, this);
    }
    return targetLayer;
  },
  getTempVectorLayer:function (layerName,params) {//获取临时图层
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
      }
    }
    if (this.Map && vectorLayer) {
      if (!this.getlayerByName(layerName)) {
        this.Map.addLayer(vectorLayer);
      }
    }
    return vectorLayer;
  },
  addPoint:function (point,params,id) {//单点标绘
    var geometry = null;
    if (!params) {
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
    if (!params.type){
      var imgURL = appConfig.markConfig.defaultImgURL;
    }else {
      var imgURL = appConfig.markConfig.type;
    }
    var iconStyle = new ol.style.Style({//@params geometry fill image stroke text zIndex
      image: new ol.style.Icon({
        anchor: [0.5, 25],//锚点：中心点
        anchorXUnits: 'fraction',//单位：分数
        anchorYUnits: 'pixels',//单位：像素
        opacity: 0.75,
        src: imgURL
      })
    });
    var iconFeature = new ol.Feature({
      geometry: geometry,
      params: params
    });
    iconFeature.setStyle(iconStyle);
    iconFeature.setId(id);
    if (params.layerName) {
      params["create"] = true;
      var layer = this.getTempVectorLayer(params.layerName, params);
      layer.getSource().addFeature(iconFeature);
      layer.set('selectable',true);
    } else {
      this.tempVectorLayer.getSource().addFeature(iconFeature);
    }
  },
  addPoints:function (points,params) {//多点标绘
    var layer = null;
    if(points == null || points == undefined){
      return;
    }
    if (params["layerName"]) {//获取当前临时图层
      layer = this.getlayerByName(params["layerName"]);
      if (!layer) {
        params["create"] = true;
        layer = this.getTempVectorLayer(params["layerName"], params);
      }
    } else {
      layer = this.tempVectorLayer;
    }
    for(var i= 0; i < points.length; i++){
      var point = points[i].attributes ? points[i].attributes : points[i];
      if (!point) {
        throw new Error("传入的数据结构不正确!");
      }
      var id = points[i].id || points[i].ID;
      if (!params.type){
        var imgURL = appConfig.markConfig.defaultImgURL;
      }else {
        var imgURL = appConfig.markConfig.defaultImgURL;
      }
      var Pointstyle = new ol.style.Style({
        image: new ol.style.Icon({
          anchor: [0.5, 25],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          opacity: 0.75,
          src: imgURL
        }),
        text: new ol.style.Text({
          text: i + 1 + "",
          offsetX: 0.6,
          offsetY: -15,
          fill: new ol.style.Fill({
            color: "#FFFFFF"
          })
        })
      });
      var WKT = new ol.format.WKT();
      var geom = WKT.readGeometry(points[i].attributes);
      var iconFeature = new ol.Feature({
        geometry: geom,
        // Pointstyle:Pointstyle
      });
      iconFeature.setId(id);
      iconFeature.set('type',points[i].type);
      iconFeature.setStyle(Pointstyle);//设置样式出错
      if (point.geometry != "POINT(0 0)") {
        layer.getSource().addFeature(iconFeature);
      }
    }
  },
  addPolyline:function (feature,layerName,style) {
    if(layerName){
      var layer = this.getlayerByName(layerName);
      if (!layer){
        layer = this.getTempVectorLayer(layerName, {create: true});
      }
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
      if (_feat.geometry == undefined || _feat.geometry == null) {
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
        linefeature = (new ol.format.GeoJSON()).readFeature(feat);
      } else {
        linefeature = new ol.Feature({
          geometry:new ol.format.WKT().readGeometry(_feat.geometry)
        });
      }
      _feat.attributes['layername'] = layerName;
      _feat.attributes['style'] = lineStyle;
      linefeature.setProperties(_feat.attributes);
      if (lineStyle != null){
        linefeature.setStyle(lineStyle);//设置线段样式
      }
      layer.getSource().addFeature(linefeature);
    }
  },
  addPolylines:function (features, layerName,style) {
    if (features != null && features.length > 0) {
      for (var i = 0; i < features.length; i++) {
        this.addPolyline(features[i], layerName,style);
      }
    }
  },
  clearGraphics:function () {
    if (this.Map) {
      this.Map.getOverlays().clear();
      var layers = this.Map.getLayers();
      if (layers) {
        layers.forEach(function (layer) {
          if (layer instanceof ol.layer.Vector) {
            if (layer.getSource() && layer.getSource().clear) {
              layer.getSource().clear();
            }
          }
        },this);
      }
    }
    this.tempAddline = [];
  },
  getFeature:function (id,layerName) {
    var params = {};
    params["create"] = false;
    var layer = this.getlayerByName(layerName);
    var feature = layer.getSource().getFeatures();
    debugger;
    return feature;
  }
};

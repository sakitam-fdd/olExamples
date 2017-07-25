/**
 * Created by FDD on 2017/7/24.
 * @desc 逻辑代码，只是简单写法，
 * 项目使用时尽量采用构造器的方式封装操作类代码
 */
var map = null, measure = null;
/**
 * 初始化arcgisXYZ切片地图
 * @Tip 初始化此类底图需要当前投影，地图范围，切片原点，和每层级分辨率，瓦片大小（256）
 * 参数都可从图层配置中获取
 * @param tileUrl
 */
var initMap = function (tileUrl) {
  $.ajax({
    url: tileUrl + "?f=pjson",
    type: "GET",
    dataType: 'jsonp',
    jsonp: 'callback',
    success: function (data) {
      if (data && data.error) {
        console.warn('地图加载失败')
      }
      var fullExtent = [data.fullExtent.xmin, data.fullExtent.ymin, data.fullExtent.xmax, data.fullExtent.ymax];
      var projection = ol.proj.get("EPSG:" + data.spatialReference.wkid);
      projection.setExtent(fullExtent);
      var resolutions = [];
      var origin = [data.tileInfo.origin.x, data.tileInfo.origin.y];
      var len = data.tileInfo.lods.length;
      for (var i = 0; i < len; i++) {
        resolutions.push(data.tileInfo.lods[i].resolution);
      }
      var urlTemplate = tileUrl + "/tile/{z}/{y}/{x}";
      var baseLayer = new ol.layer.Tile({
        layerName: 'vector',
        isBaseLayer: true,
        source: new ol.source.XYZ({
          wrapX: false,
          tileGrid: new ol.tilegrid.TileGrid({
            tileSize: data.tileInfo.cols,
            origin: origin,
            extent: fullExtent,
            resolutions: resolutions
          }),
          projection: projection,
          tileUrlFunction: function (tileCoord) {
            var url = urlTemplate.replace('{z}', (tileCoord[0]).toString())
              .replace('{x}', tileCoord[1].toString())
              .replace('{y}', (-tileCoord[2] - 1).toString());
            return url;
          }
        })
      })
      var tdtLayer = addTDT({
        layerName: 'earth',
        layer: 'img',
        layerUrl: 'http://t0.tianditu.cn/img_c/wmts'
      })
      map = new ol.Map({
        target: 'map',
        interactions: ol.interaction.defaults({
          doubleClickZoom: true,
          keyboard: false
        }),
        controls: [
          new ol.control.ScaleLine(), // 比例尺
          new ol.control.Zoom(), // 放大缩小按钮
          new ol.control.Rotate(), // 地图旋转控件（shift + alt + 鼠标拖拽旋转）
          new ol.control.Attribution(), // 一般用于添加版权控件
          new ol.control.FullScreen()
        ],
        layers: [baseLayer, tdtLayer],
        view: new ol.View({
          center: [113.62599749178007, 34.77023274980952],
          zoom: 6,
          projection: projection,
          extent: fullExtent
        })
      });
      map.on('click', function (event) {
        console.log(event.coordinate)
      })
      measure = new MeasureTool(map, {
        measureLengthCursor: 'url(./images/cur/ruler.cur), default',
        measureAreaCursor: 'url(./images/cur/ruler.cur), default',
        endStyle: {
          fill: {
            fillColor: 'rgba(67, 110, 238, 0.4)'
          },
          stroke: {
            strokeColor: 'rgba(242,123,57,1)',
            strokeWidth: 2
          },
          circle: {
            circleRadius: 4,
            stroke: {
              strokeColor: 'rgba(255,0,0,1)',
              strokeWidth: 1
            },
            fill: {
              fillColor: 'rgba(255,255,255,1)'
            }
          }
        }
      });
    },
    error: function (err) {
      console.error(err);
    }
  });
}
/**
 * 添加天地图（WMTS方式）
 * @param layerConfig
 * @returns {ol.layer.Tile}
 */
var addTDT = function (layerConfig) {
  var projection = ol.proj.get('EPSG:4326');
  var projectionExtent = [ -180, -90, 180, 90 ]
  var size = ol.extent.getWidth(projectionExtent) / 256;
  var resolutions = new Array(19);
  var matrixIds = new Array(19);
  for (var z = 0; z < 19; ++z) {
    resolutions[z] = size / Math.pow(2, z);
    matrixIds[z] = z;
  }
  var layer = new ol.layer.Tile({
    isBaseLayer: true,
    layerName: layerConfig['layerName'],
    visible: false, // 设置图层是否显示
    source: new ol.source.WMTS({
      url: layerConfig['layerUrl'],
      layer: layerConfig['layer'],
      matrixSet: 'c',
      projection: projection,
      tileGrid: new ol.tilegrid.WMTS({
        origin: ol.extent.getTopLeft(projectionExtent),
        resolutions: resolutions,
        matrixIds: matrixIds
      }),
      format: 'tiles',
      style: 'default',
      wrapX: false
    })
  });
  return layer;
}
/**
 * 根据设置的图层名切换底图
 * @param layerName
 */
var baseLayerChange = function (layerName) {
  if (!map) return;
  var layers = map.getLayers().getArray();
  layers.forEach(function (layer) {
    if (layer && layer.get('isBaseLayer')) {
      if (layer.get('layerName') === layerName) {
        layer.setVisible(true)
      } else {
        layer.setVisible(false)
      }
    }
  })
}
/**
 * 通过layerName获取图层
 * @param layerName
 * @returns {*}
 */
var getLayerByLayerName = function (layerName) {
  try {
    var targetLayer = null
    if (map) {
      var layers = map.getLayers().getArray()
      layers.every(function (layer) {
        if (layer.get('layerName') === layerName) {
          targetLayer = layer
          return false
        } else {
          return true
        }
      })
    }
    return targetLayer
  } catch (e) {
    console.log(e)
  }
}
/**
 * 创建矢量图层，主要用于叠加矢量要素（点线面等）
 * @param layerName
 * @param params
 * @returns {*}
 */
var createVectorLayer = function (layerName, params) {
  try {
    if (this.map) {
      var vectorLayer = getLayerByLayerName(layerName)
      if (!(vectorLayer instanceof ol.layer.Vector)) {
        vectorLayer = null
      }
      if (!vectorLayer) {
        if (params && params.create) {
          vectorLayer = new ol.layer.Vector({
            layerName: layerName,
            params: params,
            layerType: 'vector',
            source: new ol.source.Vector({
              wrapX: false
            }),
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
          })
        }
      }
      if (map && vectorLayer) {
        // 同一类图层只能添加一次，添加多次会报错
        var _vectorLayer = getLayerByLayerName(layerName)
        if (!_vectorLayer || !(_vectorLayer instanceof ol.layer.Vector)) {
          map.addLayer(vectorLayer)
        }
      }
      return vectorLayer
    }
  } catch (e) {
    console.log(e)
  }
}
/**
 * 获取空间信息 (支持wkt和esriJSON)
 * @param data
 * @returns {*}
 */
var getGeometry = function (data) {
  var geometry = null
  if (data instanceof ol.geom.Geometry) {
    geometry = data;
  } else if (Array.isArray(data.geometry)) {
    geometry = new ol.geom.Point(data.geometry);
  } else if (data.hasOwnProperty('geometry') && data['geometry'].hasOwnProperty('paths')) {
    var feat = {
      'type': 'Feature',
      'geometry': {
        'type': 'MultiLineString',
        'coordinates': data['geometry'].paths
      }
    }
    geometry = (new ol.format.GeoJSON()).readGeometry(feat);
  } else {
    geometry = new ol.format.WKT().readGeometry(data.geometry);
  }
  return geometry
}
/**
 * 叠加点要素（单点）
 * @param point
 * @param params
 */
var addPoint = function (point, params) {
  var geometry = getGeometry(point)
  var feature = new ol.Feature({
    geometry: geometry,
    params: params
  })
  var style = new ol.style.Style({
    image: new ol.style.Icon({
      anchor: [0.5, 1],
      anchorXUnits: 'fraction',
      anchorYUnits: 'fraction',
      opacity: 0.75,
      src: './images/point.png',
      scale: 1
    })
  })
  feature.setStyle(style)
  if (params['attributes'] && params['attributes']['id']) {
    feature.setId(params['attributes']['id'])
  }
  if (params['layerName']) {
    var layer = createVectorLayer(params['layerName'], {
      create: true
    })
    layer.getSource().addFeature(feature)
  }
}
/**
 * 添加多个点
 * @param points
 * @param params
 */
var addPoints = function (points, params) {
  if (points && Array.isArray(points) && points.length > 0) {
    points.forEach(function (point) {
      if (point) {
        addPoint(point, params)
      }
    })
  }
}
/**
 * 添加单条线
 * @param line
 * @param params
 */
var addLine = function (line, params) {
  var geometry = getGeometry(line)
  var feature = new ol.Feature({
    geometry: geometry,
    params: params
  })
  var style = new ol.style.Style({
    stroke: new ol.style.Stroke({
      width: 4,
      color: '#449D44'
    })
  })
  feature.setStyle(style)
  if (params['attributes'] && params['attributes']['id']) {
    feature.setId(params['attributes']['id'])
  }
  if (params['layerName']) {
    var layer = createVectorLayer(params['layerName'], {
      create: true
    })
    layer.getSource().addFeature(feature)
  }
}
/**
 * 添加多条线
 * @param lines
 * @param params
 */
var addLines = function (lines, params) {
  if (lines && Array.isArray(lines) && lines.length > 0) {
    lines.forEach(function (line) {
      if (line) {
        addLine(line, params)
      }
    })
  }
}
/**
 * 添加面要素
 * @param polygon
 * @param params
 */
var addPolygon = function (polygon, params) {
  var geometry = getGeometry(polygon)
  var feature = new ol.Feature({
    geometry: geometry,
    params: params
  })
  var style = new ol.style.Style({
    fill: new ol.style.Fill({
      color: 'rgba(67, 110, 238, 0.4)'
    }),
    stroke: new ol.style.Stroke({
      color: '#449D44',
      width: 2
    }),
    image: new ol.style.Circle({
      radius: 7,
      fill: new ol.style.Fill({
        color: '#ffcc33'
      })
    })
  })
  feature.setStyle(style)
  if (params['attributes'] && params['attributes']['id']) {
    feature.setId(params['attributes']['id'])
  }
  if (params['layerName']) {
    var layer = createVectorLayer(params['layerName'], {
      create: true
    })
    layer.getSource().addFeature(feature)
  }
}
/**
 * 添加多个面要素
 * @param polygons
 * @param params
 */
var addPolygons = function (polygons, params) {
  if (polygons && Array.isArray(polygons) && polygons.length > 0) {
    polygons.forEach(function (polygon) {
      if (polygon) {
        addPolygon(polygon, params)
      }
    })
  }
}
/**
 * 通过id清除要素，id必选，layerName可选
 * @param id
 * @param layerName
 */
var removeFeatureByID = function (id, layerName) {
  if (map && id) {
    if (layerName) {
      var layer = getLayerByLayerName(layerName)
      if (layer) {
        var feature = layer.getSource().getFeatureById(id)
        if (feature && feature instanceof ol.Feature) {
          layer.getSource().removeFeature(feature)
        }
      }
    } else {
      var layers = map.getLayers().getArray()
      layers.forEach(function (layer) {
        if (layer && layer instanceof ol.layer.Vector && layer.getSource()) {
        var feature = layer.getSource().getFeatureById(id)
        if (feature && feature instanceof ol.Feature) {
          layer.getSource().removeFeature(feature)
        }
      }
    })
    }
  }
}
/**
 * 通过图层名清除要素
 * @param layerName
 */
var removeFeatureByLayerName = function (layerName) {
  var layer = getLayerByLayerName(layerName)
  if (layer && layer instanceof ol.layer.Vector && layer.getSource()) {
    layer.getSource().clear()
  }
}
/**
 * 恢复到全图
 * @param zoom
 */
var zoomMaxExtent = function (zoom) {
  var view = map.getView()
  zoom = (typeof zoom === 'number') ? zoom : 2
  if (map && view) {
    view.setCenter([113.62599749178007, 34.77023274980952])
    view.setZoom(zoom)
  }
}
/**
 * Created by ASUS on 2016/7/30.
 */
var appConfig = {
  mapConfig: {
    isOverViewMapVisible: true,
    isScaleLineVisible: true,
    projection: "EPSG:4326",
    extent: [109.72859368643232, 24.010266905347684, 121.13105988819079, 30.76693489432357],
    center: [115.92466595234826, 27.428038204473552],//江西省
    zoom: 1
  },
  layerConfig:{
    baseLayers: [
      {
        layerName: "二维地图",
        isDefault: true,
        layerType: "TileArcGISRest",
        layerUrl: "http://171.34.40.68:6080/arcgis/rest/services/JXMAP_2016/MapServer"//省
      },
      {
        layerName: "全国地图",
        layerType: "TileArcGISRest",
        layerUrl: "http://211.101.37.251:6080/arcgis/rest/services/jxgxptmap_2015ncyw/MapServer"
      },
      {
        layerName: "影像地图",
        layerType: "TileArcGISRest",
        layerUrl: "http://36.2.11.1:6080/arcgis/rest/services/JXWX20150425/MapServer"
      }
    ]
  },
  markConfig: {
    defaultImgURL: "img/map/marker.png",
    getHightImgURL: "img/map/dingwei-dj.png",
    getImgURL: "img/map/dingwei.png"
  }
}
var projection = ol.proj.get("EPSG:3857");
// projection.setExtent(appConfig.mapConfig.extent);
var a = ol.proj.fromLonLat(appConfig.mapConfig.center, projection);//从经度/纬度坐标转换到一个不同的投影,pro:目标投射
var view = new ol.View({
  center:ol.proj.fromLonLat(appConfig.mapConfig.center, projection),
  projection: projection,
  zoom: 5,//目标缩放
  minZoom:2,
  maxZoom:20
});
var baseLayer = [];
baseLayer.push(
  new ol.layer.Tile({//基本底图
    source: new ol.source.OSM(),
    visible:true,
    layerName: "base",
  })
);
baseLayer.push(
  new ol.layer.Tile({//天地图
    source: new ol.source.XYZ({
      url: 'http://t3.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}'
    }),
    visible:false,
    layerName: "tianditu",
  })
);
/*加载百度地图*/
// var projection = ol.proj.get("EPSG:3857");
var resolutions = [];
for(var i=0; i<19; i++){
  resolutions[i] = Math.pow(2, 18-i);
}
var tilegrid  = new ol.tilegrid.TileGrid({
  origin: [0,0],
  resolutions: resolutions
});

var baidu_source = new ol.source.TileImage({
  projection: ol.proj.get("EPSG:3857"),
  tileGrid: tilegrid,
  tileUrlFunction: function(tileCoord, pixelRatio, proj){
    if(!tileCoord){
      return "";
    }
    var z = tileCoord[0];
    var x = tileCoord[1];
    var y = tileCoord[2];

    if(x<0){
      x = "M"+(-x);
    }
    if(y<0){
      y = "M"+(-y);
    }
    return "http://online3.map.bdimg.com/onlinelabel/?qt=tile&x="+x+"&y="+y+"&z="+z+"&styles=pl&udt=20151021&scaler=1&p=1";
  }
});
baseLayer.push(
  new ol.layer.Tile({
    source: baidu_source,
    visible:false,
    layerName: "baidumap",
  })
)
var gaodeBase = 'http://webrd03.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}y={y}&z={z}';
// var gaodeBase = 'http://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}';
/*加载高德地图*/
baseLayer.push(
  new ol.layer.Tile({
    source: new ol.source.XYZ({
      projection: 'EPSG:3857',
      tileUrlFunction: function (tileCoord, pixelRatio, proj) {
        var _url = gaodeBase.replace('{z}', (tileCoord[0]).toString())
          .replace('{x}', tileCoord[1].toString())
          .replace('{y}', (-tileCoord[2] - 1).toString());
        return _url;
      }
    }),
    visible:false,
    layerName: "gaode",
  })
)
/*
* 地图初始化
* @params view：	ol.View | undefined
* @params baseLayer: Array
* */
var hdmap = new hdsxMap();
hdmap.init(view,baseLayer);
console.log(self.Map);
/*
* 功能:底图切换
*
* */
$("#btn1").click(function () {
  var baseLayer = hdmap.getBaselayerByName(this.value);
  baseLayer.setVisible(true);
});
$("#btn2").click(function () {
  var baseLayer = hdmap.getBaselayerByName(this.value);
  baseLayer.setVisible(true);
});
$("#btn3").click(function () {
  var baseLayer = hdmap.getBaselayerByName(this.value);
  baseLayer.setVisible(true);
});
$("#btn4").click(function () {
  var baseLayer = hdmap.getBaselayerByName(this.value);
  baseLayer.setVisible(true);
});

/*
* 单点标绘
* */
$("#btn5").click(function () {
  var point = ol.proj.fromLonLat(appConfig.mapConfig.center, projection);
  var lon = point[0],lat = point[1];
  hdmap.addPoint({geometry:"POINT("+lon+" "+lat+")"},{
    layerName:"point",
    moveable: true,
    type:"",
    drawend: function (evt) {
      var point = evt.feature.getGeometry();
      //根据点查询兴趣点服务
      var extent = point.getCoordinates();
      console.log(extent);
    }
  },"fistPoint");
});
/*
* 实时获取移动点的坐标
* */
window.ObservableObj.on('featureMove',function (ev) {
  var feat = ev.target.get("featureMove");
  var coordinate = feat.getGeometry().getCoordinates();
  // console.log(coordinate);
});
/*
* 获取移动点的最后位置
* */

/*
* 多点标绘
* */
$("#btn6").click(function () {
  $.ajax({
    url: "json/point.json",
    dataType: 'json',
    success: function (data) {
      var data = data.rows;
      var points = [];
      for (var i = 0; i < data.length; i++){
        var coor = [];
        coor[0] = data[i]["ptx"],coor[1] = data[i]["pty"];
        var coordinate = ol.proj.fromLonLat(coor, projection);
        var attributes = "POINT("+coordinate[0]+" "+coordinate[1]+")";
        points.push({attributes:attributes,id:data[i].id,type:data[i].type});
      }
      var params = {
        layerName:"point",
        type:"getImgURL"
      }
      hdmap.addPoints(points,params);
    }
  });
});
/*
* 线标绘
* */
$("#btn7").click(function () {
 /* $.ajax({
    url: "json/luxian.json",
    dataType: 'json',
    success: function (data) {
      debugger;
      console.log(data);
      var features = data.data["features"];
      hdmap.addPolylines(features, "lines",null);
    }
  });*/
  hdmap.getFeature("0","point");
});
/*
* 清空地图
* */
$("#btn8").click(function () {
  hdmap.clearGraphics();
});
/*
* 地图点击事件
* */
$("#btn9").click(function () {
  hdmap.click();
});

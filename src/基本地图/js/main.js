/**
 * Created by ASUS on 2016/7/25.
 */
function mapService() {
  var hdmap = {
    /*初始化地图*/
    init:function () {
      var layerTitle = "http://171.34.40.68:6080/arcgis/rest/services/JXMAP_2016_2/MapServer";
      $.ajax({
        url: layerTitle + "?f=pjson",
        type: "GET",
        dataType: 'jsonp',
        jsonp: 'callback',
        success: function (data) {
          // console.log(data.fullExtent.xmin);
          var fullExtent = [data.fullExtent.xmin, data.fullExtent.ymin, data.fullExtent.xmax, data.fullExtent.ymax];//获得地图范围
          var projection = ol.proj.get("EPSG:" + data.spatialReference.wkid);//获得投影对象？
          projection.setExtent(fullExtent);//设置可见范围
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
          var urlTemplate = layerTitle + "/tile/{z}/{y}/{x}";
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
            source: tileArcGISXYZ,
            extent: fullExtent
          });
          var center=[115.92466595234826, 27.428038204473552];//江西省
          var scaleLineControl = new ol.control.ScaleLine();//创建一个比例尺
          /***************创建地图容器****************/
          self.map = new ol.Map({
            target: 'map',
            controls: ol.control.defaults({
              attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
                collapsible: false
              })
            }).extend([
              scaleLineControl
            ]),
            interactions: ol.interaction.defaults({doubleClickZoom: false}),
            layers: [baseLayer],    //必须定义
            view: new ol.View({
              center: ol.proj.fromLonLat(center, projection),//从经度/纬度坐标转换到一个不同的投影,pro:目标投射
              zoom: 1,//目标缩放
              projection: projection,//设置地图投影
              extent: fullExtent,//设置地图范围
              maxResolution: resolutions[0],//最大分辨率
              minResolution: resolutions[len - 1]//最小分辨率
            })
          });
          /*创建一个临时图层*/
          var layerName = "1"
          var vectorSource = new ol.source.Vector({
            wrapX: false
          });
          var vectorLayer = new ol.layer.Vector({
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
          map.addLayer(vectorLayer);
          /*********end********/
          /*标绘*/
          addMarker("#7fcbc9","Here is a bluetooth device","fa fa-bluetooth",[114.83185084193587, 28.295288750594928]);
          addMarker("#57ab96","Meeting Area","fa fa-calendar",[116.91925323471904, 28.278809258020324]);
          function addMarker(color,text,iconclass, coordinate){
            var marker = document.createElement('div');

            var pin = document.createElement('div');
            pin.className = "cssmarker-pin";
            pin.style.backgroundColor = color;;

            var icon = document.createElement('span');
            icon.innerHTML = "<i class='"+iconclass+"'></i>";

            pin.appendChild(icon);

            var shadow = document.createElement('div');
            shadow.className = "cssmarker-shadow";
            pin.onclick = function(){
              content.innerHTML = text;
              // popup.setPosition(ol.proj.transform(coordinate, 'EPSG:4326', 'EPSG:3857'));
            };
            marker.appendChild(pin);
            marker.appendChild(shadow);
            var coodrs = ol.proj.transform(coordinate,'EPSG:4326','EPSG:3857');
            console.log(coodrs);
            self.map.on('click',function (ev) {
              console.log(ev.coordinate);
            })

            marker = new ol.Overlay({
              element: marker,
              position: ol.proj.transform(coordinate, 'EPSG:4326', 'EPSG:4326'),
              positioning: 'center-center'
            });
            self.map.addOverlay(marker);
          }
        }
      });
      return self.map;
    },
    addPoint:function () {
      console.log(self.map);
    }
  }
  return hdmap;
}

/**
 * Created by ASUS on 2016/7/31.
 */
var meature = function () {};
meature.prototype = {
  init:function (view,baseLayer) {
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
      interactions: ol.interaction.defaults({doubleClickZoom: false}),
      layers: [baseLayer],    //必须定义
      view: view
    });
    var zoomslider = new ol.control.ZoomSlider();
    self.Map.addControl(zoomslider);
  },
  /*
  * 创建一个临时图层
  * */
  CreatTempLayer:function () {
    var source = new ol.source.Vector();//创建向量数据图层
    var vector = new ol.layer.Vector({
      source: source,
      style: new ol.style.Style({
        fill: new ol.style.Fill({
          color: 'rgba(255, 255, 255, 0.2)'
        }),
        stroke: new ol.style.Stroke({
          color: '#ffcc33',
          width: 2
        }),
        image: new ol.style.Circle({
          radius: 4,
          stroke: new ol.style.Stroke({
            color: 'rgba(255,0,0,1)',
            width: 1
          }),
          fill: new ol.style.Fill({
            color: 'rgba(255,255,255,0)'
          })
        })
      })
    });
    draw = new ol.interaction.Draw({
      source: source,
      type: /** @type {ol.geom.GeometryType} */ ("Point")
    });
    this.Map.addInteraction(draw);
    this.Map.addLayer(vector);
  },
  /*
  * 创建测量工具
  * */
  meature:function () {
    /*********************************/
    var sketch;
    var helpTooltipElement;
    var helpTooltip;
    var continuePolygonMsg = '点击继续画多边形';
    var continueLineMsg = '点击继续画线';
    var helpMsg = '单击开始';
    var measureTooltipElement;
    var measureTooltip;
    /*
    * 设置当前指针样式
    * */
    this.Map.getTargetElement().style.cursor = "url(img/cur/ruler.cur) 2 5.5, default";
    /**
     * Handle pointer move.
     * 指针移动
     * @param {ol.MapBrowserEvent} evt The event.
     */
    var pointerMoveHandler = function(evt) {
      if (evt.dragging) {
        return;
      }
      if (sketch) {
        var geom = (sketch.getGeometry());
        if (geom instanceof ol.geom.Polygon) {
          helpMsg = continuePolygonMsg;//提示画多边形
        } else if (geom instanceof ol.geom.LineString) {
          helpMsg = continueLineMsg;//提示画线
        }
      }
      helpTooltipElement.innerHTML = helpMsg;
      helpTooltip.setPosition(evt.coordinate);
      helpTooltipElement.classList.remove('hidden');
    };
    /**************创建临时图层结束****************/

    this.Map.on('pointermove', pointerMoveHandler);//地图移动事件
    /*map.getViewport().addEventListener('mouseout', function() {
     helpTooltipElement.classList.add('hidden');
     });*/
    var draw;
    function addInteraction() {
      var type = ('LineString');
      this.Map.on("click",function () {
        type = 'Point'
      });
      draw = new ol.interaction.Draw({
        source: source,
        type: /** @type {ol.geom.GeometryType} */ (type),
        style: new ol.style.Style({
          fill: new ol.style.Fill({
            color: 'rgba(255, 255, 255, 0.2)'
          }),
          stroke: new ol.style.Stroke({
            color: 'rgba(0, 0, 0, 0.5)',
            lineDash: [10, 10],
            width: 2
          }),
          image: new ol.style.Circle({
            radius: 4,
            stroke: new ol.style.Stroke({
              color: 'rgba(255, 0, 0, 0.7)'
            }),
            fill: new ol.style.Fill({
              color: 'rgba(255, 255, 255, 0.2)'
            })
          })
        })
      });
      this.Map.addInteraction(draw);

      createMeasureTooltip();
      createHelpTooltip();

      var listener;
      draw.on('drawstart',
        function(evt) {
          // set sketch
          sketch = evt.feature;

          /** @type {ol.Coordinate|undefined} */
          var tooltipCoord = evt.coordinate;

          /*listener = sketch.getGeometry().on('change', function(evt) {
           var geom = evt.target;
           var output;
           if (geom instanceof ol.geom.Polygon) {
           output = formatArea(geom);
           tooltipCoord = geom.getInteriorPoint().getCoordinates();
           } else if (geom instanceof ol.geom.LineString) {
           output = formatLength(geom);
           tooltipCoord = geom.getLastCoordinate();
           }
           measureTooltipElement.innerHTML = output;
           measureTooltip.setPosition(tooltipCoord);
           });*/
        }, this);

      draw.on('drawend',
        function() {
          measureTooltipElement.className = 'tooltip tooltip-static';
          measureTooltip.setOffset([0, -7]);
          // unset sketch
          sketch = null;
          // unset tooltip so that a new one can be created
          measureTooltipElement = null;
          createMeasureTooltip();
          ol.Observable.unByKey(listener);
        }, this);
    };
    /**
     * 创建一个帮助提示
     */
    function createHelpTooltip() {
      if (helpTooltipElement) {
        helpTooltipElement.parentNode.removeChild(helpTooltipElement);
      }
      helpTooltipElement = document.createElement('div');
      helpTooltipElement.className = 'tooltip hidden';
      helpTooltip = new ol.Overlay({
        element: helpTooltipElement,
        offset: [15, 0],
        positioning: 'center-left'
      });
      this.Map.addOverlay(helpTooltip);
    };
    /**
     * Creates a new measure tooltip
     */
    function createMeasureTooltip() {
      if (measureTooltipElement) {
        measureTooltipElement.parentNode.removeChild(measureTooltipElement);
      }
      measureTooltipElement = document.createElement('div');
      measureTooltipElement.className = 'tooltip tooltip-measure';
      measureTooltip = new ol.Overlay({
        element: measureTooltipElement,
        offset: [0, -15],
        positioning: 'bottom-center'
      });
      this.Map.addOverlay(measureTooltip);
    };
    /*function addPoint() {
      draw = new ol.interaction.Draw({
        source: source,
        type: /!** @type {ol.geom.GeometryType} *!/ ("Point")
      });
      this.Map.addInteraction(draw);
    }*/
    // addPoint();
    addInteraction();
  }
}

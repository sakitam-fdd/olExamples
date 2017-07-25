$('.map-change-content').on('mouseover', function () {
  $(this).find('.mapType-wrapper').addClass('expand');
});
$('.map-change-content').on('mouseout', function () {
  $(this).find('.mapType-wrapper').removeClass('expand')
});
$('.map-change-content').find('.mapTypeCard').on('click', function () {
  baseLayerChange($(this).attr('data-name'))
});
$('.nav-content').find('button').on('click', function () {
  var type = $(this).attr('data-name')
  switch (type) {
    case 'addPoint':
      var point = {
        attributes: { // 属性信息
          id: '01'
        },
        geometry: 'POINT (113.62599749178007 34.77023274980952)' // 或者[113.62599749178007, 34.77023274980952]
      }
      addPoint(point, {
        layerName: 'point'
      })
      break;
    case 'addPoints':
      var points = [
        {
          attributes: { // 属性信息
            id: '01'
          },
          geometry: 'POINT (113.62599749178007 34.77023274980952)' // 或者[113.62599749178007, 34.77023274980952]
        },
        {
          attributes: { // 属性信息
            id: '02'
          },
          geometry: 'POINT (113.52589749178007 34.77023274980952)'
        }
      ]
      addPoints(points, {
        layerName: 'point'
      })
      break;
    case 'removePoints':
      removeFeatureByLayerName('point')
      break;
    case 'addLine':
      var line = {
        attributes: { // 属性信息
          id: '01'
        },
        geometry: 'LINESTRING (113.62599749178007 34.77023274980952, 113.52589749178007 34.77023274980952, 113.42589749178007 34.77023274980952, 113.32589749178007 34.77023274980952, 113.22589749178007 34.77023274980952)'
      }
      addLine(line, {
        layerName: 'line'
      })
      break;
    case 'addLines':
      var lines = [
        {
          attributes: { // 属性信息
            id: '01'
          },
          geometry: 'LINESTRING (113.62599749178007 34.77023274980952, 113.52589749178007 34.77023274980952, 113.42589749178007 34.77023274980952, 113.32589749178007 34.77023274980952, 113.22589749178007 34.77023274980952)'
        },
        {
          attributes: { // 属性信息
            id: '02'
          },
          geometry: 'LINESTRING (113.62599749178007 34.67023274980952, 113.52589749178007 34.57023274980952, 113.42589749178007 34.47023274980952, 113.32589749178007 34.37023274980952, 113.22589749178007 34.27023274980952)'
        }
      ]
      addLines(lines, {
        layerName: 'line'
      })
      break;
    case 'removeLines':
      removeFeatureByLayerName('line')
      break;
    case 'addPolygon':
      var polygon = {
        attributes: { // 属性信息
          id: '01'
        },
        geometry: 'POLYGON ((113.62599749178007 34.77023274980952, 113.52589749178007 34.67023274980952, 113.42589749178007 34.57023274980952, 113.32589749178007 34.77023274980952, 113.62599749178007 34.77023274980952))'
      }
      addPolygon(polygon, {
        layerName: 'polygon'
      })
      break;
    case 'addPolygons':
      var polygons = [
        {
          attributes: { // 属性信息
            id: '01'
          },
          geometry: 'POLYGON ((113.62599749178007 34.77023274980952, 113.52589749178007 34.67023274980952, 113.42589749178007 34.57023274980952, 113.32589749178007 34.77023274980952, 113.62599749178007 34.77023274980952))'
        },
        {
          attributes: { // 属性信息
            id: '02'
          },
          geometry: 'POLYGON ((113.02599749178007 34.07023274980952, 113.12589749178007 34.67023274980952, 113.42589749178007 34.57023274980952, 113.32589749178007 34.77023274980952, 113.02599749178007 34.07023274980952))'
        }
      ]
      addPolygons(polygons, {
        layerName: 'polygon'
      })
      break;
    case 'removePolygons':
      removeFeatureByLayerName('polygon')
      break;
  }
});
$('.tool-content').find('.tool-button').on('click', function () {
  var type = $(this).attr('data-name')
  switch (type) {
    case 'measureLength':
      measure.setUp({
        measureType: 'measureLength'
      });
      break;
    case 'measureArea':
      measure.setUp({
        measureType: 'measureArea'
      });
      break;
    default:
      zoomMaxExtent(6)
      break
  }
})
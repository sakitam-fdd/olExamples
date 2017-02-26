// 图像序列类型
var dt_null = 0;
var dt_trimble = 1;
var dt_imms = 2;
var dt_imajbox = 3;
var dt_streetview = 4;
var dt_topcon = 5;
var dt_riegl = 6;
var dt_optech = 7;


// 采样模式类型
var id_sample_cloud = 50401;
var id_sample_photo = 50402;
var id_sample_3d = 50403;
var id_sample_plane = 50404;
var id_sample_ground = 50405;
var id_sample_depth = 50406;


function onFrame(id) {
    var ret = PPVision.locateByID(dt_imajbox, id);//42670 49466 11330
    log_locate(ret);
    $("#history").remove();
}

function initPPVision() {
    var ret = PPVision.setServer("http://211.101.37.253:8099/PPVisionServer.asmx");
    var ret = PPVision.locate(dt_imajbox,115.65485600010538,28.667662000102098,0.0);//php：20903
    log_locate(ret);
}
function log_locate(ret) {
    switch (ret) {
        case 1:
            $("#log").text("locate: busy");
            break;
        case 2:
            $("#log").text("locate: type invalidate");
            break;
        case 3:
            $("#log").text("locate: null data");
            break;
        case 4:
            $("#log").text("locate: change srs, please save your feature");
            break;
        case 5:
            $("#log").text("locate: no license");
            break;
    }
}

function locate() {

}


///
/// 按钮事件
///
$("#samplePhoto").click(function () {
    PPVision.setSampleMode(id_sample_photo);
});
$("#sampleGround").click(function () {
    PPVision.setSampleMode(id_sample_ground);
});
$("#popHtml").click(function () {
    PPVision.popHtml('www.baidu.com');
});
$("#lookAt").click(function () {
    PPVision.lookAt(0, 0, 0);
});
$("#play").click(function () {
    PPVision.play();
});
$("#stop").click(function () {
    PPVision.stop();
});
$(document).keydown(function(e) {
    console.log(e.keyCode);
})
$("#fore").click(function () {
    var fid = PPVision.getFrame();
    PPVision.locateByID(dt_imajbox, fid+1);
});

$("#back").click(function () {
    var fid = PPVision.getFrame();
    PPVision.locateByID(dt_imajbox, fid-1);
});


$("#addLayer").click(function () {
    var layer_point = {
        "name": "Lamp Pole",
        "type": "Point",//Point, Line, Polygon 三种类型，并非强约束
        "color": "0,0,255,255",//RGBA or RGB
        "size": 15,
        "icon": {
            "size": [48, 48],
            "offset": [0, 24],
            "url": "http://localhost/icon/019-marker.png"
        }
    };
    var json = JSON.stringify(layer_point);
    hlay_point = PPVision.addLayer(json);


    var layer_line = {
        "name": "test",
        "type": "Line",//Point, Line, Polygon 三种类型，并非强约束
        "color": "0,0,255,255",//RGBA or RGB
        "size": 2
    };
    var json = JSON.stringify(layer_line);
    hlay_line = PPVision.addLayer(json);

    var layer_poly = {
        "name": "test_poly",
        "type": "Polygon",//Point, Line, Polygon 三种类型，并非强约束
        "color": "0,255,0,128",//RGBA or RGB
        "size": 2
    };
    var json = JSON.stringify(layer_poly);
    hlay_poly = PPVision.addLayer(json);
});
$("#removeLayer").click(function () {
    PPVision.removeLayer(hlay_point);
    hlay_point = 0;
    PPVision.removeLayer(hlay_line);
    hlay_line = 0;
    PPVision.removeLayer(hlay_poly);
    hlay_poly = 0;
});
// 添加一个点，到新建的图层
$("#addFeature").click(function () {
    var fe_point = {
        "type": "Feature",
        "properties": {
            "fid": 1234,
            "name": "灯杆"
            /*
             "color":"0,255,255,255",//RGBA or RGB
             "size":25,
             "icon":{
             "size":[32,32],
             "offset":[0,16],
             "url":"http://localhost/icon/019-marker.png"
             }
             */
        },
        "geometry": {
            "type": "Point",
            "coordinates": [103.7618144853319, 36.08614306284845, 1481.648249594895]
        }
    };
    var json = JSON.stringify(fe_point);
    hfe_point = PPVision.addFeature(hlay_point, json);

    var fe_line = {
        "type": "Feature",
        "properties": {
            "fid": 1235,
            "name": "灯杆线"
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [103.7618144853319, 36.08614306284845, 1481.648249594895],
                [103.7618208079553, 36.08615258697326, 1488.536865634426],
                [103.7618001531699, 36.08614508641016, 1490.143430821786]
            ]
        }

    };
    var json = JSON.stringify(fe_line);
    hfe_line = PPVision.addFeature(hlay_line, json);

    var fe_poly = {
        "type": "Feature",
        "properties": {
            "fid": 1236,
            "name": "地面斑",
            "to_ground": true
        },
        "geometry": {
            "type": "Polygon",
            "coordinates": [[[103.7617351272638, 36.08608582409791, -1.5],
                [103.76173257549, 36.08612553371825, -1.5],
                [103.7617494401201, 36.08611998333379, -1.5],
                [103.7617639558404, 36.08609277851573, -1.5]]]

            /*
             [[[103.7617351272638,36.08608582409791,1480.280999952316],
             [103.76173257549,36.08612553371825,1480.280999952316],
             [103.7617494401201,36.08611998333379,1480.280999952316],
             [103.7617639558404,36.08609277851573,1480.280999952316]]]

             */
        }
    };
    var json = JSON.stringify(fe_poly);
    hfe_poly = PPVision.addFeature(hlay_poly, json);

});
// 删除刚才新建的对象
$("#removeFeature").click(function () {
    PPVision.removeFeature(hfe_point);
    hfe_point = 0;
    PPVision.removeFeature(hfe_line);
    hfe_line = 0;
    //PPVision.removeFeature(hfe_poly);	hfe_poly = 0;

    hfe = PPVision.findFeatureByID(1236);
    PPVision.removeFeature(hfe);

});
// 获取刚才新建的对象定义
$("#getFeature").click(function () {
    var def = PPVision.getFeature(hfe);

    $("#log").text("<xmp>" + def + "</xmp>");
});

///
/// PPVision Events
///
function PPVision::onInit()
{
    //响应控件初始化
    //init();
    //var node = document.getElementById("log");
    //node.innerHTML = "PPVision init";
}
function PPVision::onTool(cid)
{
    //响应设置当前工具
    $("#log").text("tool changed: " + cid);
}
function PPVision::onSampleMode(mode)
{
    //响应设置当前采样模式
    $("#log").text("sample mode changed: " + mode);
}
function PPVision::onFeatureCreate(def)
{
    //响应要素创建成功
    $("#log").text(def);

    //
    var fe = JSON.parse(def);//浏览器内置对象
    layerFeature.addData(fe);//添加到gis窗口

    //添加到PPVision，这样设计是为了让用户有机会编辑它的id，以及选择图层
    //图层要提前准备好
    var type = fe["geometry"]["type"];
    if (type == "Point") {
        PPVision.addFeature(hlay_point, def);
    }
    else if (type == "LineString") {
        PPVision.addFeature(hlay_line, def);
    }
    else if (type == "Polygon") {
        PPVision.addFeature(hlay_poly, def);
    }
}
function PPVision::onFeatureSelect(handle, id)
{
    //响应要素选中
    $("#log").text("select: " + id);
}
function PPVision::onFeatureRemove(handle, id)
{
    //响应要素删除
    $("#log").text("remove: " + id);
}
function PPVision::onHistory(id)
{
    //响应历史对比
    //$("body").append("<iframe id=\"history\" src=\"file://c:/ppvision/cache/history.html\"></iframe>");
    /*
     var id=11330;
     var tol = 50;
     var angle = 15;
     $.get("php/history.php",{ id: id, tol:tol, angle:angle }, function(ret){
     if (ret=="")
     return;
     $("body").append(ret);
     });
     */
}
function PPVision::onMeasure(def)
{
    //响应测量位置坐标
    $("#log").text(def);
}
function PPVision::onPosition(lon, lat, alt)
{
    var center = [lon, lat];
    if (typeof(self.map)!= "undefined"){
        clearGraphics();
        addMarker(center);
    }
    //响应视点移动
    $("#eye").text("(" + lon + "," + lat + "," + alt + ")");
}
function PPVision::onHeading(heading, fovx)
{
    //响应视角改变
    $("#eye").text("heading: " + heading + ", fov: " + fovx);

    //旋转视点
    if (typeof(eyeMarker) != "undefined" && typeof(g_coord) != "undefined") {
        eyeMarker.setAngle(heading);
    }
}
function PPVision::onFrame(fid)
{
    //this.fid = fid;
    //响应照片改变
    $("#log").text("frame changed: " + fid);
}
function PPVision::onOut(str)
{
    //响应控件内部输出信息
    $("#out").text(str);
}

/**
 * Created by 张永平 on 2016/7/11.
 */

var length = 0;  //图片长度
var picturesWidth = 0;
var areaNumber = 0;
var round = 1;
var number = 0;
$(function(){
    var jsonurl = "http://211.101.37.253:6080/arcgis/rest/services/PPVWGS84/MapServer/0/query?where=78823+%3C+IMGID++AND+IMGID+%3C+78913&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&f=pjson";
    var picServer = "http://211.101.37.253:8099";
    $.ajax({
        url: jsonurl,
        type: "GET",
        dataType: 'jsonp',
        jsonp: 'callback',
        success: function (data) {
            var pictures = data.features;
            var picturesHtml = "";
            length = pictures.length;
            if(pictures.length != 0){
                for(var i=0;i<pictures.length;i++){
                    var picture = "<div class='picture-item' index='"+i+"' geometryX='"+pictures[i].geometry.x+"' geometryY='"+pictures[i].geometry.y+"' imgID='"+pictures[i].attributes.IMGID+"' url='"+pictures[i].attributes.URL+"'>" +
                        "<div class='picture-item-wraper'>" +
                        "<img src='"+picServer+pictures[i].attributes.URL+"'/>" +
                        "</div>" +
                        "</div>"
                    picturesHtml += picture;
                };
                $(".picture-wraper").append(picturesHtml);  //追加div内容
                $('.picture-wraper').find('.picture-item:first').addClass( "picture-selected" );  //第一张图片默认选中状态

                // 图片点击事件
                $('.picture-item').each(function(){
                    $(this).click(function () {
                        locationPoint(getAttributes(this));
                        $(this).addClass( "picture-selected" );
                        $(".picture-wraper").find(".picture-item").eq(parseInt(index)-1).addClass( "picture-selected");
                        var index = $(this).attr("index");
                        removeClass(index);
                    });
                });
                picturesWidth = $('.pictures').width(); //获取当前pictures 所占比例
                areaNumber = parseInt((picturesWidth - 60)/(202+5)) - 1;
            }
        },
        error: function (err) {
            console.error(err);
        }
    });

});
/**
 * 上一张
 */
function lastOne() {
    var getSelected = false;//被选中状况
    var index = 0;
    $('.picture-item').each(function(){
        var isClass = $(this).hasClass("picture-selected");   //获取带有选中状态的属性
        if(isClass){
            index = $(this).attr("index");
            getSelected = true;
        }
    })
    if(getSelected){
        if(parseInt(index) == 0){
            return;
        }else{
            var lastPicture = $(".picture-wraper").find(".picture-item").eq(parseInt(index)-1).addClass( "picture-selected");
            locationPoint(getAttributes(lastPicture));
            removeClass(parseInt(index)-1);

            var reductioRange = length - areaNumber;
            if(reductioRange > 0) {   //图片放不下
                if(parseInt(index) == round * areaNumber - areaNumber){   //图片放不下
                    number = round * areaNumber - 1 - areaNumber;
                    round = round - 1;
                    for(var i=0;i<areaNumber;i++){
                        $(".picture-wraper").find(".picture-item").eq(number--).show();
                    }
                }
            }
        }
    }
};
/**
 * 下一张
 */
function nextOne() {
    var getSelected = false;//被选中状况
    var index = 0;
    $('.picture-item').each(function(){
        var isClass = $(this).hasClass("picture-selected");   //获取带有选中状态的属性
        if(isClass){
            index = $(this).attr("index");
            getSelected = true;
        }
    })
    if(getSelected){
        if(parseInt(index)+1 == length){
            return;
        }else{
            var nextPicture = $(".picture-wraper").find(".picture-item").eq(parseInt(index)+1).addClass( "picture-selected");
            locationPoint(getAttributes(nextPicture));
            removeClass(parseInt(index)+1);
            var reductioRange = length - areaNumber;
            if(reductioRange > 0){   //图片放不下
                if(parseInt(index) == areaNumber*round -1){
                    number = areaNumber*round - 1;
                    round = round + 1;
                    for(var i=0;i<areaNumber;i++){
                        $(".picture-wraper").find(".picture-item").eq(number--).hide();
                    }
                }
            }
        }
    }
};
/**
 * 移除除index外其他的样式
 * @param index 当前选中的图片的index属性 值
 */
function removeClass(index) {
    $('.picture-item').each(function(){
        var i =  $(this).attr("index");
        if(i != index){
            $(this).removeClass( "picture-selected" );  //移除class选中状态样式
            return;
        }
    });
};
/**
 * 获取当前信息
 * @param feature 当前this中包含的值
 * @returns {{imgID: (*|jQuery), url: (*|jQuery), geometry: {x: (*|jQuery), y: (*|jQuery)}}}
 */
function getAttributes(feature) {
    var x = $(feature).attr("geometryX");
    var y = $(feature).attr("geometryY");
    var geometry = {
        x:x,
        y:y
    }
    var imgID = $(feature).attr("imgID");
    var url = $(feature).attr("url");

    var featureObj = {
        imgID:imgID,
        url:url,
        geometry:geometry
    }
    return featureObj;
};
/**
 *  根据当前信息定位点
 * @param feature 根据当前信息定位点
 */
function locationPoint(feature) {
    PPVision.locate(dt_imajbox,feature.geometry.x,feature.geometry.y,0.0);
};

/**
 * 根据id展示下方图片
 * @param imgID  图片ID
 */
function displayImgByID(imgID) {
    var id = "";
    $('.picture-item').each(function(){
        id = $(this).attr("imgID");
        if(imgID == id){
            var index = $(this).attr("index");
            $(".picture-wraper").find(".picture-item").eq(parseInt(index)).addClass( "picture-selected");
            removeClass(index);
            number = index - index%areaNumber - 1;
            round = parseInt(index/areaNumber)+1;
            for(var i = 0;i < index;i++){
                $(".picture-wraper").find(".picture-item").eq(number--).hide();
            };
        }
    })
};

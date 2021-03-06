<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<jsp:useBean id="now" class="java.util.Date" scope="page"/>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<html>
<head>
    <title>考勤</title>
    <meta name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"/>
    <link href="${ctx}/resources/mui/mui.min.css" rel="stylesheet"/>
    <link rel="shortcut icon" href="${ctx}/resources/ico/app.ico"/>
    <link href="${ctx}/resources/plugins/layui/css/layui.css" rel="stylesheet">
    <link href="${ctx}/resources/css/student/attence.css" rel="stylesheet">
    <script>
        var ctx = '${ctx}';
        var student = "${studentsession}";
        var studentId = "${studentsession.studentId}";
        var courseId = "${release.courseId}";
        var path ="${studentsession.studentPic}"
    </script>
</head>
<body>
<header class="mui-bar mui-bar-nav mui-badge-primary">
    <span class="mui-icon mui-icon-back" onclick="javascript:history.back(-1);"></span>
    <h1 class="mui-title">考勤</h1>
    <style>
        #allmap{
            width:100px;
            height: 100px;
        }
        #success{
            position: absolute;
            right: 0px;
        }
    </style>
</header>
<div class="mui-content">
    <input type="file" id="fileElem" accept="image/*" style="display: none">
    <input type="file" id="fileElem1" accept="image/*" style="display: none">
    <input type="hidden" value="${release.releaseId}" id="releaseId">
    <div style="color: red;margin-top: 5px;">
        <c:if test="${(release.startTime<now)&&(release.endTime>now)}">
            <span class="mui-badge mui-badge-success" id="success" status ="1">进行中</span>
        </c:if>
        <c:if test="${release.endTime<now}">
            <span class="mui-badge mui-badge-primary" id="success" status ="2">已过期</span>
        </c:if>
        <c:if test="${now<release.startTime}">
            <span class="mui-badge mui-badge-danger" id="success" status ="0">未开始</span>
        </c:if>
        <h4  class="layui-timeline-title">开始时间：<span id="s"><fmt:formatDate value="${release.startTime}" pattern="yyyy-MM-dd HH:mm:ss" /></span></h4>
        <h4  class="layui-timeline-title">结束时间：<span id="e"><fmt:formatDate value="${release.endTime}" pattern="yyyy-MM-dd HH:mm:ss" /></span></h4>
    </div>
    <div class="top" style="margin-top: 10px;">
        <ul class="layui-timeline">
            <li class="layui-timeline-item" id="start-time">
                <i class="layui-icon layui-timeline-axis"></i>
                    <div class="layui-timeline-content layui-text" >
                        <h4 class="layui-timeline-title">上课签到</h4>
                    </div>
            </li>
            <li class="layui-timeline-item" id="end-time" style="display: none">
                <i class="layui-icon layui-timeline-axis"></i>
                <div class="layui-timeline-content layui-text">
                    <h4 class="layui-timeline-title">下课签退</h4>
                </div>
            </li>
        </ul>
    </div>
    <div class="c-center">
        <div class="center">
            <label for="fileElem">
                <div class="mui-card" id="start">
                    <!--内容区-->
                    <div class="mui-card-content">
                        上课签到
                        <p></p>
                    </div>
                </div>
            </label>
            <label for="fileElem1">
                <div class="mui-card" id="end" style="display: none">
                    <!--内容区-->
                    <div class="mui-card-content">
                        下课签到
                        <p></p>
                    </div>
                </div>
            </label>

        </div>
    </div>
    <div id="allmap" style="display: none"></div>
</div>
</body>
<%--引入js文件--%>
<script src="${ctx}/resources/js/jquery-2.1.4.js" type="application/javascript"></script>
<script src="${ctx}/resources/plugins/layui/layui.js" type="application/javascript"></script>
<script src="${ctx}/resources/mui/mui.min.js" type="application/javascript"></script>
<script type="text/javascript" src="http://api.map.baidu.com/api?ak=PlhFWpA02aoURjAOpnWcRGqw7AI8EEyO&v=2.0&services=false"></script>
<script type="text/javascript">
  var locations = "";
  var map = new BMap.Map("allmap");
  var point = new BMap.Point(116.331398,39.897445);
  map.centerAndZoom(point,12);

  var geoc = new BMap.Geocoder();
  var geolocation = new BMap.Geolocation();
  geolocation.getCurrentPosition(function(r){
    if(this.getStatus() == BMAP_STATUS_SUCCESS){
      var mk = new BMap.Marker(r.point);
      map.addOverlay(mk);
      map.panTo(r.point);
      setLocation(r.point);
    }
    else {
      alert('failed'+this.getStatus());
    }
    //获取地理位置的函数
    function setLocation(point){
      geoc.getLocation(point, function(rs){
        var addComp = rs.addressComponents;
        locations = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;
        console.log(locations)
      });
    }
  });
</script>
<%--引入自定义js文件--%>
<script src="${ctx}/resources/js/student/attence.js" type="application/javascript"></script>
</html>

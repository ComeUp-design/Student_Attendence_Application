//m-3-id-1 上下滚动

//图片无缝滚动
var speed = 10;
var tab = document.getElementById("m-5-id-1");
var tab1 = document.getElementById("m-5-id-2");
var tab2 = document.getElementById("m-5-id-3");
tab2.innerHTML = tab1.innerHTML;

function Marquee() {
    if (tab2.offsetWidth - tab.scrollLeft <= 0)
        tab.scrollLeft -= tab1.offsetWidth
    else {
        tab.scrollLeft++;
    }
}

var MyMar = setInterval(Marquee, speed);
tab.onmouseover = function () {
    clearInterval(MyMar)
};
tab.onmouseout = function () {
    MyMar = setInterval(Marquee, speed)
};


//字母滚动
var screen1 = document.getElementById("screen1");
var screen1_1 = document.getElementById("screen1_1");
var screen1_2 = document.getElementById("screen1_2");
var speed = 4;    //滚动速度值，值越大速度越慢
var nnn = 200 / screen1_1.offsetHeight;
for (i = 0; i < nnn; i++) {
    screen1_1.innerHTML += "<br />" + screen1_1.innerHTML
}
screen1_2.innerHTML = screen1_1.innerHTML    //克隆screen1_2为screen1_1
function Marquee1() {
    if (screen1_2.offsetTop - screen1.scrollTop <= 0)    //当滚动至screen1_1与screen1_2交界时
        screen1.scrollTop -= screen1_1.offsetHeight    //screen1跳到最顶端
    else {
        screen1.scrollTop++     //如果是横向的 将 所有的 height top 改成 width left
    }
}

var MyMar = setInterval(Marquee1, speed);        //设置定时器
screen1.onmouseover = function () {
    clearInterval(MyMar)
}    //鼠标经过时清除定时器达到滚动停止的目的
screen1.onmouseout = function () {
    MyMar = setInterval(Marquee1, speed)
}    //鼠标移开时重设定时器

//获取当前时间带跳动
function showLocale(objD) {
    var str, colorhead, colorfoot;
    var yy = objD.getYear();
    if (yy < 1900) yy = yy + 1900;
    var MM = objD.getMonth() + 1;
    if (MM < 10) MM = '0' + MM;
    var dd = objD.getDate();
    if (dd < 10) dd = '0' + dd;
    var hh = objD.getHours();
    if (hh < 10) hh = '0' + hh;
    var mm = objD.getMinutes();
    if (mm < 10) mm = '0' + mm;
    var ss = objD.getSeconds();
    if (ss < 10) ss = '0' + ss;
    var ww = objD.getDay();
    if (ww == 0) colorhead = "";
    //if  ( ww > 0 && ww < 6 )  colorhead="";
    //if  ( ww==6 )  colorhead="";
    //if  (ww==0)  ww="星期日";
    //if  (ww==1)  ww="星期一";
    //if  (ww==2)  ww="星期二";
    //if  (ww==3)  ww="星期三";
    //if  (ww==4)  ww="星期四";
    //if  (ww==5)  ww="星期五";
    //if  (ww==6)  ww="星期六";
    colorfoot = ""
    str = colorhead + yy + "-" + MM + "-" + dd + " " + hh + ":" + mm + ":" + ss + "  " + colorfoot;
    return (str);
}

function tick() {
    var today;
    today = new Date();
    document.getElementById("localtime").innerHTML = showLocale(today);
    window.setTimeout("tick()", 1000);
}

tick();


//自动增加数字
window.onload = function () {
    // 数字到达 100 后还原为 1
    var max = 11000000,
        o = document.getElementById('zdzj1');
    var chrome = /chrome/i.test(navigator.userAgent);

    // 获取保存的数据
    if (chrome) {
        data_num = sessionStorage.getItem("num") || "";
    } else {
        data_num = document.cookie.replace(
            /(?:(?:^|.*;\s*)num\s*\=\s*((?:[^;](?!;))*[^;]?).*)|.*/,
            "$1");
    }
    var num_now = parseInt(data_num) || 0;

    o.innerHTML = num_now + 1;

    // 每 0.1 秒更新一次数字，并保存数据
    setInterval(function () {
        num_now = num_now >= max ? 2685 : num_now + 1;
        o.innerHTML = num_now;
        if (chrome) {
            sessionStorage.setItem("num", num_now);
        } else {
            document.cookie = "num=" + num_now + ";path=/;";
        }
    }, 100);
};

$(function () {
    $("#login").click(function (e) {
    	alert("登录")
    	e.preventDefault();
        var cno = $("#cno").val();
        if (cno == null && cno == '') {
            layer.msg('工号不能为空', {icon: 5, time: 1500});
            return;
        }
        var password = $("#password").val();
        if (password == null && password == '') {
            layer.msg('密码不能为空', {icon: 5, time: 1500});
            return;
        }
        login(cno, password);
    })
})
//登录
function login(cno, password) {
    $.ajax({
        url: ctx + '/counselorApi/checkLogin',
        data: {
            cno: cno,
            password: password
        },
        dataType: 'json',
        type: 'post',
        success: function (data) {
            if (data.body == true) {
					location.href=ctx+"/counselorApi/toIndex";
            } else {
                layer.msg('工号或密码错误', {icon: 5, time: 1500});
            }
        }, error: function (e) {
            layer.msg('服务器内部错误');
        }
    });
}

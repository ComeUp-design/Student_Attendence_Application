layui.use('table', function() {
    var table = layui.table;

    // 加载表格数据
    loadData();
    // 查询
    $('#query').click(function() {
    });

    //加载列表数据
    function loadData() {
        table.render({
            id: 'leaveTable',
            elem: '#demo'
            // , toolbar: '#toolbars'
            ,method:'get'
            , defaultToolbar: []
            , url: ctx + '/leaveApi/selectByPage' //数据接口
            , page: true //开启分页
            , cols: [[ //表头
                {field: 'checkbox', type: 'checkbox'}
                , {field: 'number', title: '序号', type: 'numbers'}
                , {field: 'leaveTitle', title: '请假标题', width: '10%'}
                , {field: 'leaveReason', title: '请假缘由', width: '20%'}
                , {field: 'startTime', title: '开始时间', width: '15%'}
                , {field: 'endTime', title: '结束时间', width: '15%'}
                , {
                    field: 'isRead', title: '状态', width: '10%', templet: function (d) {
                        if(d.isRead==1){
                            return '<span style="color: green;">已批阅</span>'
                        }else{
                            return '<span style="color: red;">未批阅</span>'
                        }
                    }
                }
                , {
                     title: '操作', width: '22.5%', templet: function (d) {
                         return '<button type="button" class="layui-btn layui-btn-normal" onclick="notAgreeLeaves('+d.leaveId+')">不同意</button>' +
                             '<button type="button" class="layui-btn layui-btn-normal" onclick="AgreeLeaves(\'+d.leaveId+\')">同意</button>\n';
                    }
                }
            ]]
            , skin: 'line,row' //表格风格
            , even: true
            , limits: [10, 20, 30]
            , limit: 10 //每页默认显示的数量
        });
    }
    //不批准
    function notAgreeLeaves(id) {
        $.ajax({
            url:ctx+'/leaveApi/notAgreeLeaves',
            data:{
                id:id
            },
            dataType:'json',
            type:'get',
            success:function (data) {
               if(data.body==1){
                   alert("success")
               }else{
                   alert("fail")
               }
            }
        })
    }
    //批准
    function AgreeLeaves(id) {
        $.ajax({
            url:ctx+'/leaveApi/AgreeLeaves',
            data:{
                id:id
            },
            dataType:'json',
            type:'get',
            success:function (data) {
                if(data.body==1){
                    alert("success")
                }else{
                    alert("fail")
                }
            }
        })
    }
});

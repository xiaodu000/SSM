var pageInfo;
$(function () {
    //发送异步请求
    sendRequest(1);

    //全选/全不选
    $("#checkAll").click(function () {
        var flag = $(this).prop("checked");
        $(".emp_check").prop("checked",flag)
    })
    $(document).on("click",".emp_check",function () {
        var flag = ($(".emp_check").length == $(".emp_check:checked").length);
        $("#checkAll").prop("checked",flag)
    })

    //加载校验的焦点事件
    load_form_check()

    //新增模态框
    $("#emp_add_model_btn").click(function () {
        //清除上次输入信息
        $("#addForm")[0].reset();  //jquery对象转换为js对象，调用js对象的方法
        checkFocus("#lastName")
        checkFocus("#email")
        //查询部门信息
        getDepts("#addform select");
        //弹出模态框
        $('#addModal').modal({
            //单击背景模态框 不会消失 默认值为true(单击背景会消失)
            backdrop:"static"
        })
    });

    //保存员工
    $("#save_emp").click(function () {
        //1.表单校验
        if(!(verificationLastName("#lastName") && verificationEmail("#email"))){
            return;
        }else{
            //清除样式
            checkFocus("#lastName")
            checkFocus("#email")
            //2.校验成功，发送保存员工ajax请求
            saveEmp();
        }
    });
    //阻止blur事件与click事件的冲突
   $("#save_emp").on("mousedown",function(e) {
        e.preventDefault();
    })

    //更新模态框：
    $(document).on("click",".emp_update_model_btn",function () {
        //清除上次表单信息
        $("#updateForm")[0].reset();
        checkFocus("#updateEmail")
        //查询部门信息
        getDepts("#updateForm select")
        //查询该员工信息
        var empId = $(this).attr("empId");
        getEmp(empId);
        //加载更新员工模态框
        $("#updateModal").modal({
            backdrop: "static"
        })
        //显示员工信息
        // var pId = $(this).parent("td").siblings("td:eq(1)").text();
        // var pLastName = $(this).parent("td").siblings("td:eq(2)").text();
        // var pLastEmail = $(this).parent("td").siblings("td:eq(3)").text();
        // var pGender = $(this).parent("td").siblings("td:eq(4)").text() == "男"?"W":"M";
        // $("#updateModal p").text(pLastName)
        // $("#updateEmpId").val(pId)
        // $("#updateEmail").val(pLastEmail)
        // $("#updateForm :radio[name='gender'][value="+pGender+"]").prop("checked","checked")
    })
    //修改员工
    $("#update_emp").click(function () {
        if(!verificationEmail("#updateEmail")){
            return;
        }else{
            //清除样式
            checkFocus("#updateEmail")
            //验证通过提交表单
            updateEmp($(this).attr("empId"));
        }
    })
    //阻止blur事件与click事件的冲突
    $("#update_emp").on("mousedown",function(e) {
        e.preventDefault();
    })

    //删除单个员工
    $(document).on("click",".emp_del_model_btn",function () {
        // siblings定位当前标签的兄弟标签
        var empName = $(this).parent("td").siblings("td:eq(2)").text()
        if(confirm("确认要删除 "+empName+" 吗？")){
            //发送ajax请求删除员工
            deleteEmp($(this).attr("empId"));
        }
    })
    //删除多个员工
    $("#emp_del_model_btn").click(function () {
        if($(".emp_check:checked").parent("td").length == 0){
            alert("您没有选择哦！")
        }else{
            var empNames = "";
            var empIds = "";
           $.each($(".emp_check:checked").parent("td"),function () {
                empIds += $(this).siblings("td:eq(0)").text()+"-";
                empNames += $(this).siblings("td:eq(1)").text()+",";
           })
            empNames = empNames.substring(0,empNames.length-1);
            empIds = empIds.substring(0,empIds.length-1);
            if(confirm("确认要删除 "+empNames+" 吗？")){
                deleteEmp(empIds);
            }
        }
    })
});

//请求页面数据
function sendRequest(pageNum) {
    $.ajax({
        url:"indexEmps",
        data:{
            pageNum:pageNum
        },
        dataType:"json",
        success:function (data) {
            if(data.code == 200){
                pageInfo = data.map.pageInfo;
                var list = pageInfo.list;
                //显示表格数据
                build_table(list);
                //显示分页信息
                build_page_msg(data.map.pageInfo);
                //显示页码
                build_page_num(data.map.pageInfo);
                //将全选按钮选为false
                $("#checkAll").prop("checked",false);
            }
        }
    });
}

//构建页面
function build_table(list) {
    $("#emps_table tbody").empty();
    $.each(list,function (index,element) {

        var data = $("<tr></tr>").append("<td><input type='checkbox' class='emp_check'></td>")
            .append("<td>"+element.empId+"</td>")
            .append("<td>"+element.empName+"</td>")
            .append("<td>"+element.email+"</td>")
            .append("<td>"+(element.gender!="M"?"男":"女")+"</td>")
            .append("<td>"+element.department.deptName+"</td>")
            .append("<td>" +"<button class=\"btn btn-primary btn btn-primary emp_update_model_btn\" empId="+element.empId+">\n" +
                "<span class=\"glyphicon glyphicon-pencil\" aria-hidden=\"true\"></span>&nbsp;编辑\n" +
                "</button>"+"&nbsp;"+
                "<button class=\"btn btn-danger btn btn-primary emp_del_model_btn\" empId="+element.empId+">\n" +
                "<span class=\"glyphicon glyphicon-trash\" aria-hidden=\"true\"></span>&nbsp;删除\n" +
                "</button>"
                +"</td>");
        $("#emps_table tbody").append(data);
    })
}

function build_page_msg(pageInfo) {
    $("#page_msg").text("当前第"+pageInfo.pageNum+"页，共有"+pageInfo.pages+"页，总计"+pageInfo.total+"记录");
}

function build_page_num(pageInfo) {
    //清空原有的页码数据
    $("#page_num_list").empty();
    //添加页码
    var arrLi = "";
    for(var i = 0;i < pageInfo.navigatePages;i++){
        arrLi += "<li class='page_num'><a href=\"javascript:void(0)\">"+pageInfo.navigatepageNums[i]+"</a></li>";
    }
    $("#page_num_list").append("<li><a href=\"javascript:void(0)\">首页</a></li>"+
        "<li id='previous'>\n" +
        "      <a href=\"javascript:void(0)\" aria-label=\"Previous\">\n" +
        "        <span aria-hidden=\"true\">&laquo;</span>\n" +
        "      </a>\n" +
        "    </li>\n" +
        arrLi +
        "    <li id='next'>\n" +
        "      <a href=\"javascript:void(0)\" aria-label=\"Next\">\n" +
        "        <span aria-hidden=\"true\">&raquo;</span>\n" +
        "      </a>\n" +
        "    </li>" +
        "<li><a href=\"javascript:void(0)\">尾页</a></li>");

    //首页和上一页
    if(pageInfo.hasPreviousPage == false){
        $("#page_num_list li:first").addClass("disabled");
        $("#page_num_list #previous").addClass("disabled");
    }else{
        $("#page_num_list li:first").click(function () {
            sendRequest(1)
        });
        $("#page_num_list #previous").click(function () {
            sendRequest(pageInfo.pageNum - 1);
        })
    }

    //尾页和下一页
    if(pageInfo.hasNextPage == false){
        $("#page_num_list li:last").addClass("disabled");
        $("#page_num_list #next").addClass("disabled");
    }else{
        $("#page_num_list li:last").click(function () {
            sendRequest(pageInfo.pages)
        });
        $("#page_num_list #next").click(function () {
            sendRequest(pageInfo.pageNum + 1);
        })
    }

    // 页码
    $.each($("#page_num_list .page_num"),function (index,element) {
        if(element.innerText == pageInfo.pageNum){
            $(element).addClass("active")
        }
        $(element).click(function () {
            sendRequest(element.innerText)
        })
    })
}

//获取部门信息
function getDepts(eleSelect) {
    $.ajax({
        url:"depts",
        dataType: "json",
        success:function (data) {
            //请求处理成功
            if(data.code == 200){
                $(eleSelect).empty();
                $.each(data.map.list,function () {
                    var option = $("<option>"+this.deptName+"</option>").attr("value",this.deptId);
                    $("form select").append(option);
                })
            }
        }
    })
}

//获取员工信息
function getEmp(empId) {
    $.ajax({
        url:"emp/"+empId,
        method:"get",
        success:function (data) {
            if(data.code == 200){
                var emp = data.map.employee;
                $("#updateForm p").text(emp.empName)
                $("#updateEmail").val(emp.email)
                $("#updateForm :radio[name='gender'][value="+emp.gender+"]").prop("checked",true)
                $("#updateForm select[name='deptId']").val([emp.deptId])
                $("#update_emp").attr("empId",emp.empId);
            }
        }
    })
}

//保存员工
function saveEmp() {
    $.ajax({
        url:"emp",
        method:"POST",
        data: $("#addForm").serialize(),
        dataType:"json",
        success:function (data) {
            if(data.code == 200){
                //1.关闭模态框
                $("#addModal").modal("hide");
                //2.展示最后一页
                sendRequest(pageInfo.pages+1);
            }
        }
    })
}

//修改员工
function updateEmp(empId) {
    $.ajax({
        url:"emp/"+empId,
        // ajax直接发送put请求，需要在 web.xml 中配置一个 HiddenHttpMethodFilter 过滤器
        method: "PUT",
        // data:$("#updateForm").serialize()+"&_method=put",
        data:$("#updateForm").serialize(),
        dataType:"json",
        success:function (data) {
            if(data.code == 200){
                //关闭模态框
                $("#updateModal").modal("hide");
                //展示当前页
                sendRequest(pageInfo.pageNum)
            }
        }
    })
}

//删除员工
function deleteEmp(empId) {
    $.ajax({
        url:"emp/"+empId,
        method:"DELETE",
        dataType:"json",
        success:function (data) {
            if(data.code == 200){
                //跳转到当前页
                sendRequest(pageInfo.pageNum)
            }
        }
    })
}
function load_form_check(){
    var $lastName = $("#lastName");
    var $email = $("#email");
    var $updateEmail = $("#updateEmail")
    //绑定focus获得焦点事件
    $lastName.focus(function () {
        checkFocus("#lastName")
    })
    $email.focus(function () {
        checkFocus("#email")
    })
    $updateEmail.focus(
        checkFocus("#updateEmail")
    )
    //绑定blur失去焦点事件
    $lastName.blur(function () {
        verificationLastName("#lastName")
    })
    $email.blur(function () {
        verificationEmail("#email")
    })
    $updateEmail.blur(function () {
        verificationEmail("#updateEmail")
    })

//动态绑定blur
    // $("#update_emp").mouseenter(function(){
    //     $updateEmail.unbind("blur");
    // });
    // $("#update_emp").mouseleave(function(event){
    //     $updateEmail.bind("blur",function () {
    //         verificationEmail("#updateEmail")
    //     });
    // });
}

function verificationLastName(element) {
    /*
    * 如何让js代码等待ajax异步请求结束以后执行接下来的代码：
    *       方案一.将异步请求改为同步：async:false
    *       方案二.将之后需要执行的js代码放入回调函数中，等待ajax异步请求结束执行自动调用
    * */
    var flag = true;
    var $lastName = $(element);
    var regLastName = /(^[\u4e00-\u9fa5]{2,4}$)|(^[A-Za-z0-9]{6,16}$)/;
    if(regLastName.test($lastName.val())){
        $.ajax({
            url:"checkEmp",
            data:{
                empName:$lastName.val()
            },
            dataType:"json",
            async:false,  //关键：同步异步参数
            success:function (data) {
                if(data.code == 200){
                    checkBlur(element,true,"用户名可用")
                }else{
                    checkBlur(element,false,"用户名已被占用")
                    flag =  false;
                }
            }
        })
    }else{
        checkBlur(element,false,"用户名必须为6-16位数字字母组合或者真实姓名")
        flag = false;
    }
    return flag;
}

function verificationEmail(element) {
    var flag = true;
    var $email = $(element);
    var regEmail = /^[A-Za-z0-9]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if(regEmail.test($email.val())){
        checkBlur(element,true,"邮箱可用")
    }else{
        checkBlur(element,false,"邮箱格式错误")
        flag = false;
    }
    return flag;
}

function checkFocus(element) {
    $(element).parent().removeClass("has-success has-error")
    $(element).next("span").text("")
}

function checkBlur(element,flag,msg) {
    if(flag){
        $(element).parent().addClass("has-success");
        $(element).next("span").text(msg);
    }else{
        $(element).parent().addClass("has-error");
        $(element).next("span").text(msg);
    }
}
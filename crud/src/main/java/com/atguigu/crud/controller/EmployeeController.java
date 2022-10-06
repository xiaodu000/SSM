package com.atguigu.crud.controller;

import com.atguigu.crud.bean.Employee;
import com.atguigu.crud.service.EmployeeService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

/**
 * 处理员工CRUD请求
 */
@Controller
public class EmployeeController {
    @Autowired
    EmployeeService employeeService;

    @RequestMapping("/emps")
    public String getEmps(@RequestParam(value = "pn",defaultValue = "1") Integer pn, Model model){
        //这不是分页查询
        //引入pageHelpr分页插件
        //在查询之前只需要调用，传入页码，以及每页大小
        PageHelper.startPage(pn,5);
        List<Employee> emps=employeeService.getAll();
        //用pageinfo包装查询后的结果，只需要将pageinfo交给页面就行了
        //封装了详细的分页信息，包我们查询出来的数据，传入连续显示的页数
        PageInfo page=new PageInfo(emps);
        model.addAttribute("pageInfo",page);
        return "list";
    }
}

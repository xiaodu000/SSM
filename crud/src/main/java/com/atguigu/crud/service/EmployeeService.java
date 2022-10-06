package com.atguigu.crud.service;

import com.atguigu.crud.bean.Employee;
import com.atguigu.crud.dao.EmployeeMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

public interface EmployeeService {


    /**
     * 查询所有员工
     * @return
     */
    List<Employee> getAll();
}

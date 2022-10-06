package com.atguigu.crud.service.impl;

import com.atguigu.crud.bean.Employee;
import com.atguigu.crud.dao.EmployeeMapper;
import com.atguigu.crud.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service("employeeServiceImpl")
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    EmployeeMapper employeeMapper;


    @Override
    public List<Employee> getAll() {
        return null;
    }
    }

package com.atguigu.crud.test;

import com.atguigu.crud.bean.Department;
import com.atguigu.crud.bean.Employee;
import com.atguigu.crud.dao.DepartmentMapper;
import com.atguigu.crud.dao.EmployeeMapper;
import org.apache.ibatis.session.SqlSession;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.UUID;

/**
 * 测试dao层工作
 */

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath:applicationContext.xml"})
public class MapperTest {
    @Autowired
    DepartmentMapper departmentMapper;
    @Autowired
    EmployeeMapper employeeMapper;

    @Autowired
    SqlSession sqlSession;
    /*
        测试departmentmapper
     */
    @Test
    public void testCRUD(){
//        //1.创建springioc容器
//        ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext();
//        //2.从容器中获取mapper
//        DepartmentMapper bean = context.getBean(DepartmentMapper.class);

//        System.out.println(departmentMapper);
//          1插入两条部门信息
//        departmentMapper.insertSelective(new Department(1,"开发部"));
//        departmentMapper.insertSelective(new Department(2,"测试部"));
//          2插入一条员工信息
//        employeeMapper.insertSelective(new Employee(null,"juy","M","juy@qq.com",1));
//           3批量插入
//        EmployeeMapper mapper = sqlSession.getMapper(EmployeeMapper.class);
//        for (int i=0;i<10;i++){
//            String uid=UUID.randomUUID().toString().substring(0,5)+ i;
//            mapper.insertSelective(new Employee(null,uid,"M",uid+"@qq.com",1));
//        }
//        System.out.println("批量完成");

    }
}

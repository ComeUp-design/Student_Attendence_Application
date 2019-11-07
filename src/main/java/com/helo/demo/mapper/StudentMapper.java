package com.helo.demo.mapper;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.helo.demo.model.Student;
import com.helo.demo.vo.StudentListVo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 学生Mapper
 * @author xiayj
 * @since
 */
@Mapper
public interface StudentMapper extends BaseMapper<Student> {
    /**
     *根据学生的ID删除学生信息
     * @param studentId
     * @return int
     */
    int deleteByPrimaryKey(Integer studentId);

    /**
     * 添加学生
     * @param record
     * @return int
     */
    int insertSelective(Student record);

    /**
     * 根据学生的ID查询学生信息
     * @param sno
     * @return  Student
     */
    Student selectByPrimaryKey(String sno);

    /**
     * 修改学生信息
     * @param record
     * @return int
     */
    int updateByPrimaryKeySelective(Student record);


    /**
     * 根据学号查询学生信息
     * @param sno
     * @return
     */
    Student selectBySno(String sno);

    /**
     * 根据学号查询学生的课程
     * @param sno
     * @return
     */
    List<Student> selectCourseBySno(String sno);


    @Select("select * from student stu ,profession pro where stu.profession_id = pro.profession_id limit #{page},#{limit}")
    List<StudentListVo> getStudentList(@Param("page") int page, @Param("limit") int limit);
}
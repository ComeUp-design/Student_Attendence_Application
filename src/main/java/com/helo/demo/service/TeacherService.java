package com.helo.demo.service;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.helo.demo.mapper.TeacherMapper;
import com.helo.demo.model.Student;
import com.helo.demo.model.Teacher;
import com.helo.demo.utils.Md5Utils;
import com.helo.demo.vo.TeacherVo;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author wangxl
 * @ClassName TeacherService
 * @Description
 * @date 2019/8/21 0:03
 */
@Service
public class TeacherService {

    @Resource
    private TeacherMapper teacherMapper;


    /**
     * 根据教师ID删除教师信息
     *
     * @param teacherId
     * @return
     */
    public int deleteByPrimaryKey(Integer teacherId) {
        return teacherMapper.deleteByPrimaryKey(teacherId);
    }

    /**
     * 添加教师信息
     *
     * @param record
     * @return
     */
    public int insertSelective(Teacher record) {
        record.setTeacherPassword(Md5Utils.getSaltMD5(record.getTeacherPassword()));
        return teacherMapper.insertSelective(record);
    }


    /**
     * 根据教师ID查询教师信息
     *
     * @param tno
     * @return
     */
    public Teacher selectByPrimaryKey(String tno) {
        return teacherMapper.selectByPrimaryKey(tno);
    }

    /**
     * 修改教师信息
     *
     * @param record
     * @return
     */
    public int updateByPrimaryKeySelective(Teacher record) {
        return teacherMapper.updateByPrimaryKeySelective(record);
    }

  /**
   * 获取教师列表分页
   * @param page
   * @param limit
   * @return
   */
    public Map<String, Object> getTeacherByPage(Integer page, Integer limit){
      Map<String, Object> map = new HashMap();
      EntityWrapper entityWrapper = new EntityWrapper();
      List<TeacherVo> teacherList = teacherMapper.selectByPage((page-1)*limit,limit);
      map.put("data",teacherList);
      int count = teacherMapper.selectCount(entityWrapper);
      map.put("count",count);
      map.put("code",0);
      map.put("msg","");
      return map;
    }

    /**
     * 根据学号查询辅导员信息 用于登录判断密码是否相一致
     *
     * @param tno
     * @return
     */
    public Teacher selectByTno(String tno) {
        return teacherMapper.selectByTno(tno);
    }


}

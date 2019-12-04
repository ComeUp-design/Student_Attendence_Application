package com.helo.demo.controller;

import com.helo.demo.config.DataResult;
import com.helo.demo.model.Sign;
import com.helo.demo.service.SignService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * @author xiayj
 * @ClassName SignController
 * @Description TODO
 * @date 2019/8/23 17:51
 * @Version 1.0
 */
@Api(tags = "打卡接口")
@RequestMapping("/signApi")
@Controller
public class SignController {

    @Autowired
    private SignService signService;

    @ApiOperation("跳转到签到界面")
    @GetMapping("toAttence")
    public String toAttenceView() {
        return "/student/attence";
    }

    @ApiOperation("跳转到我的签到列表页面")
    @GetMapping("toAttenceList")
    public String toAttenceList() {
        return "/student/attenceList";
    }

    @ApiOperation("学生签到-添加签到记录")
    @PostMapping("insertSign")
    @ResponseBody
    public DataResult<Integer> insertSign(@RequestBody Sign sign) {
        DataResult<Integer> result = new DataResult<>();
        result.setMsg("添加成功");
        result.setCode("200");
        result.setBody(signService.insertSign(sign));
        return result;
    }

    @ApiOperation("获取所有学生签到记录")
    @GetMapping("getSignByPage")
    @ResponseBody
    public Map<String, Object> getSignByPage(@RequestParam("pageNo") Integer pageNo,
                                             @RequestParam("pageSize") Integer pageSize) {
        return signService.getSignByPage(pageNo, pageSize);
    }

    @ApiOperation("获取学生签到记录")
    @GetMapping("getSignStuByPage")
    @ResponseBody
    public Map<String, Object> getSignStuByPage(@RequestParam("pageNo") Integer pageNo,
                                                @RequestParam("pageSize") Integer pageSize,
                                                @RequestParam("stuId") Integer stuId) {
        return signService.getSignStuByPage(pageNo, pageSize, stuId);
    }

}

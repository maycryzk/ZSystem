package com.system.base.controller;

import java.io.File;
import java.io.OutputStream;
import java.util.HashMap;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;


import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.system.base.service.BaseService;


@Controller
public class BaseController {
	
	@Resource
	public BaseService baseService;
	
	/**
	 * 直接访问jsp页面,真实地址用"-"隔开<br/>
	 * @param fileName jsp文件路径
	 * @param parameters
	 * @return
	 */
	@RequestMapping(value="/base/{fileName}.do")
	public final  ModelAndView redirect(@PathVariable("fileName")String fileName,@RequestParam(required=false) HashMap<String,Object> parameters){
		fileName=fileName.replaceAll("-", "/");
		return new ModelAndView(fileName).addAllObjects(parameters);
	}
	
	/**
	 * 下载文件
	 * @param response response对象
	 * @param file 要response的文�?
	 * @param fileName 文件�?
	 * @return 下载
	 */
	public ModelAndView download (HttpServletResponse response,File file,String fileName){
		try {
			response.setHeader("Content-Disposition", "attachment; filename=\""+new String(fileName.getBytes(),"iso-8859-1")+"\"");
			response.setContentType("application/octet-stream; charset=iso-8859-1");  
			//读文�?
			OutputStream os=response.getOutputStream();
			os.write(FileUtils.readFileToByteArray(file));
			os.flush();
			return null;
		} catch (Exception e) {
			//出错后先重置 ,再抛出异�?
			response.reset();
			return new ModelAndView("error/fileError");
		}
			
	}
	
}

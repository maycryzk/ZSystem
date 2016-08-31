package com.system.base.controller;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;

import javax.annotation.Resource;
import javax.imageio.ImageIO;
import javax.imageio.stream.ImageOutputStream;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.system.base.service.BaseService;
import com.system.base.service.UploadFileService;
import com.system.entity.SysFileupload;

@Controller
@RequestMapping("/uploadfile/*")
public class UploadFileController {
	
	@Resource
	private BaseService baseService;
	
	@Resource
	private UploadFileService uploadFileService;
	
	@RequestMapping("uploadFile.do")
	@ResponseBody
	public JSONObject uploadFile(MultipartFile file, String tableName, HttpSession session){
		return uploadFileService.doUploadFile(file, tableName, session);
	}
	
	
	/**
	 * 查看图片
	 * @param request
	 * @param response
	 */
	@RequestMapping("viewPic.do")
	public void viewPic(String fileId, HttpServletRequest request, HttpServletResponse response){
		BufferedImage image = null;  
		String resourcePath="WEB-INF/resource/fileUpload/";
		SysFileupload pic = (SysFileupload) baseService.get(SysFileupload.class, fileId);
		String fileName = "";
		if(pic != null){
			fileName = pic.getFilePath();
		}
		//取得ServletContext
		ServletContext context=request.getSession().getServletContext();
		try {
			File soruceImage=new File(context.getRealPath(resourcePath+"/"+fileName));
			image = ImageIO.read(soruceImage);
		} catch (IOException e) {
			e.printStackTrace();
		}
		try {
			ByteArrayOutputStream output = new ByteArrayOutputStream();
			ImageOutputStream imageOutput = ImageIO.createImageOutputStream(output);
			ImageIO.write(image, fileName.split("\\.")[1], imageOutput);
			response.addHeader("Cache-Control", "no-cache");
			response.setContentType("image/"+fileName.split("\\.")[1]);  
			response.getOutputStream().write(output.toByteArray());
			response.getOutputStream().flush();
		} catch (Exception e) {
			response.reset();
		}
	}
	
	
}

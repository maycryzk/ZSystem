package com.system.base.service;

import javax.servlet.http.HttpSession;

import net.sf.json.JSONObject;

import org.springframework.web.multipart.MultipartFile;

public interface UploadFileService {
	
	/**
	 * 上传文件
	 * @param file       文件
	 * @param tableName  业务表名
	 * @param session
	 * @return
	 */
	public JSONObject doUploadFile(MultipartFile file, String tableName, HttpSession session);
	
	
}

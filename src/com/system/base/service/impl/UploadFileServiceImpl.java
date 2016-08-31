package com.system.base.service.impl;

import java.io.File;
import java.util.UUID;

import javax.annotation.Resource;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.system.base.dao.BaseDao;
import com.system.base.service.UploadFileService;
import com.system.base.utils.DateUtil;
import com.system.entity.SysFileupload;


@Service("uploadFileService")
public class UploadFileServiceImpl implements UploadFileService {
	
	@Resource
	private BaseDao baseDao;
	
	@Override
	public JSONObject doUploadFile(MultipartFile file, String tableName, HttpSession session) {
		 ServletContext application = session.getServletContext();
		 String path="WEB-INF/resource/fileUpload/";
		 String subPath = tableName + "/" +DateUtil.getNoSeparateDate();
	     String savePath = application.getRealPath("/")+path + subPath;
	    
	     File filePath = new File(savePath);
	     if(!filePath.exists() && !filePath.isDirectory()){
	    	 filePath.mkdirs();
	     }
	     JSONObject json = new JSONObject();
	     try{
	    	 //生成名字
	    	 String suffix = "";
	    	 int dotIndex=file.getOriginalFilename().lastIndexOf(".");
	    	 if(dotIndex!=-1){
	    		 suffix=file.getOriginalFilename().substring(dotIndex+1,file.getOriginalFilename().length() );
	    	 }
	    	 String uuid = UUID.randomUUID().toString();
	    	 String fileOriName = file.getOriginalFilename();
	    	 String fileName=uuid;
	    	 if(StringUtils.isNotBlank(suffix)){
	    		 fileName = fileName+"."+suffix;
	    	 }
	    	 //保存文件到服务器
	    	 file.transferTo(new File(savePath,fileName));
	    	 SysFileupload sysFileupload = new SysFileupload(uuid, subPath+"/"+fileName, fileOriName, file.getContentType(), tableName);
	    	 baseDao.save(sysFileupload);
	    	 json = JSONObject.fromObject(sysFileupload);
	    	 json.put("success", true);
	     }catch (Exception e) {
	    	 json.put("success", false);
	    	 e.printStackTrace();
		 }
	     return json;
	}


}

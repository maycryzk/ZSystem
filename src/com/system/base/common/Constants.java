package com.system.base.common;

import java.io.File;

import com.system.base.utils.PathUtil;
import com.system.base.utils.PropertiesUtil;



/**
 * 储存常量<br>
 */

public class Constants {
	
	/**
	 * 全局配置 文件
	 */
	public  static PropertiesUtil globalProperties=null;
	
	/**
	 * WEB-INF 目录
	 */
	public final static File webinfFile=new File(PathUtil.getRealPath(Constants.class,"/"));
	
	/**
	 * WEBRoot 目录
	 */
	public final static File webrootFile=webinfFile.getParentFile();
	
	/**
	 * 全局配置 文件目录 
	 */
	private final static  String  globalPropertiesPath= webinfFile.getAbsolutePath().replaceAll("%20", " ")+"/global.properties";
	
	static{
		globalProperties=PropertiesUtil.getInstance(globalPropertiesPath);
	}
	
	public final static String sessionInfo = globalProperties.getProperty("sessionInfo");
	
	/**
	 *  分页条显示多少个分页页码
	 */
	public final static int PAGE_NUMBER  = Integer.parseInt(globalProperties.getProperty("pageNumber"));	
	
	/**
	 *  每页显示多少条数据
	 */
	public final static int PAGE_SIZE = Integer.parseInt(globalProperties.getProperty("pageSize"));	
	
	
	/**
	 * 项目资源文件根目录,相对路径
	 */
	public final static String RESOURCE_ROOT_FOLDER = globalProperties.getProperty("resourceRootFolder");
	
	
	/**
	 * 项目资源文件根目录,绝对路径
	 */
	public final static String RESOURCE_ROOT_FOLDER_REAL = webrootFile.getAbsolutePath().replaceAll("%20", " ")+"/"+RESOURCE_ROOT_FOLDER;
	
	/**
	 * 项目一般的不重要的资源文件根目录,相对路径
	 */
	public final static String GENERAL_RESOURCE_ROOT_FOLDER =globalProperties.getProperty("generalResourceRootFolder");
	
	/**
	 * 项目一般的不重要的资源文件根目录,绝对路径
	 */
	public final static String GENERAL_RESOURCE_ROOT_FOLDER_REAL = webrootFile.getAbsolutePath().replaceAll("%20", " ")+"/"+GENERAL_RESOURCE_ROOT_FOLDER;
	

	
	static{
		System.out.println(""+globalProperties.getProperty("debug", "false"));
	}
	
	
	/**
	 * 网络编辑图片压缩大小
	 */
	public static final int KEDIT_IMAGE_WIDTH = Integer.parseInt(globalProperties.getProperty("KEditImgWidth"));
	public static final int KEDIT_IMAGE_HEIGHT = Integer.parseInt(globalProperties.getProperty("KEditImgHeight"));

}

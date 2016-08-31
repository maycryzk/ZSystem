package com.system.base.utils;

/*******************************************************************************
 * 模块名：工具模块 <br>
 * 文件名：PathUtil.java <br>
 * 功能说明: 路径转化公共类 <br>
 ******************************************************************************/
public final class PathUtil {
	/**
	 * 根据传入的类类型和相对路径，转换成绝对路径
	 * @param clazz
	 * @param oppositePath
	 * @return String
	 */
	public static String getRealPath(Class clazz,String oppositePath){
		if(clazz!=null) 
			return clazz.getResource("/").getPath()+oppositePath;
		return "";
	}
	
	/**
	 * 根据传入的类类型，返回绝对根路径
	 * @param clazz
	 * @param oppositePath
	 * @return String
	 */
	public static String getRootRealPath(Class clazz){
		if(clazz!=null) 
			return clazz.getResource("/").getPath();
		return "";
	}
}

package com.system.base.utils;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.util.Properties;
/*******************************************************************************
 * 模块名：工具模块 <br>
 * 文件名：PropertiesUtil.java <br>
 * 功能说明: 资源文件（属性文件）解析公共类 <br>
 ******************************************************************************/
public final class PropertiesUtil extends Properties {

	private static final long serialVersionUID = 1L;
	private static PropertiesUtil instance;

	/**
	 * 根据传入的资源文件路径，返回加载后的Properties对象(单例模式)
	 * @param path
	 * @return PropertiesUtil
	 */
	public static PropertiesUtil getInstance(String path) {
		if (instance != null)
			return instance;
		else {
			makeInstance(path);
			return instance;
		}
	}
	//同步
	private static synchronized void makeInstance(String path) {
		if (instance == null)
			instance = new PropertiesUtil(path);
	}

	private PropertiesUtil(String path) {
		//InputStream is = getClass().getResourceAsStream(path);
		InputStream is=null;
		try {
			is = new FileInputStream(path);
		} catch (FileNotFoundException e1) {
			e1.printStackTrace();
		}
		try {
			load(is);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}

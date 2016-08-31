package com.system.base.utils;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;

import net.sf.json.JsonConfig;
import net.sf.json.processors.DefaultValueProcessor;
import net.sf.json.processors.JsonValueProcessor;

/**
 * 模块名：工具模块 <br>
 * 文件名：JsonConfigUtil.java <br>
 * 功能说明: 配置Json输出默认值类<br>
 */
public class JsonConfigUtil{

	/**
	 * 配置Json输出默认值
	 * @return
	 */
	private static final String formatString="yyyy-MM-dd HH:mm:ss";
	private static final SimpleDateFormat format= new SimpleDateFormat(formatString);
	
	public static JsonConfig getDefaultConfig(){
		JsonConfig jsonConfig=new JsonConfig();
		
		jsonConfig.registerDefaultValueProcessor(Integer.class,
				new DefaultValueProcessor() {
					public Object getDefaultValue(Class type) {
						return null;
					}
				});
		jsonConfig.registerDefaultValueProcessor(Long.class,
				new DefaultValueProcessor() {
					public Object getDefaultValue(Class type) {
						return null;
					}
				});
		jsonConfig.registerDefaultValueProcessor(Boolean.class,
				new DefaultValueProcessor() {
					public Object getDefaultValue(Class type) {
						return null;
					}
				});
		jsonConfig.registerJsonValueProcessor(Date.class, new JsonValueProcessor() {
			
			public Object processObjectValue(String arg0, Object arg1, JsonConfig arg2) {
				// TODO Auto-generated method stub
				if(arg1==null){
					return null;
				}
				return format.format(arg1);
			}
			
			public Object processArrayValue(Object arg0, JsonConfig arg1) {
				// TODO Auto-generated method stub
				if(arg0==null){
					return null;
				}
				return format.format(arg0);
			}
		});
		jsonConfig.registerJsonValueProcessor(java.sql.Date.class, new JsonValueProcessor() {
			
			public Object processObjectValue(String arg0, Object arg1, JsonConfig arg2) {
				// TODO Auto-generated method stub
				if(arg1==null){
					return null;
				}
				return format.format(arg1);
			}
			
			public Object processArrayValue(Object arg0, JsonConfig arg1) {
				// TODO Auto-generated method stub
				if(arg0==null){
					return null;
				}
				java.sql.Date time=(java.sql.Date)arg0;
				return format.format(new Date(time.getTime()));
			}
		});
		jsonConfig.registerJsonValueProcessor(Timestamp.class, new JsonValueProcessor() {
			
			public Object processObjectValue(String arg0, Object arg1, JsonConfig arg2) {
				// TODO Auto-generated method stub
				if(arg1==null){
					return null;
				}
				return format.format(arg1);
			}
			
			public Object processArrayValue(Object arg0, JsonConfig arg1) {
				// TODO Auto-generated method stub
				if(arg0==null){
					return null;
				}
				return format.format(arg0);
			}
		});
		return jsonConfig;
	}
	
	
	
	
}


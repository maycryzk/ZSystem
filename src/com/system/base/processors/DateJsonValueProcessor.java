package com.system.base.processors;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

import net.sf.json.JsonConfig;
import net.sf.json.processors.JsonValueProcessor;
/**
 * @describe json时间处理器<br>
 * 修改历史[修改说明][修改人][修改时间]：
 * 
 * @author 张坤
 * @version 1.0 2015-01-22
 */
public class DateJsonValueProcessor implements JsonValueProcessor {
	

    private String dateFormat = "yyyy-MM-dd";

    public DateJsonValueProcessor() {  
    	super();  
    }  
    	      
    public DateJsonValueProcessor(String dateFormat) { 
    	super();  
        this.dateFormat = dateFormat;  
    } 
   
    
	@Override
	public Object processArrayValue(Object value, JsonConfig jsonConfig) {
		return process(value);
	}

	@Override
	public Object processObjectValue(String key, Object value, JsonConfig jsonConfig) {
		return process(value);
	}
	
	private Object process(Object value) {
		if(value instanceof Date){ 
            SimpleDateFormat sdf = new SimpleDateFormat(dateFormat,Locale.CHINA);    
            return sdf.format(value);  
		}    
		 return value == null ? "" : value.toString();    

    }

}

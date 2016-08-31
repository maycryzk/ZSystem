package com.system.base.converter;

import java.text.DateFormat;
import java.util.Date;

import org.springframework.core.convert.converter.Converter;

/**
 * SpringMVC String 到 Date 的转换器
 * 修改历史[修改说明][修改人][修改时间]：
 *
 */
public class StringToDateConverter implements Converter<String, Date>{

	
	@Override
	public Date convert(String source) {
		Date date=null;
		try {
			try {
				date=DateFormat.getDateTimeInstance().parse(source);
			} catch (Exception e) {
				date=DateFormat.getDateInstance().parse(source);
			}
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return date;
	}

	
}

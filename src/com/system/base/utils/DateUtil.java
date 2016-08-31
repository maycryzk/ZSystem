package com.system.base.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class DateUtil {
	 public static String getCurrentYear(){
		 SimpleDateFormat sdf = new SimpleDateFormat("yyyy");
	     Date date = new Date();
	     String formatDate = sdf.format(date);
	     return formatDate;
	 }
	 
	 public static String getCurrentYearMonth(){
		 SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM");
	     Date date = new Date();
	     String formatDate = sdf.format(date);
	     return formatDate;
	 }
	 
	 public static String getCurrentTime(){
		 SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	     Date date = new Date();
	     String formatDate = sdf.format(date);
	     return formatDate;
	 }
	 
	 
	 
	 public static String getFirstMonthDay(String year, String month){
		 SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		 Calendar cal = Calendar.getInstance();
		 cal.set(Calendar.YEAR,Integer.valueOf(year));
		 cal.set(Calendar.MONTH, Integer.valueOf(month)-1);
		 cal.set(Calendar.DAY_OF_MONTH, 1);
		 return sdf.format(cal.getTime());
	 }
	 
	 
	 public static String getLastMonthDay(String year, String month){
		 	//格式化日�?
	        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		 	Calendar cal = Calendar.getInstance();
	        cal.set(Calendar.YEAR,Integer.valueOf(year));
	        cal.set(Calendar.MONTH, Integer.valueOf(month)-1);
	        //获取某月�?��天数
	        int lastDay = cal.getActualMaximum(Calendar.DAY_OF_MONTH);
	        //设置日历中月份的�?��天数
	        cal.set(Calendar.DAY_OF_MONTH, lastDay);
	        String lastDayOfMonth = sdf.format(cal.getTime());
	        return lastDayOfMonth;
		 
	 }
	 
	 /**
	  * 获取当前月第�?��
	  * @return
	  */
	 public static String getCurrentMonthFirstDay(){
		 SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		 Calendar cal = Calendar.getInstance();
		 cal.add(Calendar.MONTH, 0);
         cal.set(Calendar.DAY_OF_MONTH,1);
         String first = sdf.format(cal.getTime());
         return first;
	 }
	 /**
	  * 获取指定月第�?��
	  * @return
	  */
	 public static String getCurrentMonthFirstDay(String time){
		 Calendar   cDay1   =   Calendar.getInstance();  
		 SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
	     try {
			cDay1.setTime(sdf.parse(time));
		} catch (ParseException e) {
			e.printStackTrace();
		}  
	     cDay1.add(Calendar.MONTH, 0);
	     cDay1.set(Calendar.DAY_OF_MONTH,1);
		 String first = sdf.format(cDay1.getTime());
		 return first;
	 }
	 
	 /**
	  * 获取当前月最后一�?
	  * @return
	  */
	 public static String getCurrentMonthLastDay(){
		 SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		 Calendar cal = Calendar.getInstance();
		 cal.set(Calendar.DAY_OF_MONTH, cal.getActualMaximum(Calendar.DAY_OF_MONTH));  
	     String last = sdf.format(cal.getTime());
	     return last;
	 }
	 /**
	  * 获取指定月最后一�?
	  * @return
	  */
	 public static String getCurrentMonthLastDay(String time){
		 Calendar   cDay1   =   Calendar.getInstance();  
		 SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
	     try {
			cDay1.setTime(sdf.parse(time));
		} catch (ParseException e) {
			e.printStackTrace();
		}  
	     final   int   lastDay   =   cDay1.getActualMaximum(Calendar.DAY_OF_MONTH);  
	     Date   lastDate   =   cDay1.getTime();  
	     lastDate.setDate(lastDay);
		 return  convert2String(lastDate.getTime());
	 }
	 
	 
	 
	 public static String getAfterDay(String ymd){
		Calendar c = Calendar.getInstance();
		Date date = null;
		try {
			date = new SimpleDateFormat("yy-MM-dd").parse(ymd);
		} catch (Exception e) {
			e.printStackTrace();
		}
		c.setTime(date);
		int day = c.get(Calendar.DATE);
		c.set(Calendar.DATE, day + 1);
		String dayAfter = new SimpleDateFormat("yyyy-MM-dd").format(c.getTime());
		return dayAfter;
	 }
	 
	 public static String getBeforeDay(String ymd){
			Calendar c = Calendar.getInstance();
			Date date = null;
			try {
				date = new SimpleDateFormat("yy-MM-dd").parse(ymd);
			} catch (Exception e) {
				e.printStackTrace();
			}
			c.setTime(date);
			int day = c.get(Calendar.DATE);
			c.set(Calendar.DATE, day - 1);
			String dayAfter = new SimpleDateFormat("yyyy-MM-dd").format(c.getTime());
			return dayAfter;
		 }
		 
	 
	 public static String getMondayOfThisWeek() {
		 SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		  Calendar c = Calendar.getInstance();
		  int day_of_week = c.get(Calendar.DAY_OF_WEEK) - 1;
		  if (day_of_week == 0)
		   day_of_week = 7;
		  c.add(Calendar.DATE, -day_of_week + 1);
		  return sdf.format(c.getTime());
	 }
	 /**
	  * 得到本周周日
	  * 
	  * @return yyyy-MM-dd
	  */
	 public static String getSundayOfThisWeek() {
	SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
	  Calendar c = Calendar.getInstance();
	  int day_of_week = c.get(Calendar.DAY_OF_WEEK) - 1;
	  if (day_of_week == 0)
	   day_of_week = 7;
	  c.add(Calendar.DATE, -day_of_week + 7);
	  return sdf.format(c.getTime());
	 }
	 
	 public static String getMonth(String ymd){
		 SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		 Date date = null;
		try {
			date = sdf.parse(ymd);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		 int month = date.getMonth() + 1;
		 if(month < 10){
			 return "0"+month;
		 }else{
			 return "" +month;
		 }
		 
	 }
	 /**
	  * 将长整型数字转换为日期格式的字符�?
	  *
	  * @param time
	  * @param format
	  * @return
	  */
	 public static String convert2String(long time) {
	  if (time > 0l) {
	   SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
	   Date date = new Date(time);

	   return sf.format(date);
	  }
	  return "";
	 }
	 
	 
	 public static String getNoSeparateDate(){
		 SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
	     Date date = new Date();
	     String formatDate = sdf.format(date);
	     return formatDate;
	 }
	 
	 public static Date transferToDate(String ymd, String format){
		 SimpleDateFormat sdf = new SimpleDateFormat(format);                
		 Date date = null;
		try {
			date = sdf.parse(ymd);
		} catch (ParseException e) {
			e.printStackTrace();
		}            
		 return date;
	 }
	 
	 
	 public static void main(String[] args) {
		System.out.println(transferToDate(getCurrentTime(),"yyyy-MM-dd"));
	}
	 
}

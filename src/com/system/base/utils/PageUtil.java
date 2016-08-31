package com.system.base.utils;

/**
 * 模块名：工具模块 <br>
 * 文件名：PageUtil.java <br>
 * 功能说明: 分页公共类 <br>
 */
public final class PageUtil {

	/**
	 * 分页
	 * @param actionUrl 页码链接到的页面,既调用这个页脚的页面的地址
	 * @param count 数据总共有多少条
	 * @param pageSize 每页显示多少条数据
	 * @param currentPage 当前为第几页
	 * @param pageNumber 每行显示多少个分页页码
	 * @param otherParams 代表其他参数，表示页码连接上要传过去的其他参数对，如name=aiyou&
	 * @return 格式化后的HTML
	 */
	public final static String getPageHtml(String actionUrl, Integer count,Integer pageSize, Integer currentPage,Integer pageNumber, String otherParams) {
		
		StringBuffer pageHtml = new StringBuffer();
		// 计算总共有多少页
		int pageCount = 0;// 总页数
		if (count % pageSize != 0){// 如果总页数除以每页显示数不等于0，则页码加一
			pageCount = count / pageSize + 1;
		} else {
			pageCount = count / pageSize;
		}
		
		//调整参数格式
		if(otherParams!=null && !otherParams.equals("")){
			if(!otherParams.startsWith("&")){
				otherParams="&"+otherParams;
			}
		}else{
			otherParams="";
		}

		//可以显示的页码的总数
		int showPageCount = 0;
		if (pageNumber >= pageCount) {
			showPageCount = pageCount;
		} else {
			showPageCount = pageNumber;
		}

		//当总页数大于一页时，显示分页
		if (pageCount > 1) {
			pageHtml.append("<div class='page'><ul>");
			
			//开始页码
			int begin = 1;
			//结束页码
			int end = showPageCount;
			if (currentPage > showPageCount) {
				begin = currentPage;
				//最后一列分页页码保持不变
				if(begin>pageCount-showPageCount+1){
					begin=pageCount-showPageCount+1;
				}
				end += begin;
				//多的页码去掉
				if (end > pageCount) {
					end = pageCount;
				}
			}

			for (int i = begin; i <= end; i++) {
				
				//开始页码
				if (i == begin) {
					//当当前页不是第一页时，添加上一页按钮
					if (currentPage != 1) {
						pageHtml.append("<li title=\"上一页\"><a href=\""+actionUrl+"?currentPage="+(currentPage - 1)+otherParams+"\"><</a></li>");
						
						//当页码中没有第一页时，添加一个第一页
						if(begin>1){
							pageHtml.append("<li title=\"第1页\"><a href=\""+actionUrl+"?currentPage=1"+otherParams+"\">1</a></li>");
							pageHtml.append("<li class=\"disabled\"><a href=\"javascript:void(0);\">...</a></li>");
						}
					}
				}
				
				//当前页
				if (i == currentPage) {
					pageHtml.append("<li class=\"active\"><a href=\"javascript:void(0);\">"+i+"</a></li>");
				} else {
					pageHtml.append("<li title=\"第"+i+"页\"><a href=\""+actionUrl+"?currentPage="+i+otherParams+"\">" + i + "</a></li>");
				}
				//结束页码
				if (i == end) {
					//当当前页不是第最后一页时，添加最后一页按钮
					if (currentPage < pageCount) {
						
						//当页码中没有最后一页时，添加一个最后一页
						if(end<pageCount){
							pageHtml.append("<li class=\"disabled\"><a href=\"javascript:void(0);\">...</a></li>");
							pageHtml.append("<li title=\"第"+pageCount+"页\"><a href=\""+actionUrl+"?currentPage="+pageCount+otherParams+"\">"+pageCount+"</a></li>");
						}
						
						pageHtml.append("<li title=\"下一页\"><a href=\""+actionUrl+"?currentPage="+(currentPage + 1)+otherParams+"\">> </a></li>");
					}
				}
			}
			pageHtml.append("</ul></div>");
			
		}else{
			pageHtml=new StringBuffer("");
		}
		return pageHtml.toString();
	}
}

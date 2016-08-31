package com.system.base.common;

public class Page implements java.io.Serializable {
	private static final long serialVersionUID = -664928206045319154L;
	
	private int currentPage;
	private int pageSize;
	public int getCurrentPage() {
		return currentPage;
	}
	public void setCurrentPage(int currentPage) {
		this.currentPage = currentPage;
	}
	public int getPageSize() {
		return pageSize;
	}
	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}
	
	
	
}

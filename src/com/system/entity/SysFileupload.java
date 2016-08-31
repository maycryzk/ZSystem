package com.system.entity;

/**
 * SysFileupload entity. @author MyEclipse Persistence Tools
 */

public class SysFileupload implements java.io.Serializable {
	
	private static final long serialVersionUID = 2358178376868995699L;

	// Fields

	private String id;
	private String filePath;
	private String fileOriName;
	private String fileType;
	private String fileTable;

	// Constructors

	/** default constructor */
	public SysFileupload() {
	}

	/** minimal constructor */
	public SysFileupload(String id) {
		this.id = id;
	}

	/** full constructor */
	public SysFileupload(String id, String filePath, String fileOriName,
			String fileType, String fileTable) {
		this.id = id;
		this.filePath = filePath;
		this.fileOriName = fileOriName;
		this.fileType = fileType;
		this.fileTable = fileTable;
	}

	// Property accessors

	public String getId() {
		return this.id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getFilePath() {
		return this.filePath;
	}

	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}

	public String getFileOriName() {
		return this.fileOriName;
	}

	public void setFileOriName(String fileOriName) {
		this.fileOriName = fileOriName;
	}

	public String getFileType() {
		return this.fileType;
	}

	public void setFileType(String fileType) {
		this.fileType = fileType;
	}

	public String getFileTable() {
		return this.fileTable;
	}

	public void setFileTable(String fileTable) {
		this.fileTable = fileTable;
	}

}
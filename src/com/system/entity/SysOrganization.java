package com.system.entity;

import java.util.Date;


/**
 * SysOrganization entity. @author MyEclipse Persistence Tools
 */

public class SysOrganization implements java.io.Serializable {
	
	private static final long serialVersionUID = 1457883693591008884L;

	// Fields

	private String id;
	private SysOrganization sysOrganization;
	private String orgName;
	private Integer orgLevel;
	private Integer sort;
	private String description;
	private Integer isDel;
	private Date createtime;
	private String createuser;
	private Date updatetime;
	private String updateuser;

	
	private String parentName;
	
	// Constructors

	/** default constructor */
	public SysOrganization() {
	}

	/** minimal constructor */
	public SysOrganization(String id, String orgName) {
		this.id = id;
		this.orgName = orgName;
	}


	// Property accessors

	public String getId() {
		return this.id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public SysOrganization getSysOrganization() {
		return sysOrganization;
	}

	public void setSysOrganization(SysOrganization sysOrganization) {
		this.sysOrganization = sysOrganization;
	}

	public String getOrgName() {
		return this.orgName;
	}

	public void setOrgName(String orgName) {
		this.orgName = orgName;
	}

	public Integer getOrgLevel() {
		return this.orgLevel;
	}

	public void setOrgLevel(Integer orgLevel) {
		this.orgLevel = orgLevel;
	}

	public Integer getSort() {
		return this.sort;
	}

	public void setSort(Integer sort) {
		this.sort = sort;
	}

	public String getDescription() {
		return this.description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Integer getIsDel() {
		return isDel==null?0:isDel;
	}

	public void setIsDel(Integer isDel) {
		this.isDel = isDel;
	}

	public Date getCreatetime() {
		return this.createtime;
	}

	public void setCreatetime(Date createtime) {
		this.createtime = createtime;
	}

	public String getCreateuser() {
		return this.createuser;
	}

	public void setCreateuser(String createuser) {
		this.createuser = createuser;
	}

	public Date getUpdatetime() {
		return this.updatetime;
	}

	public void setUpdatetime(Date updatetime) {
		this.updatetime = updatetime;
	}

	public String getUpdateuser() {
		return this.updateuser;
	}

	public void setUpdateuser(String updateuser) {
		this.updateuser = updateuser;
	}

	
	
	
	
	
	public String getParentName() {
		return parentName;
	}

	public void setParentName(String parentName) {
		this.parentName = parentName;
	}
	
}
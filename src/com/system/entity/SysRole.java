package com.system.entity;

import java.util.Date;

/**
 * SysRole entity. @author MyEclipse Persistence Tools
 */

public class SysRole implements java.io.Serializable {
	
	private static final long serialVersionUID = -3983965501677362835L;

	// Fields

	private String id;
	private String roleName;
	private Integer sort;
	private String description;
	private Date createtime;
	private String createuser;
	private Date updatetime;
	private String updateuser;

	// Constructors

	/** default constructor */
	public SysRole() {
	}

	/** minimal constructor */
	public SysRole(String id, String roleName) {
		this.id = id;
		this.roleName = roleName;
	}

	/** full constructor */
	public SysRole(String id, String roleName, Integer sort,
			String description, Date createtime, String createuser,
			Date updatetime, String updateuser) {
		this.id = id;
		this.roleName = roleName;
		this.sort = sort;
		this.description = description;
		this.createtime = createtime;
		this.createuser = createuser;
		this.updatetime = updatetime;
		this.updateuser = updateuser;
	}

	// Property accessors

	public String getId() {
		return this.id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getRoleName() {
		return this.roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
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

}
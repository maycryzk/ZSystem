package com.system.entity;

/**
 * SysOrgRole entity. @author MyEclipse Persistence Tools
 */

public class SysOrgRole implements java.io.Serializable {
	
	private static final long serialVersionUID = -6208675111903921538L;

	// Fields

	private String id;
	private String orgId;
	private String roleId;

	// Constructors

	/** default constructor */
	public SysOrgRole() {
	}

	/** full constructor */
	public SysOrgRole(String id, String orgId, String roleId) {
		this.id = id;
		this.orgId = orgId;
		this.roleId = roleId;
	}

	// Property accessors

	public String getId() {
		return this.id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getOrgId() {
		return this.orgId;
	}

	public void setOrgId(String orgId) {
		this.orgId = orgId;
	}

	public String getRoleId() {
		return this.roleId;
	}

	public void setRoleId(String roleId) {
		this.roleId = roleId;
	}

}
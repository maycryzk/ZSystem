package com.system.entity;

/**
 * SysUserOrg entity. @author MyEclipse Persistence Tools
 */

public class SysUserOrg implements java.io.Serializable {
	
	private static final long serialVersionUID = -4842659434560332617L;

	// Fields

	private String id;
	private String orgId;
	private String userId;

	// Constructors

	/** default constructor */
	public SysUserOrg() {
	}

	/** minimal constructor */
	public SysUserOrg(String id) {
		this.id = id;
	}

	/** full constructor */
	public SysUserOrg(String id, String orgId, String userId) {
		this.id = id;
		this.orgId = orgId;
		this.userId = userId;
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

	public String getUserId() {
		return this.userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

}
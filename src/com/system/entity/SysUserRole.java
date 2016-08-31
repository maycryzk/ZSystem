package com.system.entity;

/**
 * SysUserRole entity. @author MyEclipse Persistence Tools
 */

public class SysUserRole implements java.io.Serializable {
	
	private static final long serialVersionUID = 598460642991358910L;

	// Fields

	private String id;
	private String userId;
	private String roleId;

	// Constructors

	/** default constructor */
	public SysUserRole() {
	}

	/** minimal constructor */
	public SysUserRole(String id) {
		this.id = id;
	}

	/** full constructor */
	public SysUserRole(String id, String userId, String roleId) {
		this.id = id;
		this.userId = userId;
		this.roleId = roleId;
	}

	// Property accessors

	public String getId() {
		return this.id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getUserId() {
		return this.userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getRoleId() {
		return this.roleId;
	}

	public void setRoleId(String roleId) {
		this.roleId = roleId;
	}

}
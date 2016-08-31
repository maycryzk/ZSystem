package com.system.service;

import java.util.List;

import net.sf.json.JSONObject;

import com.system.base.common.SessionInfo;
import com.system.entity.OrgTreeGrid;
import com.system.entity.SysOrganization;

public interface OrgService {

	/**
	 * 查询组织机构列表
	 * @param org
	 * @return
	 */
	public List<OrgTreeGrid> loadOrgList(SysOrganization org);
	
	/**
	 * 添加/修改组织机构
	 * @param org  组织机构信息
	 * @param sessionInfo session信息
	 * @return
	 */
	public JSONObject saveOrUpdateOrg(SysOrganization org, SessionInfo sessionInfo);
	
	
	/**
	 * 删除组织机构（逻辑删除）
	 * @param org
	 * @param sessionInfo
	 * @return
	 */
	public JSONObject deleteOrg(String id, SessionInfo sessionInfo);
	
	
	/**
	 * 通过上级组织id查询组织机构
	 * @param pId 上级组织id
	 * @return
	 */
	public List<SysOrganization> getSysOrganizationsByPId(String pId);
}

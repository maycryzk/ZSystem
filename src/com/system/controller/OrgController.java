package com.system.controller;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import com.system.base.common.Constants;
import com.system.base.common.SessionInfo;
import com.system.base.common.ZTree;
import com.system.base.service.BaseService;
import com.system.entity.OrgTreeGrid;
import com.system.entity.SysOrganization;
import com.system.service.OrgService;

@Controller
@RequestMapping("/org/*")
public class OrgController {
	
	@Resource
	private BaseService baseService;
	
	@Resource
	private OrgService orgService;
	
	/**
	 * 加载组织机构列表
	 * @param org 查询条件
	 * @return
	 */
	@RequestMapping("loadOrgList.do")
	public ModelAndView loadOrgList(SysOrganization org){
		ModelAndView mav = new ModelAndView();
		List<OrgTreeGrid> treeGridList = orgService.loadOrgList(org);
		JSONArray ja = JSONArray.fromObject(treeGridList);
		mav.addObject("treeData", ja.toString());
		mav.addObject("org", org);
		mav.setViewName("system/org/org_list");
		return mav;
	}
	
	
	/**
	 * 加载组织机构树
	 * @return
	 */
	@RequestMapping("loadOrgTree.do")
	@ResponseBody
	public List<ZTree> loadOrgTree(){
		List<ZTree> treeList = new ArrayList<ZTree>();
		List<SysOrganization> orgList = baseService.list("from SysOrganization where isDel = 0  order by sort");
		if(!CollectionUtils.isEmpty(orgList)){
			for(SysOrganization org : orgList){
				String pId = org.getSysOrganization()==null?null:org.getSysOrganization().getId();
				ZTree tree = new ZTree(org.getId(),pId,org.getOrgName(),org.getOrgLevel()==null?"":org.getOrgLevel().toString(),true);
				treeList.add(tree);
			}
		}
		return treeList;
	}
	
	
	/**
	 * 跳转到组织机构添加/修改页面
	 * @param id 组织机构id
	 * @return
	 */
	@RequestMapping("toAddOrEditOrg.do")
	public ModelAndView toAddOrEditOrg(SysOrganization org){
		ModelAndView mav = new ModelAndView();
		if(StringUtils.isNotBlank(org.getId())){
			org = (SysOrganization) baseService.get(SysOrganization.class, org.getId());
			mav.addObject("id", org.getId());
		}
		mav.addObject("org", org);
		mav.setViewName("system/org/org_edit");
		return mav;
	}
	
	/**
	 * 添加/修改组织机构
	 * @param org
	 * @param sessionInfo
	 * @return
	 */
	@RequestMapping("saveOrUpdateOrg.do")
	@ResponseBody
	public JSONObject saveOrUpdateOrg(SysOrganization org, HttpSession session){
		SessionInfo sessionInfo = (SessionInfo) session.getAttribute(Constants.sessionInfo);
		return orgService.saveOrUpdateOrg(org, sessionInfo);
	}
	
	
	/**
	 * 删除组织（逻辑删除）
	 * @param org
	 * @param session
	 * @return
	 */
	@RequestMapping("deleteOrg.do")
	@ResponseBody
	public JSONObject deleteOrg(String id, HttpSession session){
		SessionInfo sessionInfo = (SessionInfo) session.getAttribute("sessionInfo");
		return orgService.deleteOrg(id, sessionInfo);
	}
	
	
	/**
	 * 是否含有子级组织
	 * @param id
	 * @return
	 */
	@RequestMapping("hasChildren.do")
	@ResponseBody
	public boolean hasChildren(String id){
		List<SysOrganization> organizations = orgService.getSysOrganizationsByPId(id);
		return CollectionUtils.isEmpty(organizations)?false:true;
	}
}

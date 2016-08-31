package com.system.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import com.system.base.common.SessionInfo;
import com.system.base.dao.BaseDao;
import com.system.entity.OrgTreeGrid;
import com.system.entity.SysOrganization;

@Service(value="orgService")
public class OrgServiceImpl implements OrgService {
	
	@Resource
	private BaseDao baseDao;
	
	@Override
	public List<OrgTreeGrid> loadOrgList(SysOrganization org) {
		String hql = "from SysOrganization where isDel = 0 ";
		List<Object> paramList = new ArrayList<Object>();
		if(StringUtils.isNotBlank(org.getOrgName())){
			hql +=  " and orgName like ? ";
			paramList.add("%"+org.getOrgName()+"%");
		}
		if(org.getSysOrganization()!=null&&StringUtils.isNotBlank(org.getSysOrganization().getId())){
			hql += " and sysOrganization.id = ? ";
			paramList.add(org.getSysOrganization().getId());
		}
		if(org.getOrgLevel() != null){
			hql += " and orgLevel = ? ";
			paramList.add(org.getOrgLevel());
		}
		List<OrgTreeGrid> treeGridList = new ArrayList<OrgTreeGrid>();
		List<SysOrganization> orgList = baseDao.list(hql, paramList.toArray());
		if(!CollectionUtils.isEmpty(orgList)){
			for(SysOrganization sysOrg : orgList){
				OrgTreeGrid treeGrid = new OrgTreeGrid();
				treeGrid.setId(sysOrg.getId());
				treeGrid.setParentId(sysOrg.getSysOrganization()==null?null:sysOrg.getSysOrganization().getId());
				treeGrid.setParentName(sysOrg.getSysOrganization()==null?null:sysOrg.getSysOrganization().getOrgName());
				treeGrid.setOrgName(sysOrg.getOrgName());
				treeGrid.setOrgLevel(sysOrg.getOrgLevel());
				treeGrid.setDescription(sysOrg.getDescription());
				treeGrid.setIcon("css/images/directory.png");
				treeGrid.setExpanded(StringUtils.isBlank(treeGrid.getParentId())?true:false);
				treeGridList.add(treeGrid);
			}
			
		}
		return treeGridList;
	}

	
	@Override
	public JSONObject saveOrUpdateOrg(SysOrganization org, SessionInfo sessionInfo) {
		JSONObject result = new JSONObject();
		result.put("success", true);
		Date currentTime = new Date();
		try {
			if(StringUtils.isBlank(org.getId())){//添加组织机构
				org.setId(UUID.randomUUID().toString());
				org.setCreatetime(currentTime);
				org.setCreateuser(sessionInfo==null?null:sessionInfo.getCurUserId());
				org.setUpdatetime(currentTime);
				baseDao.save(org);
			}else{//修改组织机构 
				SysOrganization oldOrg = (SysOrganization) baseDao.get(SysOrganization.class, org.getId());
				oldOrg.setOrgName(org.getOrgName());
				oldOrg.setSysOrganization(org.getSysOrganization());
				oldOrg.setOrgLevel(org.getOrgLevel());
				oldOrg.setSort(org.getSort());
				oldOrg.setDescription(org.getDescription());
				oldOrg.setUpdatetime(currentTime);
				oldOrg.setUpdateuser(sessionInfo==null?null:sessionInfo.getCurUserId());
				baseDao.saveOrUpdate(oldOrg);
			}
		} catch (Exception e) {
			e.printStackTrace();
			result.put("success", false);
		}
		return result;
	}


	@Override
	public JSONObject deleteOrg(String id, SessionInfo sessionInfo) {
		JSONObject result = new JSONObject();
		result.put("success", true);
		try {
			SysOrganization org = (SysOrganization) baseDao.get(SysOrganization.class, id);
			org.setUpdateuser(sessionInfo==null?null:sessionInfo.getCurUserId());
			org.setUpdatetime(new Date());
			org.setIsDel(1);
			baseDao.saveOrUpdate(org);
		} catch (Exception e) {
			e.printStackTrace();
			result.put("success", false);
		}
		return result;
	}


	@Override
	public List<SysOrganization> getSysOrganizationsByPId(String pId) {
		return baseDao.list("from SysOrganization where sysOrganization.id = ?", new Object[]{pId});
	}

}

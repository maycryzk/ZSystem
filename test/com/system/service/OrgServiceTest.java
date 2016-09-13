package com.system.service;

import javax.annotation.Resource;

import org.junit.Test;

import com.system.entity.SysOrganization;

public class OrgServiceTest extends BaseServerTest{
	@Resource
	private OrgService orgService;
	
	@Test
	public void testLoadOrgList(){
		SysOrganization org = new SysOrganization();
		System.out.println(orgService.loadOrgList(org).size());
	}
}

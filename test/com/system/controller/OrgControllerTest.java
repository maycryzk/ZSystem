package com.system.controller;

import org.junit.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

public class OrgControllerTest extends BaseControllerTest{
	@Test
    public void loadOrgListTest() throws Exception{
    	mockMvc.perform(MockMvcRequestBuilders.get("/org/loadOrgList.do")    //请求的url,请求的方法是get
                        .contentType(MediaType.APPLICATION_FORM_URLENCODED))
               .andExpect(MockMvcResultMatchers.status().isOk()) //返回的状态是200
               .andDo(MockMvcResultHandlers.print())  //打印出请求和相应的内容
               .andReturn().getResponse().getContentAsString();  
    }
}

<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<%@ taglib uri="c" prefix="c"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    <title>组织机构列表</title>
	<meta charset="utf-8">
    <meta name="keywords" content="">
    <meta name="description" content="">
 	<link href="<%=basePath %>css/bootstrap.min.css" rel="stylesheet">
    <link href="<%=basePath %>css/font-awesome.min.css" rel="stylesheet">
    <link href="<%=basePath %>css/style.min.css" rel="stylesheet">
    <link href="<%=basePath %>plugins/bootstrap-table/css/bootstrap-table.min.css" rel="stylesheet">
    <link href="<%=basePath %>plugins/jqwidgets/styles/jqx.base.css" rel="stylesheet"/>
    <link href="<%=basePath %>plugins/layer/skin/layer.css" rel="stylesheet">
    <link href="<%=basePath %>plugins/zTree/css/demo.css" rel="stylesheet">
  	<link href="<%=basePath %>plugins/zTree/css/zTreeStyle/zTreeStyle.css" rel="stylesheet">
  	<link href="<%=basePath %>css/system.css" rel="stylesheet">
  	<script src="<%=basePath %>js/jquery.min.js"></script>
    <script src="<%=basePath %>js/bootstrap.min.js"></script>
    <script src="<%=basePath %>plugins/jqwidgets/jqxcore.js" type="text/javascript"></script>
    <script src="<%=basePath %>plugins/jqwidgets/jqxbuttons.js" type="text/javascript"></script>
    <script src="<%=basePath %>plugins/jqwidgets/jqxscrollbar.js" type="text/javascript"></script>
    <script src="<%=basePath %>plugins/jqwidgets/jqxdatatable.js" type="text/javascript"></script>
    <script src="<%=basePath %>plugins/jqwidgets/jqxtreegrid.js" type="text/javascript"></script>
    <script src="<%=basePath %>plugins/jqwidgets/jqxlistbox.js" type="text/javascript"></script>
    <script src="<%=basePath %>plugins/jqwidgets/jqxdropdownlist.js" type="text/javascript"></script>
    <script src="<%=basePath %>plugins/jqwidgets/jqxdata.js" type="text/javascript"></script>
    <script src="<%=basePath %>plugins/jqwidgets/jqxtooltip.js" type="text/javascript"></script>
    <script src="<%=basePath %>plugins/bootstrap-table/js/bootstrap-table.min.js" type="text/javascript"></script>
    <script src="<%=basePath %>plugins/bootstrap-table/js/locale/bootstrap-table-zh-CN.min.js" type="text/javascript"></script>
    <script src="<%=basePath %>plugins/validate/validate.js"></script>
  	<script src="<%=basePath %>plugins/validate/validate-help.js"></script>
    <script src="<%=basePath %>plugins/zTree/js/jquery.ztree.core.min.js" type="text/javascript"></script>
    <script src="<%=basePath %>plugins/layer/layer.js" type="text/javascript"></script>
    <script src="<%=basePath %>js/common/common.js" type="text/javascript"></script>
    <script src="<%=basePath %>js/common/ztree.js" type="text/javascript"></script>
    <script src="<%=basePath %>js/system/org/org_list.js" type="text/javascript"></script>
    <script type="text/javascript">
    	var treeData = eval("("+'${treeData}'+")");
    </script>
  </head>
    <body class="gray-bg">
        <div class="ibox float-e-margins">
            <div class="ibox-content">
                <div class="row row-lg">
                    <div class="col-md-12">
                        <div class="example-wrap">
                        <input id="level" type="hidden" />
                        <input id="pId" type="hidden" />
                        <input id="pName" type="hidden" />
                        <form action="<%=basePath %>org/loadOrgList.do" id="queryForm" method="post">
                          <div class="col-md-4 keysearch">
							    <div class="form-group">
							        <label class="col-sm-4 control-label">组织名称：</label>
							        <div class="col-sm-8">
							            <input type="text" id="orgName" name="orgName" value="${org.orgName }" class="form-control" placeholder="请输入组织名称">
							        </div>
							    </div>
							</div>
							<div class="col-md-4 keysearch">
							    <div class="form-group">
							        <label class="col-sm-4 control-label">父级组织：</label>
							        <div class="col-sm-7 input-group">
							             <input id="parentName" name="parentName" readonly="readonly" value="${org.parentName }" onclick="showOrgTree();" name="" value="${org.sysOrganization.orgName }" placeholder="请输父级组织" class="form-control" type="text">
                               			<div class="input-group-addon"> 
									        <a href="javascript:;" onclick="clearParentOrg();"><i class="fa fa-times-circle"></i></a> 
									    </div> 
                               			 <input id="parentId" name="sysOrganization.id" value="${org.sysOrganization.id }" type="hidden">
							        </div>
							    </div>
							</div>
							 <div class="col-md-4 keysearch">
							    <div class="form-group">
							        <label class="col-sm-4 control-label">组织类型：</label>
							        <div class="col-sm-8">
							            <select id="orgLevel" name="orgLevel" class="form-control">
							             <option value="">全部</option>
								         <option value="0" <c:if test="${org.orgLevel==0 }">selected="selected"</c:if>>组织</option>
								         <option value="1" <c:if test="${org.orgLevel==1 }">selected="selected"</c:if>>部门</option>
								         <option value="2" <c:if test="${org.orgLevel==2 }">selected="selected"</c:if>>分组</option>
								      </select>
							        </div>
							    </div>
							</div>
                            <div class="example">
                                <div class="btn-group hidden-xs pull-right" style="margin-top: 10px;" id="orgTableToolbar" role="group">
                                  <button class="btn btn-info" id="add" onclick="toAddOrEditOrg()" type="button">
                                 	 <i class="fa fa-plus"></i>&nbsp;&nbsp;<span class="bold">添加</span>
                      			  </button>
                                  <button class="btn btn-success"  id="search" type="button">
                                 	 <i class="fa fa-search"></i>&nbsp;&nbsp;<span class="bold">查询</span>
                      			  </button>
                                </div>
                            </div>
                           </form>
                        </div>
                    </div>
	      	 		<div id="treeGrid" style="margin-left: 6px;"></div>
                </div>
      	 	</div>
      	 </div>
         <div id="menuContent" class="menuContent" style="display:none; position: absolute;z-index: 999">
			<ul id="treeDiv" class="ztree" style="margin-top:0; width:200px;height: 260px;"></ul>
		 </div>
   </body>
</html>

<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>添加/修改组织</title>
    
	<meta charset="utf-8">
    <meta name="keywords" content="">
    <meta name="description" content="">
 	<link href="<%=basePath %>css/bootstrap.min.css" rel="stylesheet">
    <link href="<%=basePath %>css/font-awesome.min.css" rel="stylesheet">
    <link href="<%=basePath %>css/style.min.css" rel="stylesheet">
    <link href="<%=basePath %>plugins/spinner/bootstrap-spinner.css" rel="stylesheet">
    <link href="<%=basePath %>plugins/layer/skin/layer.css" rel="stylesheet">
    <link href="<%=basePath %>plugins/zTree/css/demo.css" rel="stylesheet">
  	<link href="<%=basePath %>plugins/zTree/css/zTreeStyle/zTreeStyle.css" rel="stylesheet">
  	<script src="<%=basePath %>js/jquery.min.js"></script>
    <script src="<%=basePath %>js/bootstrap.min.js"></script>
    <script src="<%=basePath %>plugins/validate/validate.js"></script>
  	<script src="<%=basePath %>plugins/validate/validate-help.js"></script>
    <script src="<%=basePath %>plugins/spinner/jquery.spinner.min.js"></script>
    <script src="<%=basePath %>plugins/zTree/js/jquery.ztree.core.min.js" type="text/javascript"></script>
    <script src="<%=basePath %>plugins/layer/layer.js" type="text/javascript"></script>
    <script src="<%=basePath %>js/common/common.js" type="text/javascript"></script>
    <script src="<%=basePath %>js/common/ztree.js" type="text/javascript"></script>
    <script src="<%=basePath %>js/system/org/org_edit.js" type="text/javascript"></script>
	<script type="text/javascript">

	</script>
  </head>
  
  <body>
   	<div class="animated fadeInRight">
        <div class="row">
            <div class="col-sm-12">
                <div class="ibox float-e-margins">
                    <div class="ibox-content">
                        <form class="form-horizontal m-t" id="signupForm">
                            <input type="hidden" name="id" id="id" value="${org.id }">
                            <div class="form-group">
                                <label class="col-sm-2 control-label">组织名称：</label>
                                <div class="col-sm-3">
                                    <input id="orgName" name="orgName" value="${org.orgName }" placeholder="请输入组织名称" class="required form-control" type="text">
                                </div>
                                <label class="col-sm-2 control-label">上级组织：</label>
                                <div class="col-sm-3">
                                    <input id="parentName" readonly="readonly" onclick="showOrgTree();" name="" value="${org.sysOrganization.orgName }" placeholder="请输入上级组织" class="form-control" type="text">
                               		<input id="parentId" name="sysOrganization.id" value="${org.sysOrganization.id}" type="hidden">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">组织级别：</label>
                                <div class="col-sm-3">
                                	 <input type="hidden" id="orgLevel" value="${org.orgLevel }" />
                                	 <select id="orgLevelSelect" name="orgLevel" class="required form-control">
								         
								     </select>
                                </div>
                                <label class="col-sm-2 control-label">排序号：</label>
                                <div class="col-sm-3">
                                    <div class="input-group spinner" data-trigger="spinner" id="spinner"> 
									    <input type="text" name="sort" readonly="readonly" id="sort" class="form-control" value="${org.sort }" data-min="1" data-step="1"> 
									    <div class="input-group-addon"> 
									        <a href="javascript:;" class="spin-up" data-spin="up"><i class="fa fa-sort-up"></i></a> 
									        <a href="javascript:;" class="spin-down" data-spin="down"><i class="fa fa-sort-down"></i></a> 
									    </div> 
									</div> 
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">描述：</label>
                                <div class="col-sm-8">
                                	<textarea class="form-control" style="min-height: 150px" name="description" id="description">${org.description }</textarea>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="menuContent" class="menuContent" style="display:none; position: absolute;z-index: 999">
		<ul id="treeDiv" class="ztree" style="margin-top:0; width:200px; height: 260px;"></ul>
	</div>
  </body>
</html>

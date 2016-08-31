<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="c" prefix="c" %>
<%String path = request.getContextPath();
  String basePath = request.getScheme() + "://"+ request.getServerName() + ":" + request.getServerPort()+ path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
  <meta name="description" content="">
  <meta name="author" content="">
<title>首页</title>
<link href="<%=basePath %>css/style.default.css" rel="stylesheet">
<link href="<%=basePath %>plugins/layer/skin/layer.css" rel="stylesheet">
<link href="<%=basePath %>plugins/toastr/toastr.min.css" rel="stylesheet">
<script src="<%=basePath %>js/jquery.min.js"></script>
<script src="<%=basePath %>js/jquery-migrate-1.2.1.min.js"></script>
<script src="<%=basePath %>js/bootstrap.min.js"></script>
<script src="<%=basePath %>js/custom.js"></script>
<script src="<%=basePath %>js/toggles.min.js"></script>
<script src="<%=basePath %>js/jquery.sparkline.min.js"></script>
<script src="<%=basePath %>js/jquery.cookies.js"></script>
<script src="<%=basePath %>plugins/layer/layer.js" type="text/javascript"></script>
<script src="<%=basePath %>plugins/toastr/toastr.min.js"></script>
<script type="text/javascript">
	toastr.options = { 
	  "closeButton": false,
	  "debug": false,
	  "progressBar": true,
	  "positionClass": "toast-top-right",
	  "onclick": null,
	  "showDuration": "0",
	  "hideDuration": "0",
	  "timeOut": "1000",
	  "extendedTimeOut": "0",
	  "showEasing": "swing",
	  "hideEasing": "linear",
	  "showMethod": "fadeIn",
	  "hideMethod": "fadeOut"}
	$(function(){
		serializeIframe();
		$("#mainFrame").load(function(){
			serializeIframe();
		});
	
	});
	
	function serializeIframe(){
		var height1= $("#mainFrame").contents().find("body").height() + 40;
		var height2 = window.screen.height;
		
		$("#mainFrame").height((height1>height2)?height1:(height2-200));
	}

</script>

</head>

<body>
	<div id="preloader">
    <div id="status"><i class="fa fa-spinner fa-spin"></i></div>
</div>
  <div class="leftpanel">

    <div class="logopanel">
        <h1><span>[</span> LOGO <span>]</span></h1>
    </div><!-- logopanel -->
 
    <div class="leftpanelinner">
      <ul class="nav nav-pills nav-stacked nav-bracket">
        <li class="nav-parent"><a href=""><i class="fa fa-laptop"></i> <span>系统管理</span></a>
          <ul class="children">
          	<li><a href="<%=basePath %>org/loadOrgList.do" target="mainFrame">组织机构管理</a></li>
            <li><a href="general-forms.html" target="mainFrame">用户管理</a></li>
            <li><a href="general-forms.html" target="mainFrame">角色管理</a></li>
          </ul>
        </li>
      </ul>
    </div><!-- leftpanelinner -->
  </div><!-- leftpanel -->

  <div class="mainpanel">

    <div class="headerbar">

      <a class="menutoggle"><i class="fa fa-bars"></i></a>


      <div class="header-right">
        <ul class="headermenu">
          <li>
            <div class="btn-group">
              <button class="btn btn-default dropdown-toggle tp-icon" data-toggle="dropdown">
                <i class="glyphicon glyphicon-user"></i>
                <span class="badge">2</span>
              </button>
            </div>
          </li>
          <li>
            <div class="btn-group">
              <button class="btn btn-default dropdown-toggle tp-icon" data-toggle="dropdown">
                <i class="glyphicon glyphicon-envelope"></i>
                <span class="badge">1</span>
              </button>
            </div>
          </li>
          <li>
            <div class="btn-group">
              <button class="btn btn-default dropdown-toggle tp-icon" data-toggle="dropdown">
                <i class="glyphicon glyphicon-globe"></i>
                <span class="badge">5</span>
              </button>
            </div>
          </li>
          <li>
            <div class="btn-group">
              <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                <img src="images/photos/loggeduser.png" alt="" />
                John Doe
                <span class="caret"></span>
              </button>
              <ul class="dropdown-menu dropdown-menu-usermenu pull-right">
                <li><a href="profile.html"><i class="glyphicon glyphicon-user"></i> My Profile</a></li>
                <li><a href="#"><i class="glyphicon glyphicon-cog"></i> Account Settings</a></li>
                <li><a href="#"><i class="glyphicon glyphicon-question-sign"></i> Help</a></li>
                <li><a href="signin.html"><i class="glyphicon glyphicon-log-out"></i> Log Out</a></li>
              </ul>
            </div>
          </li>
        </ul>
      </div><!-- header-right -->

    </div><!-- headerbar -->

    <div class="" style="padding: 15px;border-bottom: 1px solid #d3d7db; border-top: 1px solid #eee;background: #f7f7f7;position: relative;">
      	<span><i class="fa fa-laptop"></i></span>
    </div>

    <div class="contentpanel">
		<iframe id="mainFrame" name="mainFrame" width="100%"  src="<%=basePath %>base/welcome.do" scrolling="auto" frameborder="0"></iframe>

    </div><!-- contentpanel -->

  </div><!-- mainpanel -->

</body>
</html>


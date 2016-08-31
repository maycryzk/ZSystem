$(function(){
	initOrgLevel($("#orgLevel").val());
	if($("#id").val()!=""){
		$("#parentName").removeAttr("onclick");
	}
});



/**
 * 加载组织级别下拉框选项
 * @param level 切换上级组织时所选上级组织的级别
 * @return
 */
function initOrgLevel(orgLevel){
	var option0 = "<option value=\"0\"";
	if(orgLevel == "0"){
		option0 += "selected=\"selected\"";
	}
	option0 += ">组织</option>";
	var option1 = "<option value=\"1\"";
	if(orgLevel == "1"){
		option1 += "selected=\"selected\"";
	}
	option1 += ">部门</option>";
	var option2 = "<option value=\"2\"";
	if(orgLevel == "2"){
		option2 += "selected=\"selected\"";
	}
	option2 += ">分组</option>";
	$("#orgLevelSelect").empty();
	if(orgLevel == ""){
		$("#orgLevelSelect").append(option0);
	}else if(orgLevel == "0"){
		$("#orgLevelSelect").append(option0 + option1);
	}else if(orgLevel == "1"){
		$("#orgLevelSelect").append(option1 + option2);
	}else if(orgLevel == "2"){
		$("#orgLevelSelect").append(option2);
	}else{}
}



/**
 * 上级组织树
 * @return
 */
function showOrgTree(){
	var setting = {
			view: {
				dblClickExpand: false
			},
			data: {
				simpleData: {
					enable: true
				}
			},
			callback: {
				onClick: onClick
			}
		};
	$.getJSON(basePath + "org/loadOrgTree.do",function(data){
		 $.fn.zTree.init($("#treeDiv"), setting, data);
		 showMenu("parentName");
	});
}


function onClick(e, treeId, treeNode) {
	$("#parentId").val(treeNode.id);
	$("#parentName").val(treeNode.name);
	initOrgLevel(treeNode.level + "");
	hideMenu();
}

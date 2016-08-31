$(function(){
	tableInit();
	$("#search").click(function(){
		search();
	});
	
	//绑定行点击事件
	$("#treeGrid").on("rowClick", 
		function (event){
		    var args = event.args;
		    var row = args.row;
		    clickTr(row)
	 	}
	 );
});


function search(){
	$("#queryForm").submit();
}

/*选中行*/
function clickTr(row){
	$("#level").val(row.orgLevel);
	$("#pId").val(row.id);
	$("#pName").val(row.orgName);
}    


//表格初始化
function tableInit(){
    // prepare the data
    var source =
    {
        dataType: "json",
        dataFields: [
            { name: "id", type: "string" },
            { name: "parentId", type: "string" },
            { name: "orgName", type: "string" },
            { name: "parentName", type: "string" },
            { name: "orgLevel", type: "string" },
            { name: "icon", type: "string" },
            { name: "expanded", type: "bool" },
            { name: "opt", type: "string" }
        ],
        hierarchy:
        {
           keyDataField: { name: "id" },
           parentDataField: { name: "parentId" }
        },
        id: "id",
        localData: treeData
    };
    var dataAdapter = new $.jqx.dataAdapter(source);
    // create Tree Grid
    $("#treeGrid").jqxTreeGrid(
    {
        width: "99%",
        source: dataAdapter,
        columnsresize: true,
        altrows: true,//是否行间颜色区分  
        //sortable: true,
        icons:true,
        columns: [
          { text: "组织名称", dataField: "orgName", width: "30%" },
          { text: "上级组织", dataField: "parentName", width: "30%" },
          { text: "组织级别", dataField: "orgLevel", width: "30%",
          	 cellsRenderer: function (rowKey, dataField, value, data) {
                   switch (value) {
                      case 0:
                          return "组织";
                      case 1:
                          return "部门";
                      case 2:
                          return "分组";
                      default:
                       	  return "";
                  } 
              }
          },
          { text: '操作', dataField: 'opt',width: "10%", 
        	  cellsRenderer: function (rowKey, dataField, value, data) {
        	  	var opt = "<a href=\"javascript:;\" stype=\"margin:auto 3px;\" title=\"编辑\" onclick=toAddOrEditOrg(\""+data.id+"\")><i class=\"fa fa-edit\"></i></a>&nbsp;&nbsp;";
    	  		opt += "<a href=\"javascript:;\" stype=\"margin:auto 3px;\" title=\"删除\" onclick=deleteOrg(\""+data.id+"\")><i class=\"fa fa-minus\"></i></a>&nbsp;&nbsp;";
        	  	return opt;

     		 }
          }
        ]
    });
	
}


/**
 * 弹出栏目新增或编辑框
 */
function toAddOrEditOrg(id){
	var title = "添加组织";
		var url = basePath+"org/toAddOrEditOrg.do?orgLevel="+$("#level").val()+"&sysOrganization.id="+$("#pId").val()+"&sysOrganization.orgName="+$("#pName").val();
		if(id){
			//修改
			title = "修改组织"
			url = basePath+"org/toAddOrEditOrg.do?id="+id;
		}
		parent.layer.open({
          type: 2,
          title: title,
          shadeClose: false,
          shade: [0.3,'#fff'],
          maxmin: true, //开启最大化最小化按钮
          area: ['60%', '70%'],
          content: url,
          btn: ["提交"],
          yes:function(index){
          	saveOrUpdateOrg(index);
          }
      });
}

/**
 * 提交栏目信息（添加/修改）
 * @param index 当前窗口索引
 * @return
 */
function saveOrUpdateOrg(index){
	var signupForm = parent.layer.getChildFrame("#signupForm");
	if($(signupForm).valid()){
		$.ajax({
			url:basePath+"org/saveOrUpdateOrg.do",
			data:$(signupForm).serialize(),
			type:"post",
			dataType:"json",
			success:function(result){
			if(result.success){
				search();
				parent.toastr.success("操作成功");
			}else{
				parent.toastr.error("操作失败,请联系管理员");
			}
			parent.layer.close(index);
		}
		});
	}
}

function deleteOrg(id){
	parent.layer.confirm("是否确定删除该组织?", {icon: 3, title:'提示'}, function(index){
		$.ajax({
			url:basePath + "org/hasChildren.do?id="+id,
			type:"post",
			success:function(rData){
				if(rData=="true"){
					parent.toastr.error("不能删除含有子节点的数据！");
				}else{
					$.ajax({
						url:basePath+"org/deleteOrg.do?id="+id,
						type:"post",
						dataType:"json",
						success:function(result){
						if(result.success){
							search();
							parent.toastr.success("操作成功");
						}else{
							parent.toastr.error("操作失败,请联系管理员");
						}
					}
					});
				}
			
			
			}
		});
		parent.layer.close(index);
	});
}




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
	hideMenu();
}

/**
 * 清除父级栏目
 * @return
 */
function clearParentOrg(){
	$("#parentName").val("");
	$("#parentId").val("");
}

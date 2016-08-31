
/**
 * 上传文件
 * @param tableName 业务表明
 * @param spanId    显示文件或图片的span的id
 * @return
 */
function ajaxUploadFile(fileObj,fileId,tableName,imgId){
	
	if($(fileObj).val().match("jpg")||$(fileObj).val().match("JPG")
			||$(fileObj).val().match("gif")||$(fileObj).val().match("GIF")
			||$(fileObj).val().match("jpeg")||$(fileObj).val().match("JPEG")
			||$(fileObj).val().match("png")||$(fileObj).val().match("PNG")
			||$(fileObj).val().match("bmp")||$(fileObj).val().match("BMP")){
		$.ajaxFileUpload({
			url:basePath + "uploadfile/uploadFile.do",
			fileElementId:$(fileObj).attr("id"),
			secureuri:false,
			data:{"file":"","tableName":tableName},
			dataType:'json',
			success:function(data, status){
				if(data.success){
					$("#"+fileId).val(data.id);
					$("#"+imgId).attr("src",basePath + "uploadfile/viewPic.do?fileId="+data.id);
					$("#"+imgId).show();
				}
			},
			error:function(data, sataus){
				
			}
		});
	}else{
		parent.layer.alert("请选择图片类型文件上传", {icon: 1});
	}
	
	
}
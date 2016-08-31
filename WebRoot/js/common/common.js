var basePath = $("head>base").attr("href");


function initEditor(name){
  editor =  KindEditor.create("textarea[name='"+name+"']",{
  			height:"245px",
        	uploadJson : basePath + "kindEditorController/fileUpload.do", 
        	fileManagerJson:basePath + "kindEditorController/fileManager.qc",
        	urlType:"domain",
			filterMode : true,
			formatUploadUrl:false,
			allowFileManager:true,
        	afterCreate : function() {
				var doc = this.edit.cmd.doc;
				this.sync();
				$("head",doc).append("<base href=\""+basePath+"\"/>");
				var images=doc.images||[];
				for( var i=0;i<images.length;i++){
					images[i].src=images[i].src;
				};
			},
			afterChange:function(){
				var doc = this.edit.cmd.doc;
				this.sync();
				$("head",doc).append("<base href=\""+basePath+"\"/>");
				var images=doc.images||[];
				for( var i=0;i<images.length;i++){
					images[i].src=images[i].src;
				};
			}
        });
	
	}
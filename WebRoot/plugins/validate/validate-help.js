//验证框架拓展验证功能
var hrefs = location.href.match(/(http:\/\/[^\/]*\/[^\/]*\/).*/);
var basePath = hrefs[1];

//ip验证   
jQuery.validator.addMethod("ip", function(value, element) {         
    return this.optional(element) || (/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/.test(value) && (RegExp.$1 < 256 && RegExp.$2 < 256 && RegExp.$3 < 256 && RegExp.$4 < 256));         
  }, "请输入正确的IP地址.");         
  
// 增加只能是字母和数字的验证         
  jQuery.validator.addMethod("chrnum", function(value, element) {         
    return this.optional(element) || (/^([a-zA-Z0-9]+)$/.test(value));         
  }, "只能输入数字、字母或者它们的组合");         
     
// 自定义验证规则——对电话号码进行验证       
$.validator.addMethod("phone",function(value, element){            
   // “/\(?0\d{2,3}[) -]?\d{7,8}/”匹配电话号码的格式多种：010-82839278、(010)82839278、01082839278等，但是，这样有一个问题         
   // 如：(01082839278这样的也会匹配。当然可以用分支条件"|"解决，比较麻烦。而且以什么开始或结束也没有匹配。         
   // 为了简单起见，去掉有"()"的形式。匹配区号3位，则本地号8位，区号4位，则本地号7位的号码。         
   var tel = /^0\d{2}[-]?\d{8}$|^0\d{3}[-]?\d{7}$/;         
   return this.optional(element) || (tel.test(value));         
   }, "<div style='color:red;'>电话号码格式不对.</div>" );        
  
// 手机号码验证       
jQuery.validator.addMethod("mobile", function(value, element) {       
  var length = value.length;       
  //长度为11，以13，15，18开头的   
  return this.optional(element) || (length == 11 && /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(value));       
}, "<div style='color:red;'>手机号码格式不对</div>");       

// 邮政编码验证       
jQuery.validator.addMethod("zip", function(value, element) {       
  var zip = /^[0-9]{6}$/;       
  return this.optional(element) || (zip.test(value));       
}, "邮政编码格式不对");    

//只能输入2-7位中文名
jQuery.validator.addMethod("chineseName", function(value, element) {       
  var name = /^[\u4e00-\u9fa5]{2,7}$/;       
  return this.optional(element) || (name.test(value));       
}, "<div style='color:red;'>必须输入2-7位中文</div>");

//只能输入中文
jQuery.validator.addMethod("chinese", function(value, element) {       
  var name = /^[\u4e00-\u9fa5]{0,}$/;       
  return this.optional(element) || (name.test(value));       
}, "<div style='color:red;'>必须输入中文</div>");

//用户名的检查
jQuery.validator.addMethod("userName", function(value, element) {       
  var name = /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/;       
  return this.optional(element) || (name.test(value));     
}, "<div style='color:red;'>必须输入4-19位用户名,且以字母开头</div>");

//工作流流程检查
jQuery.validator.addMethod("operFlow", function(value, element) {       
  var name = /^\d\,(\d\,){0,10}[E]{1}$/;       
  return this.optional(element) || (name.test(value));     
}, "<div style='color:red;'>请按照工作流流程格式填写，比如(1,2,3,E)</div>");

//工作流流程检查
jQuery.validator.addMethod("groupOperFlow", function(value, element) {       
  var name = /^\d\,(\d\,){0,10}[\d]{1}$/;       
  return this.optional(element) || (name.test(value));     
}, "<div style='color:red;'>请按照工作流组流程格式填写，比如(1,2,3)</div>");

//工作流流程检查
jQuery.validator.addMethod("code", function(value, element) {       
  var name = /^[\dE]$/;       
  return this.optional(element) || (name.test(value));     
}, "<div style='color:red;'>只能填写数字或E</div>");


//验证大日期
jQuery.validator.addMethod("endDate", 
function(value, element) { 
var startDate = $('#start_date').val(); 
return new Date(Date.parse(startDate.replace("-", "/"))) <= new Date(Date.parse(value.replace("-", "/"))); 
}, "日期必须前比后小!");

//验证小日期
jQuery.validator.addMethod("small", 
function(value, element) { 
var big = $('#big').val(); 
return new Date(Date.parse(big.replace("-", "/"))) > new Date(Date.parse(value.replace("-", "/"))); 
}, "日期必须前比后大!");

//验证A
jQuery.validator.addMethod("answera", function(value, element) {       
  var name = /^[ABCD]$/;       
  return this.optional(element) || (name.test(value));     
}, "<div style='color:red;'>单选题答案只能为：A、B、C、D</div>");

//验证A,B
jQuery.validator.addMethod("answerab", function(value, element) {       
  var name = /^[ABCD]\,([ABCD]\,){0,2}[ABCD]{1}$/;       
  return this.optional(element) || (name.test(value));     
}, "<div style='color:red;'>多选题答案要用逗号隔开</div>");

//两位浮点数
jQuery.validator.addMethod("float2", function(value, element) {       
  var name = /^\d{1,8}\.{0,1}\d{0,2}$/;       
  return this.optional(element) || (name.test(value));     
}, "请输入有效的数字，小数位至多为两位");

//两位浮点数(有效位数为8位)
jQuery.validator.addMethod("8float2", function(value, element) {       
  var name = /^\d{1,6}\.{0,1}\d{0,2}$/;       
  return this.optional(element) || (name.test(value));     
}, "请输入有效的数字，小数位至多为两位");
//两位浮点数
jQuery.validator.addMethod("num2", function(value, element) {       
  var name = /^[1-9]{0,1}\d$/;       
  return this.optional(element) || (name.test(value));     
}, "请输入有效的两位数字");

//文件类型(image)验证
jQuery.validator.addMethod("img", function(value, element) {       
   	 var name = /\.(png|gif|jpg|jpeg)$/i;       
   	  return this.optional(element) || (name.test(value));      
	}, "请选择图片文件");

//文件命名规则验证
jQuery.validator.addMethod("filename", function(value, element) {       
   	 var name =  /^[^\/\\<>\*\?\:"\|]+$/;       
   	  return this.optional(element) || (name.test(value));      
	}, "文件名不能包含字符：\/:*? \"<>|");
//select options个数验证
jQuery.validator.addMethod("sel", function(value, element) {
	var len=element.options.length;
   	  return (len>0);      
	}, "个数不能为0");
//增加只能是字母和数字或下划线的验证         
jQuery.validator.addMethod("column", function(value, element) {         
    return this.optional(element) || (/^([a-zA-Z0-9_\.]+)$/.test(value));         
  }, "只能输入数字、字母和下划线");

//增加只能是字母下划线的验证         
jQuery.validator.addMethod("dataTable", function(value, element) {         
    return this.optional(element) || (/^([a-zA-Z_]+)$/.test(value));         
  }, "只能输入字母和下划线");

//增加只能是字母和数字或下划线或中文的验证         
jQuery.validator.addMethod("controlValue", function(value, element) {         
    return this.optional(element) || (/^([a-zA-Z0-9_\u4e00-\u9fa5]+)$/.test(value));         
  }, "只能输入数字、字母、下划线和中文");
//增加只能是小写字母和数字及下划线的验证         
jQuery.validator.addMethod("className", function(value, element) {         
  return this.optional(element) || (/^([a-z0-9_]+)$/.test(value));         
}, "只能输入数字、小写字母或者它们的组合");     
//特殊规则名称不能重复
jQuery.validator.addMethod("regexDup", function(value, element) {  
	var bool = false;
	$.ajax({
		url:basePath+"regex/isRegexExist.qc?time="+new Date(),
		data:{"className":value},
		async:false,
		type:"post",
		success:function(data){
			if(data.exist){
				bool = true;
			}
		}
	});
	return this.optional(element) || !bool;       
}, "规则名称已存在");  


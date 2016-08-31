package com.system.base.processors;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.io.Reader;
import java.lang.reflect.Proxy;
import java.util.List;


import org.hibernate.engine.jdbc.SerializableBlobProxy;
import org.hibernate.engine.jdbc.SerializableClobProxy;
import org.hibernate.transform.BasicTransformerAdapter;
import org.hibernate.transform.Transformers;
/**
 * @describe hibernate原生sql读取ORACLE CLOB 字段<br>
 * 修改历史[修改说明][修改人][修改时间]：
 * 
 * @author 张坤
 * @version 1.0 2015-04-03
 */
public class MapResultTransformer extends BasicTransformerAdapter {
	

	private static final long serialVersionUID = 3062575147253806990L;
	public static final MapResultTransformer MY_INSTANCE = new MapResultTransformer();
	
	public Object transformTuple(Object[] tuple, String[] aliases) {
		for (int i = 0; i < tuple.length; i++) {
			String alias = aliases[i];
			if (alias != null){
			if(tuple[i] != null && tuple[i] instanceof Proxy){
				try {
					Class clazz = (Class) Proxy.getInvocationHandler(tuple[i]).invoke(tuple[i], tuple[i].getClass().getMethod("getClass", null), null);
					System.out.println(clazz.equals(oracle.sql.CLOB.class));
					if(clazz.equals(oracle.sql.CLOB.class)||clazz.equals(net.sourceforge.jtds.jdbc.ClobImpl.class)){
						SerializableClobProxy clobProxy = (SerializableClobProxy) Proxy.getInvocationHandler(tuple[i]);
						tuple[i] = covertClobToString(clobProxy);
					}
					if(clazz.equals(oracle.sql.BLOB.class)){
						SerializableBlobProxy blobProxy = (SerializableBlobProxy) Proxy.getInvocationHandler(tuple[i]);
						tuple[i] = covertBlobToString(blobProxy);
					}
				} catch (IllegalArgumentException e) {
					e.printStackTrace();
				} catch (SecurityException e) {
					e.printStackTrace();
				} catch (NoSuchMethodException e) {
					e.printStackTrace();
				} catch (Throwable e) {
					e.printStackTrace();
				}
			}
			}
		}
		//转成大写
		String[] upperAliases=new String [aliases.length];
		for(int i=0;i<aliases.length;i++){
			upperAliases[i]=aliases[i].toUpperCase();
		}
		return Transformers.ALIAS_TO_ENTITY_MAP.transformTuple(tuple, upperAliases);
	}
	
	
	/**
	 * 将Clob字段转为String
	 * @param inTuple
	 * @return
	 */
	public String covertClobToString(SerializableClobProxy inTuple) {
		Reader reader=null;
		StringBuffer sb = new StringBuffer();
		try {
			reader = inTuple.getWrappedClob().getCharacterStream();
			char[] b = new char[60000];// 每次获取60K
			int i = 0;
			while ((i = reader.read(b)) != -1) {
				sb.append(b, 0, i);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}finally {  
            try {  
                if (reader != null) {  
                	reader.close();  
                }  
            } catch (Exception e) {}  
        }  
		return sb.toString();
	}

	/**
	 * 将Blob字段转为String
	 * @param inTuple
	 * @return
	 */
	public String covertBlobToString(SerializableBlobProxy inTuple){
		String result = "";
		try {
//			result = inTuple.getWrappedBlob().toString();
			InputStream msgContent =(InputStream) inTuple.getWrappedBlob().getBinaryStream();
			ByteArrayOutputStream arrayOutputStream = new ByteArrayOutputStream();
			byte[] byte_data = new byte[1024];
			int i = 0;
			while((i=msgContent.read(byte_data))!=-1){
				arrayOutputStream.write(byte_data,0,i);
			}
			msgContent.close();
//			msgContent.read(byte_data, 0,byte_data.length);
			result = new String(arrayOutputStream.toByteArray());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	
	@Override
	public List transformList(List list) {
		return Transformers.ALIAS_TO_ENTITY_MAP.transformList(list);
	}
}

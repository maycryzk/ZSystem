package com.system.base.utils;

import java.io.*;

/*******************************************************************************
 * 模块名：工具模块 <br>
 * 文件名：IOUtil.java <br>
 * 功能说明: 文件读取写入（提供字符流、字节流）<br>
 ******************************************************************************/
public final class IOUtil {

	/**
	 * 检测传入的文件格式是否为文本格式(txt)
	 * 
	 * @param filePath 文件路径
	 * @return boolean 是否为文本文件
	 */
	private static boolean checkTxt(String filePath) {
		String last = filePath.substring(filePath.lastIndexOf(".") + 1,
				filePath.length());
		if (last.equals("txt")) {
			return true;
		}
		return false;
	}

	
	/**
	 * 检测传入的文件是否存在，如果不存在，自动创建
	 * @param filePath  文件路径
	 */
	private static void checkFile(String filePath) {
		File file = new File(filePath);
		int index=filePath.lastIndexOf("//");
		if(index<0){
			index=filePath.lastIndexOf("/");
			if(index<0){
				index=filePath.lastIndexOf("\\");
			}
		}
		
		String mkr=filePath.substring(0,index);
		File mkFile=new File(mkr);
		if(mkFile.exists()==false){
			mkFile.mkdir();
		}
		if (file.exists() == false) {
			try {
				file.createNewFile();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

	/**
	 * 运用字符流读取指定文本格式(txt)数据
	 * 
	 * @param filePath 要读取的文件路径
	 * @return String 文本格式(txt)数据
	 */
	public static String read(String filePath) {
		checkFile(filePath);
		StringBuffer buffer = new StringBuffer();
		if (checkTxt(filePath)) {
			try {
				FileReader fr = new FileReader(filePath);
				BufferedReader br = new BufferedReader(fr);
				try {
					// int t=1;
					// while((t=fr.read())>-1){
					// char s=(char) t;
					// buffer.append(s);
					// }
					String c = "";
					while ((c = br.readLine()) != null) {
						buffer.append(c + "\r\n");
					}
				} catch (IOException e) {
					e.printStackTrace();
				} finally {
					try {
						br.close();
						fr.close();
					} catch (IOException e) {
						e.printStackTrace();
					}

				}
			} catch (FileNotFoundException e) {
				e.printStackTrace();
			}
		}
		return buffer.toString();
	}

	/**
	 * 运用字符流读取指定文本格式(txt)数据
	 * 
	 * @param filePath 要读取的文件
	 * @return String 文本格式(txt)数据
	 */
	public static String read(File file) {
		//checkFile(filePath);
		StringBuffer buffer = new StringBuffer();
		//if (checkTxt(filePath)) {
			try {
				FileReader fr = new FileReader(file);
				BufferedReader br = new BufferedReader(fr);
				try {
					// int t=1;
					// while((t=fr.read())>-1){
					// char s=(char) t;
					// buffer.append(s);
					// }
					String c = "";
					while ((c = br.readLine()) != null) {
						buffer.append(c + "\r\n");
					}
				} catch (IOException e) {
					e.printStackTrace();
				} finally {
					try {
						br.close();
						fr.close();
					} catch (IOException e) {
						e.printStackTrace();
					}

				}
			} catch (FileNotFoundException e) {
				e.printStackTrace();
			}
		//}
		return buffer.toString();
	}

	
	/**
	 * 运用字符流写入指定文本格式(txt)数据
	 * 
	 * @param filePath 要写入的文件路径
	 * @param content 文本格式(txt)数据
	 * @return  是否成功 
	 */
	public static boolean write(String filePath, String content) {
		checkFile(filePath);
		if (checkTxt(filePath)) {
			FileWriter fw = null;
			BufferedWriter bw = null;
			try {
				fw = new FileWriter(filePath);
				bw = new BufferedWriter(fw);
				bw.write(content);
			} catch (IOException e) {
				e.printStackTrace();
				return false;
			} finally {
				try {
					bw.close();
					fw.close();
				} catch (IOException e) {
					e.printStackTrace();
					return false;
				}
			}
		} else {
			return false;
		}
		return true;
	}

	/**
	 * 运用字节流读取指定格式(*)数据
	 * 
	 * @param filePath 要读取的文件路径
	 * @return byte[] 读取的文件数据
	 */
	public static byte[] input(String filePath) {
		checkFile(filePath);
		try {
			FileInputStream fis = new FileInputStream(filePath);
			BufferedInputStream bis = new BufferedInputStream(fis);
			try {
				byte[] bytes = new byte[bis.available()];
				while (bis.read(bytes) > -1) {
				}
				return bytes;
			} catch (IOException e) {
				e.printStackTrace();
			} finally {
				try {
					bis.close();
					fis.close();
				} catch (IOException e) {
					e.printStackTrace();
				}

			}
			
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
		return null;
	}
	
	/**
	 * 运用字节流读取指定格式(*)数据
	 * 
	 * @param file 要读取的文件
	 * @return byte[] 读取的文件数据
	 */
	public static byte[] input(File file) {
		try {
			FileInputStream fis = new FileInputStream(file);
			BufferedInputStream bis = new BufferedInputStream(fis);
			try {
				byte[] bytes = new byte[bis.available()];
				while (bis.read(bytes) > -1) {
				}
				return bytes;
			} catch (IOException e) {
				e.printStackTrace();
			} finally {
				try {
					bis.close();
					fis.close();
				} catch (IOException e) {
					e.printStackTrace();
				}

			}
			
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
		return null;
	}
	

	/**
	 * 运用字节流写入指定格式(*)数据
	 * @param filePath 写入文件路径
	 * @param bytes 要写入的数据
	 * @return  是否成功
	 */
	public static boolean output(String filePath, byte[] bytes) {
		checkFile(filePath);
		try {
			FileOutputStream fos=new FileOutputStream(filePath);
			BufferedOutputStream bos=new BufferedOutputStream(fos);
			try {
				bos.write(bytes);
			} catch (IOException e) {
				e.printStackTrace();
				return false;
			}finally{
				try {
					bos.close();
					fos.close();
				} catch (IOException e) {
					e.printStackTrace();
					return false;
				}
			}
		} catch (FileNotFoundException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
}

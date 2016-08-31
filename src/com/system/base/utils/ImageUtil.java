package com.system.base.utils;

import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.Transparency;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

import javax.imageio.ImageIO;

import sun.misc.BASE64Encoder;

/** 
 * 图片压缩工具类 
 */  
public class ImageUtil { 
	          
    /** 
     * 图片文件读取 
     */
	public static String getImageStr(String imgFile) {// 将图片文件转化为字节数组字符串，并对其进行Base64编码处理
		//String imgFile = "d:\\111.jpg";// 待处理的图片
		InputStream in = null;
		byte[] data = null;
		// 读取图片字节数组
		try {
		in = new FileInputStream(imgFile);
		data = new byte[in.available()];
		in.read(data);
		in.close();
		} catch (IOException e) {
		e.printStackTrace();
		}
		// 对字节数组Base64编码
		BASE64Encoder encoder = new BASE64Encoder();
		return encoder.encode(data);// 返回Base64编码过的字节数组字符串
		}
    private static BufferedImage InputImage(String srcImgPath) {  
        BufferedImage srcImage = null;  
        try {  
            FileInputStream in = new FileInputStream(srcImgPath);  
            srcImage = javax.imageio.ImageIO.read(in);  
        } catch (IOException e) {  
            System.out.println("读取图片文件出错！" + e.getMessage());  
            e.printStackTrace();  
        }  
        return srcImage;  
    }  
  
    /** 
     *  将图片按照指定的图片尺寸压缩 
     *   @param srcImgPath :源图片路径 * 
     *   @param outImgPath :输出的压缩图片的路径 
     *   @param new_w * :压缩后的图片宽 
     *   @param new_h * :压缩后的图片高 
     */  
    public static void compressImage(String srcImgPath, String outImgPath,  
            int new_w, int new_h) {  
        BufferedImage src = InputImage(srcImgPath);  
        disposeImage(src, outImgPath, new_w, new_h);  
    }  
  
    /** 
     * 指定长或者宽的最大值来压缩图片
     * @param srcImgPath :源图片路径
     * @param outImgPath :输出的压缩图片的路径 
     * @param maxLength  :长或者宽的最大值 
     */  
    public static void compressImage(String srcImgPath, String outImgPath,  
            int maxLength) {  
        // 得到图片  
        BufferedImage src = InputImage(srcImgPath);  
        if (null != src) {  
            int old_w = src.getWidth();  
            // 得到源图宽  
            int old_h = src.getHeight();  
            // 得到源图长  
            int new_w = 0;  
            // 新图的宽  
            int new_h = 0;  
            // 新图的长  
            // 根据图片尺寸压缩比得到新图的尺寸  
            if (old_w > old_h) {  
                // 图片要缩放的比例  
                new_w = maxLength;  
                new_h = (int) Math.round(old_h * ((float) maxLength / old_w));  
            } else {  
                new_w = (int) Math.round(old_w * ((float) maxLength / old_h));  
                new_h = maxLength;  
            }  
            disposeImage(src, outImgPath, new_w, new_h);  
        }  
    }  
  
    /** * 处理图片 * * @param src * @param outImgPath * @param new_w * @param new_h */  
    private synchronized static void disposeImage(BufferedImage src,  
            String outImgPath, int new_w, int new_h) {  
    	boolean isBackPixel = false;
        // 得到图片  
        int old_w = src.getWidth();  
        // 得到源图宽  
        int old_h = src.getHeight();  
        // 得到源图长  
        BufferedImage newImg =  new BufferedImage(new_w, new_h, BufferedImage.TYPE_INT_RGB); 
         
        for(int i=0;i<old_w;i++){
        	for(int j=0;j<old_h;j++){
        		int rgb=src.getRGB(i, j);
        		if(isBackPixel(rgb)){
        			isBackPixel=true;
        		}
        	}
        }
        if(isBackPixel){
        	Graphics2D g = newImg.createGraphics();  
        	newImg=g.getDeviceConfiguration().createCompatibleImage(new_w, new_h,Transparency.TRANSLUCENT);
        	g.dispose();
        	g=newImg.createGraphics();
		  
        	Image from = src.getScaledInstance(new_w, new_h, src.SCALE_AREA_AVERAGING);
        	g.drawImage(from, 0,0,null);
        	g.dispose();
        }else{
        	Image from = src.getScaledInstance(new_w, new_h,Image.SCALE_DEFAULT);
            Graphics g = newImg.getGraphics();
            g.drawImage(from, 0, 0, null); // 绘制缩小后的图
            g.dispose();
        }
        
      
        OutImage(outImgPath, newImg);  
    }  
    private static boolean isBackPixel(int pixel){  
       return (pixel>>24)==0;
    }
    /** 
     * 将图片文件输出到指定的路径，并可设定压缩质量  
     * @param outImgPath  
     * @param newImg 
     */  
    private static void OutImage(String outImgPath, BufferedImage newImg) {  
        // 判断输出的文件夹路径是否存在，不存在则创建  
        File file = new File(outImgPath);  
        if (!file.getParentFile().exists()) {  
            file.getParentFile().mkdirs();  
        }// 输出到文件流  
        try {  
//            ImageIO.write(newImg, outImgPath.substring(outImgPath  
//                    .lastIndexOf(".") + 1), new File(outImgPath)); 
            ImageIO.write(newImg, "png", new File(outImgPath));
        } catch (FileNotFoundException e) {  
            e.printStackTrace();  
        } catch (IOException e) {  
            e.printStackTrace();  
        }  
    }  
}  
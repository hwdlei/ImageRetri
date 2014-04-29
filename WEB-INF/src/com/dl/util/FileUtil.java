package com.dl.util;

import java.io.File;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;

public class FileUtil {
	public static void getAllImage(File file, List<File> imgs){
		if(!file.exists()){
			System.out.println("图像路径不存在！");
			System.exit(1);
		}
		if(file.isFile()){
			imgs.add(file);
			//System.out.println(file.getPath());
		}
		if(file.isDirectory()){
			File[] temp = file.listFiles();
			for(int i = 0; i < temp.length;i++){
				getAllImage(temp[i],imgs);			
			}			
		}		
	}
	public static void main(String args[]){
		String f = "C:\\Users\\donglei\\Desktop\\study\\design_of_graduation\\pictures\\256_ObjectCategories";
//		String f = "C:\\Users\\donglei\\Desktop\\study\\design_of_graduation\\pictures\\partitions";
//		String f = "C:\\Users\\donglei\\Desktop\\study\\design_of_graduation\\pictures\\initfeatures";
		File file = new File(f);
		LinkedList<File> imgs = new LinkedList<File>();
		getAllImage(file, imgs);
		Iterator<File> it = imgs.iterator();
		int i = 0;
		while(it.hasNext()){
			File tmp = it.next();
			if(tmp.length() > 1000000){
				System.out.println(tmp.getPath() + tmp.length());
				i++;
			}
		}
		System.out.println(imgs.size());
		System.out.println("大图片的个数： " + i);
		
		
	}

}

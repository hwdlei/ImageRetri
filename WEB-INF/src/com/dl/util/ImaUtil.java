package com.dl.util;
import java.awt.image.BufferedImage;  
import java.io.ByteArrayInputStream;  
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream; 
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.util.Iterator;
import java.util.LinkedList;
  
import javax.imageio.ImageIO;  
import javax.swing.ImageIcon;  
import javax.swing.JFrame;  
import javax.swing.JLabel;  
  
import org.opencv.core.Mat;  
import org.opencv.core.MatOfByte;  
import org.opencv.highgui.Highgui;  

import com.dl.testsift.ImaInfo;
public class ImaUtil {
	 public static void showResult(Mat img) {  
	        //Imgproc.resize(img, img, new Size(640, 480));  
	        MatOfByte matOfByte = new MatOfByte();  
	        Highgui.imencode(".jpg", img, matOfByte);  
	        byte[] byteArray = matOfByte.toArray();  
	        BufferedImage bufImage = null;  
	        try {  
	            InputStream in = new ByteArrayInputStream(byteArray);  
	            bufImage = ImageIO.read(in);  
	            JFrame frame = new JFrame();  
	            frame.getContentPane().add(new JLabel(new ImageIcon(bufImage)));  
	            frame.pack();  
	            frame.setVisible(true);  
	        } catch (Exception e) {  
	            e.printStackTrace();  
	        }  
	    } 

	public static LinkedList<ImaInfo> readImaInfo() {
		LinkedList<ImaInfo> imas = new LinkedList<ImaInfo>();
		System.out.println("read objects ...");
		File test = new File("F:\\graduation\\output\\bows.tmp");
		if(!test.exists())
			System.out.println("文件访问不到！！");
		ObjectInputStream ois = null;
		int i = 1;
		try {
			
			ois = new ObjectInputStream(
					new FileInputStream("F:\\graduation\\output\\bows.tmp"));
			while(true){
				System.out.println("read objects ..." + i);
				ImaInfo ima = (ImaInfo)ois.readObject();
				imas.add(ima);
				i++;
			}
		}catch (Exception e) {
			//e.printStackTrace();
		} finally {
			try {
				ois.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return imas;

	}
	 
	public static long writeImainfo(LinkedList<ImaInfo> imainfos) {
		if (imainfos == null) {
			throw new IllegalStateException("Imainfos is not ready!");
		}
		long i = 0;
		ObjectOutputStream oos = null;
		try {
			oos = new ObjectOutputStream(new FileOutputStream("F:\\graduation\\output\\bows.tmp"));
			Iterator<ImaInfo> iterator = imainfos.iterator();
			while(iterator.hasNext()){
				oos.writeObject(iterator.next());
				i++;
			}
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				oos.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return i;

	}
	
}

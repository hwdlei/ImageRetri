package com.dl.testsift;

import java.io.*;
import java.util.LinkedList;

public class Temp {

	public static void main(String[] args) {
		
//		BufferedWriter dos = null;
//		try {
//			
//			dos = new BufferedWriter(new FileWriter("F:\\test.txt",true));
////			for(int j = 0;j <128;j++){
//				for(int i = 0;i < 10;i++){
//					dos.write("helloworld!!   " + i);
//					dos.newLine();
//					
//				}
////			
////			}
//			
//		} catch (Exception e) {
//			e.printStackTrace();
//		}finally{
//			try {
//				dos.close();
//			} catch (IOException e) {
//				// TODO 自动生成的 catch 块
//				e.printStackTrace();
//			}
//			
//		}
		LinkedList<Integer> in = new LinkedList<Integer>();
		in.add(new Integer(0));
		in.add(new Integer(1));
		in.add(new Integer(2));
		in.add(new Integer(3));
		System.out.println(in);
		System.out.println(in.size());
		in.add(4, new Integer(4));
		System.out.println(in);
		in.removeLast();
		System.out.println(in);
		

	}

}

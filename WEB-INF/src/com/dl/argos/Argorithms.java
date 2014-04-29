package com.dl.argos;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import com.dl.testsift.ImaInfo;
import com.dl.util.MathUtil;



public class Argorithms {
	public static LinkedList<ImaCount> topN(List<ImaInfo> imainfos,double[] curCounts,int N){
		Iterator<ImaInfo> itera = imainfos.iterator();
		LinkedList<ImaCount> list = new LinkedList<ImaCount>();
		while(itera.hasNext()){
			ImaInfo curima = itera.next();
			double[] counts = curima.getBowCounts();
			double dist = MathUtil.euclideanDistance(curCounts, counts);
			ImaCount ic = new ImaCount();
			ic.setPath(curima.getPath());
			ic.setDist(dist);
			int s = list.size();
			if(s == 0){
				list.add(ic);
			}else if(s < N){
				int i = 0;
				for (i =0; i < s; i++){
					if(dist < list.get(i).getDist()){
						break;
					}
				}
				list.add(i, ic);
				
			}else{
				int i = 0;
				for (i =0; i < s; i++){
					if(dist < list.get(i).getDist()){
						break;
					}
				}
				if(i < s){
					list.add(i, ic);
					list.removeLast();
				}
				
			}
		}
		return list;
		
		
	}
	public static List<String> getFilePath(List<ImaCount> list){
		List<String> filepaths = new ArrayList<String>(20);
		Iterator<ImaCount> ite = list.iterator();
		while(ite.hasNext()){
			filepaths.add(ite.next().getPath());
		}
		return filepaths;
		
	}
	public static void printList(List<String> list){
		Iterator<String> ite = list.iterator();
		while(ite.hasNext()){
			System.out.println(ite.next());
		}
		
	}

}

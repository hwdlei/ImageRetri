package com.dl.kmeans;

import java.util.ArrayList;
import java.util.List;

import org.opencv.core.Mat;

public class MatConvert {
	public static List<double[]> toArrayDouble(Mat mat){
//		if( mat.empty()){
//	            throw new IllegalArgumentException("Incompatible Mat");
//		}
		List<double[]> list = new ArrayList<double[]>();
		int cols = mat.cols();     
		int rows = mat.rows();
		for(int i = 0;i < rows;i++){
			double[] tmp = new double[cols];
			for(int j = 0;j < cols;j++){
				tmp[j] = mat.get(i, j)[0];
			}
			list.add(tmp);
		}
		mat.release();
		return list;	
	}
	

}

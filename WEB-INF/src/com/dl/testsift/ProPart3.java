package com.dl.testsift;

import org.opencv.core.Core;
import org.opencv.core.Mat;
import org.opencv.core.MatOfKeyPoint;
import org.opencv.highgui.Highgui;
import org.opencv.features2d.*;

import com.dl.argos.Argorithms;
import com.dl.argos.ImaCount;
import com.dl.kmeans.BagOfWords;
import com.dl.kmeans.MatConvert;
import com.dl.util.ImaUtil;
import com.dl.util.MathUtil;

import java.io.File;
import java.util.*;
public class ProPart3{
	public static List<String> searchResullt(List<ImaInfo> imainfos, String searchFile){
		System.loadLibrary(Core.NATIVE_LIBRARY_NAME);
		FeatureDetector detector = FeatureDetector.create(FeatureDetector.SIFT);
		DescriptorExtractor decriptor_extractor = DescriptorExtractor
				.create(DescriptorExtractor.SIFT);
		if (detector.empty() || decriptor_extractor.empty())
			System.out.println("Fail to create detector!");
		
		//File f = new File(searchFile);
		//LinkedList<ImaInfo> imainfos = ImaUtil.readImaInfo();
		System.out.println(imainfos.size());
		BagOfWords bow = new BagOfWords(128);
		Mat img = Highgui.imread(searchFile);
		// 特征点检测
		MatOfKeyPoint keypoints = new MatOfKeyPoint();
		// 检测img中的Sift特征点，存储在keypoints中
		detector.detect(img, keypoints);
		//图像描述子矩阵
		Mat descriptors = new Mat();
		decriptor_extractor.compute(img, keypoints, descriptors);
		//System.out.println(descriptors.rows());
		List<double[]> result = MatConvert.toArrayDouble(descriptors);
		int[] curBowCounts = bow.computeBow(result);
		double[] norCurBowCounts = MathUtil.normalize(curBowCounts);
		LinkedList<ImaCount> list = Argorithms.topN(imainfos, norCurBowCounts, 20);
		List<String> filepaths = Argorithms.getFilePath(list);
		return filepaths;
	}
	
	public static void main(String[] args) {
		List<ImaInfo> imainfos = ImaUtil.readImaInfo();
		List<String> list = searchResullt(imainfos,"F:\\257_0004.jpg");
		Argorithms.printList(list);
	}
}
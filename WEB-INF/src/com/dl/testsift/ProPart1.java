package com.dl.testsift;

import org.opencv.core.Core;
import org.opencv.core.Mat;
import org.opencv.core.MatOfKeyPoint;
import org.opencv.highgui.Highgui;
import org.opencv.features2d.*;

import com.dl.kmeans.MatConvert;
import com.dl.util.FileUtil;
import java.io.File;
import java.util.*;
import com.dl.kmeans.KMeans;
public class ProPart1{
	
	public static void main(String[] args) {
		System.loadLibrary(Core.NATIVE_LIBRARY_NAME);
		FeatureDetector detector = FeatureDetector.create(FeatureDetector.SIFT);
		DescriptorExtractor decriptor_extractor = DescriptorExtractor
				.create(DescriptorExtractor.SIFT);
		if (detector.empty() || decriptor_extractor.empty())
			System.out.println("Fail to create detector!");
		File path = new File("pictures\\initfeatures");
//		File path = new File("F:\\photos");
		List<File> imgs = new LinkedList<File>();
		FileUtil.getAllImage(path, imgs);
		// �洢���е���������
		Mat mfeatures = new Mat();
		int num = 0;
		for(int i = 0;i < imgs.size();i++){
			File cur_file = imgs.get(i);
			// ����ͼ��
			Mat img = Highgui.imread(cur_file.getPath());
			// ��������
			MatOfKeyPoint keypoints = new MatOfKeyPoint();
			// ���img�е�Sift�����㣬�洢��keypoints��
			detector.detect(img, keypoints);
			//ͼ�������Ӿ���
			Mat descriptors = new Mat();
			decriptor_extractor.compute(img, keypoints, descriptors);
			num += descriptors.rows();
			//System.out.println(descriptors.rows());
			mfeatures.push_back(descriptors);
		}
		
		List<double[]> result = MatConvert.toArrayDouble(mfeatures);
		System.out.println("�������������� " + result.size() + ", ά��" + result.get(0).length);
		System.out.println(num);
		long startTime=System.currentTimeMillis(); 
		KMeans kmean = new KMeans(128);
		for(int i = 0;i < result.size();i++){
			if(kmean.isReady())
				break;
			kmean.initIfPossible(result.get(i));
			System.out.println("��ʼ���� ...");
		}
		kmean.setFeatures(result);
		kmean.cluster();
		long endTime=System.currentTimeMillis(); 
		System.out.println("��������ʱ�䣺 "+(endTime-startTime)+"ms");
		
	}
}
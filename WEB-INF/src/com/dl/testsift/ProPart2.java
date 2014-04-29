package com.dl.testsift;

import org.opencv.core.Core;
import org.opencv.core.Mat;
import org.opencv.core.MatOfKeyPoint;
import org.opencv.highgui.Highgui;
import org.opencv.features2d.*;
import com.dl.kmeans.BagOfWords;
import com.dl.kmeans.MatConvert;
import com.dl.util.FileUtil;
import com.dl.util.ImaUtil;
import com.dl.util.MathUtil;

import java.io.File;
import java.util.*;
import com.dl.kmeans.KMeans;
public class ProPart2{
	
	public static void main(String[] args) {
		File solfile = new File("output\\bows.tmp");
		if(solfile.exists())
			solfile.delete();
		System.loadLibrary(Core.NATIVE_LIBRARY_NAME);
		FeatureDetector detector = FeatureDetector.create(FeatureDetector.SIFT);
		DescriptorExtractor decriptor_extractor = DescriptorExtractor
				.create(DescriptorExtractor.SIFT);
		if (detector.empty() || decriptor_extractor.empty())
			System.out.println("Fail to create detector!");
		File path = new File("pictures\\256_ObjectCategories");
//		File path = new File("F:\\photos");
		List<File> imgs = new LinkedList<File>();
		FileUtil.getAllImage(path, imgs);
		LinkedList<ImaInfo> imainfos = new LinkedList<ImaInfo>();
		BagOfWords bow = new BagOfWords(128);
		int i = 0;
		long size = imgs.size();
		System.out.println(size);
		
		for(i = 0;i < size;i++){
			System.out.println("��  " + (i+1) + "��ͼƬ");
			ImaInfo ima =  new ImaInfo();
			int[] curBowCounts;
			double[] norCurBowCounts;
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
			//System.out.println(descriptors.rows());
			List<double[]> result = MatConvert.toArrayDouble(descriptors);
			curBowCounts = bow.computeBow(result);
			norCurBowCounts = MathUtil.normalize(curBowCounts);
			ima.setPath(cur_file.getPath());
			ima.setBowCounts(norCurBowCounts);
			imainfos.add(ima);
			
			// �ͷ���Դ
			result.clear();
			img.release();
			keypoints.release();
			descriptors.release();
			
//			if((i+1) % 1000 == 0){
//				Long num = ImaUtil.writeImainfo(imainfos);
//				System.out.println("��������� " + num + "Ԫ��");
//				imainfos.clear();
//				
//			}
			
			
		}
		Long num = ImaUtil.writeImainfo(imainfos);
		System.out.println("��������� " + num + "Ԫ��");
		imainfos.clear();
		System.out.println(i);
		
		
		
	}
}
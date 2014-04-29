package com.dl.testsift;
import org.opencv.core.Core;
import org.opencv.core.Mat;
import org.opencv.core.MatOfByte;
import org.opencv.core.MatOfDMatch;
import org.opencv.core.MatOfKeyPoint;
import org.opencv.core.Scalar;
import org.opencv.highgui.Highgui;
import org.opencv.features2d.*;

import com.dl.util.ImaUtil;

import java.util.*;
import java.io.IOException;
public class Main{
	public static void main(String[] args) {
		System.loadLibrary(Core.NATIVE_LIBRARY_NAME);
		FeatureDetector detector = FeatureDetector.create(FeatureDetector.SIFT);
		DescriptorExtractor decriptor_extractor = DescriptorExtractor
				.create(DescriptorExtractor.SIFT);
		DescriptorMatcher decriptor_matcher = DescriptorMatcher
				.create(DescriptorMatcher.BRUTEFORCE_SL2);
		if (detector.empty() || decriptor_extractor.empty())
			System.out.println("Fail to create detector!");
		// 读入图像
		Mat img1 = Highgui.imread("C:\\Users\\donglei\\Desktop\\study\\design_of_graduation\\Coding\\pictures\\256_ObjectCategories\\241.waterfall\\241_0093.jpg");
		System.out.println(img1.toString());
		Mat img2 = Highgui.imread("F:\\001_0002x.jpg");
		// 特征点检测
		MatOfKeyPoint keypoints1 = new MatOfKeyPoint();
		MatOfKeyPoint keypoints2 = new MatOfKeyPoint();
		// 检测img中的Sift特征点，存储在keypoints中
		detector.detect(img1, keypoints1);
		detector.detect(img2, keypoints2);
		
		System.out.println(keypoints1.toString());
		System.out.println("图像1特征点个数： " + keypoints1.size());
		System.out.println("图像2特征点个数： " + keypoints2.size());
		Mat descriptors1 = new Mat();
		Mat descriptors2 = new Mat();

		decriptor_extractor.compute(img1, keypoints1, descriptors1);
		decriptor_extractor.compute(img2, keypoints2, descriptors2);
		
		System.out.println("图像1特征描述矩阵大小： " + descriptors1.size() + ": 特征向量个数： "
				+ descriptors1.rows() + ", 维数" + descriptors1.cols());
		System.out.println("图像2特征描述矩阵大小： " + descriptors2.size() + ": 特征向量个数： "
				+ descriptors2.rows() + ", 维数" + descriptors2.cols());

		Mat img_keypoints1 = new Mat();
		Mat img_keypoints2 = new Mat();
		Features2d.drawKeypoints(img1, keypoints1, img_keypoints1);
		Features2d.drawKeypoints(img2, keypoints2, img_keypoints2);
		ImaUtil.showResult(img_keypoints1);
		ImaUtil.showResult(img_keypoints2);
		
		// 特征匹配
		MatOfDMatch matches = new MatOfDMatch();
		decriptor_matcher.match(descriptors1, descriptors2, matches);
		System.out.println("Match个数： " + matches.toList().size());
		System.out.println("MatOfDMatch： " + matches);

		// 计算匹配结果中距离的最大和最小值
		// 距离是指两个特征向量间的欧式距离，表明两个特征的差异，值越小表明两个特征点越接近
		double max_dist = 0;
		double min_dist = 100;
		DMatch[] tempDMath = matches.toArray();
		for (int i = 0; i < tempDMath.length; i++) {
			double dist = tempDMath[i].distance;
			if (dist < min_dist)
				min_dist = dist;
			if (dist > max_dist)
				max_dist = dist;
		}
		System.out.println("最大距离： " + max_dist);
		System.out.println("最小距离： " + min_dist);
		Vector<DMatch> goodMatches = new Vector<DMatch>();
		for (int i = 0; i < tempDMath.length; i++) {
			if (tempDMath[i].distance < 0.2 * max_dist) {
				goodMatches.add(tempDMath[i]);
			}
		}
		Mat output = new Mat();
		MatOfDMatch out = new MatOfDMatch();
		out.fromList(goodMatches);
		System.out.println("goodMatch个数：" + goodMatches.size());
		Features2d.drawMatches(img1, keypoints1, img2, keypoints2, out, output);
		ImaUtil.showResult(output);
		try {
			System.out.println(System.in.read());
		} catch (IOException e) {
			e.printStackTrace();
		}
		System.exit(0);
		
		

	}
}
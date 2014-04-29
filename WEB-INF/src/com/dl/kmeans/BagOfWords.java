package com.dl.kmeans;

import java.util.List;
public class BagOfWords {
	// 存储bag of word特征向量
	private int[] bowCounts = null;
	private KMeans kmeans = null;
	private Integer nCluster;
	public BagOfWords(Integer nbCluster){
		this.nCluster = nbCluster;
		kmeans = new KMeans(nbCluster);
		kmeans.getCentroidsFromFile();
	}
	
	public int[] computeBow(List<double[]> features){

		bowCounts = new int[nCluster];
		for (int i = 0; i < nCluster; i++) {
			bowCounts[i] = 0;
		}
		if(features.size() == 0)
			return bowCounts;
		for(int m = 0;m < features.size(); m++){
			double[] currentFeatures = features.get(m);
			int centroidIndex = kmeans.nearestCentroid(currentFeatures);
			//System.out.println("簇中心： " + centroidIndex);
			this.bowCounts[centroidIndex]++;
		}
		return bowCounts;
	}
	
	public int[] getBowCounts() {
		return bowCounts;
	}
	
}

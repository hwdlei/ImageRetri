package com.dl.kmeans;

import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import com.dl.util.MathUtil;

public class KMeans implements Clusterer, Serializable {

	private static final long serialVersionUID = 338231277453149972L;
	// ��¼ÿ��������ĵĸ���
	private List<Integer> counts = null;	
	// �洢������������
	private double[][] centroids;
	// �洢���������������
	private List<double[]> initFeatures = new ArrayList<double[]>();
	// �洢���������������
	private List<double[]> features = null;
	// ����������
	private Integer nbCluster;
	// �������ı�����ļ�
	private String fpath = "F:\\graduation\\output\\centroids.tmp";

	public KMeans(Integer nbCluster) {
		this.nbCluster = nbCluster;
	}
	
	public void setFeatures(List<double[]> imgFeatures){
		this.features = imgFeatures;
	}
	
	public void cluster(){
		if(features == null){
			throw new IllegalStateException("cluster features is null!");
		}
		// ���������ĳ���
		int  length = features.get(0).length;
		// ��ʱ�ľ�������
		double[][] tempcentroid = null;
		// ��������
		int itera = 1;
		
		while(itera <= 80){
			System.out.println("�� " + itera + " ����");
			tempcentroid = new double[nbCluster][length];
			// ÿ�ε�����Ҫ����ÿ���ص�Ԫ�ظ���
			this.counts.clear();
			for (int i = 0; i < this.nbCluster; i++) {
				this.counts.add(0);
			}
			// ��ʼ����������
			for(int i = 0;i < tempcentroid.length;i++)
				for(int j = 0;j < tempcentroid[i].length;j++)
					tempcentroid[i][j] = 0;
			System.out.println("�������������� " + features.size());
			for(int m = 0;m < features.size(); m++){
				double[] currentFeatures = features.get(m);
				int centroidIndex = this.classify(currentFeatures);
				//System.out.println("�����ģ� " + centroidIndex);
				this.counts.set(centroidIndex, counts.get(centroidIndex) + 1);
				tempcentroid[centroidIndex] = MathUtil.add(tempcentroid[centroidIndex], currentFeatures);
			}
			for(int i = 0;i <this.nbCluster;i++){
				if(this.counts.get(i) == 0){
					System.out.println("һ��Ԫ�ض�û�У�");
				}else{
					tempcentroid[i] = MathUtil.mult(tempcentroid[i], 1.0 / this.counts.get(i));
				}
			}
			System.out.println(MathUtil.distanceMoved(centroids, tempcentroid));
			//���´�����
			for(int i = 0;i <this.nbCluster;i++){
				centroids[i] = tempcentroid[i];
			}
			itera++;			
		}
		this.writeCentroids();
		
	}
	public void getCentroidsFromFile(){
		if(!new File(fpath).exists())
			throw new IllegalStateException("Centroids is not genetated!");
		int siftLength = 128;
		centroids = new double[nbCluster][siftLength];
		DataInputStream dis = null;
		try {
			dis = new DataInputStream(new FileInputStream(fpath));
			for (int i = 0; i < centroids.length; i++)
				for (int j = 0; j < centroids[i].length; j++)
					centroids[i][j] = dis.readDouble();
		} catch (FileNotFoundException e) {
			// TODO �Զ����ɵ� catch ��
			e.printStackTrace();
		} catch (IOException e) {
			// TODO �Զ����ɵ� catch ��
			e.printStackTrace();
		}finally{
			try {
				dis.close();
			} catch (IOException e) {
				// TODO �Զ����ɵ� catch ��
				e.printStackTrace();
			}
		}
		
	}
	public void writeCentroids(){
		if(centroids == null){
			throw new IllegalStateException("KMeans is not ready yet");
		}
		DataOutputStream dos = null;
		try {
			dos= new DataOutputStream(new FileOutputStream(fpath));
			for(int i = 0;i < centroids.length;i++)
				for(int j = 0;j < centroids[i].length;j++)
					dos.writeDouble(centroids[i][j]);
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}finally{
			try {
				dos.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		
	}
	
	
	// �Ը�����������࣬���ط��������±�
	@Override
	public Integer classify(double[] features) {
		if (!this.isReady()) {
			throw new IllegalStateException("KMeans is not ready yet");
		}

		// Find nearest centroid
		Integer nearestCentroidIndex = this.nearestCentroid(features);
		return nearestCentroidIndex;
	}
	// �Ը�����������࣬�����¶�Ӧ������
	@Override
	public Integer update(double[] features) {
		if (!this.isReady()) {
			this.initIfPossible(features);
			return null;
		} else {
			Integer nearestCentroid = this.classify(features);

			// Increment count
			this.counts.set(nearestCentroid, this.counts.get(nearestCentroid) + 1);

			// Move centroid
			double[] update = MathUtil.mult(MathUtil.subtract(features, this.centroids[nearestCentroid]), 1.0 / this.counts.get(nearestCentroid));
			this.centroids[nearestCentroid] = MathUtil.add(this.centroids[nearestCentroid], update);

			return nearestCentroid;
		}
	}
	// ���㷵�ظ��������㵽�������ĵ��ŷʽ����
	@Override
	public double[] distribution(double[] features) {
		if (!this.isReady()) {
			throw new IllegalStateException("KMeans is not ready yet");
		}

		double[] distribution = new double[this.nbCluster];
		double[] currentCentroid;
		for (int i = 0; i < this.nbCluster; i++) {
			currentCentroid = this.centroids[i];
			distribution[i] = MathUtil.euclideanDistance(currentCentroid, features);
		}

		return distribution;
	}
	
	// ��ô�����
	@Override
	public double[][] getCentroids() {
		return this.centroids;
	}
	
	// ��������Ĵ������±�
	protected Integer nearestCentroid(double[] features) {
		// Find nearest centroid
		Integer nearestCentroidIndex = 0;

		Double minDistance = Double.MAX_VALUE;
		double[] currentCentroid;
		Double currentDistance;
		for (int i = 0; i < this.centroids.length; i++) {
			currentCentroid = this.centroids[i];
			if (currentCentroid != null) {
				currentDistance = MathUtil.euclideanDistance(currentCentroid, features);
				if (currentDistance < minDistance) {
					minDistance = currentDistance;
					nearestCentroidIndex = i;
				}
			}
		}

		return nearestCentroidIndex;
	}
	
	// Kmeans�����Ƿ��ʼ��
	public boolean isReady() {
		boolean countsReady = this.counts != null;
		boolean centroidsReady = this.centroids != null;
		return countsReady && centroidsReady;
	}
	
	public void initIfPossible(double[] features) {
		this.initFeatures.add(features);

		// magic number : 10 ??!
		if (this.initFeatures.size() >= 10 * this.nbCluster) {
			this.initCentroids();
		}
	}

	/**
	 * Init clusters using the k-means++ algorithm. (Arthur, D. and
	 * Vassilvitskii, S. (2007). "k-means++: the advantages of careful seeding".
	 * 
	 */
	protected void initCentroids() {
		// Init counts
		this.counts = new ArrayList<Integer>(this.nbCluster);
		for (int i = 0; i < this.nbCluster; i++) {
			this.counts.add(0);
		}

		this.centroids = new double[this.nbCluster][];

		Random random = new Random();

		// Choose one centroid uniformly at random from among the data points.
		final double[] firstCentroid = this.initFeatures.remove(random.nextInt(this.initFeatures.size()));
		this.centroids[0] = firstCentroid;

		double[] dxs;

		for (int j = 1; j < this.nbCluster; j++) {
			// For each data point x, compute D(x)
			dxs = this.computeDxs();

			// Add one new data point as a center.
			double[] features;
			double r = random.nextDouble() * dxs[dxs.length - 1];
			for (int i = 0; i < dxs.length; i++) {
				if (dxs[i] >= r) {
					features = this.initFeatures.remove(i);
					this.centroids[j] = features;
					break;
				}
			}
		}
		System.out.println("��ʼ����������ɣ�");
		this.initFeatures.clear();
	}

	/**
	 * For each features in {@link KMeans#initFeatures}, compute D(x), the
	 * distance between x and the nearest center that has already been chosen.
	 * 
	 * @return
	 */
	protected double[] computeDxs() {
		double[] dxs = new double[this.initFeatures.size()];

		int sum = 0;
		double[] features;
		int nearestCentroidIndex;
		double[] nearestCentroid;
		for (int i = 0; i < this.initFeatures.size(); i++) {
			features = this.initFeatures.get(i);
			nearestCentroidIndex = this.nearestCentroid(features);
			nearestCentroid = this.centroids[nearestCentroidIndex];
			sum += Math.pow(MathUtil.euclideanDistance(features, nearestCentroid), 2);
			dxs[i] = sum;
		}
		return dxs;
	}
	
	@Override
	public void reset() {
		this.counts = null;
		this.centroids = null;
		this.initFeatures = new ArrayList<double[]>();
	}
}

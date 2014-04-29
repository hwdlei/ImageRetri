package com.dl.kmeans;

import java.util.List;

public interface Clusterer {

	/**
	 * Classifies a given sample and updates clusters.
	 */
	Integer classify(double[] features);

	/**
	 * Updates clusters with a given sample and return classification.
	 */
	Integer update(double[] features);

	/**
	 * Predicts the cluster memberships for a given instance.
	 */
	double[] distribution(double[] features);

	/**
	 * Returns learned clusters as a {@link List} of feature's means
	 */
	double[][] getCentroids();
	
	void reset();
}

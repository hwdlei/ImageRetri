package com.dl.testsift;

import java.io.Serializable;

@SuppressWarnings("serial")
public class ImaInfo implements Serializable{

	public String getPath() {
		return path;
	}
	public void setPath(String path) {
		this.path = path;
	}
	public double[] getBowCounts() {
		return bowCounts;
	}
	public void setBowCounts(double[] bowCounts) {
		this.bowCounts = bowCounts;
	}
	private String path;
	private double[] bowCounts;
	
}

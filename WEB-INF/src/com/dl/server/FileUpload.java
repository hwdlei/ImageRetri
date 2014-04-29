package com.dl.server;


import java.io.File;
import java.io.IOException;
import java.io.PrintStream;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import com.dl.argos.Argorithms;
import com.dl.testsift.ImaInfo;
import com.dl.testsift.ProPart3;
import com.dl.util.ImaUtil;
@WebServlet(name="upload",urlPatterns={"/fileupload"})
@SuppressWarnings("serial")
public class FileUpload extends HttpServlet {
   private String uploadPath = "F:\\graduation\\temp"; // 上传文件的目录
   private String tempPath = "F:\\graduation\\temp\\buffer\\"; // 临时文件目录
   File tempPathFile;
   private LinkedList<ImaInfo> imainfos = null;

   public void doPost(HttpServletRequest request, HttpServletResponse response)
          throws IOException, ServletException {
	   RequestDispatcher rd = null;
      try {
    	  //PrintStream out = new PrintStream(response.getOutputStream());
          // Create a factory for disk-based file items
          DiskFileItemFactory factory = new DiskFileItemFactory();

          // Set factory constraints
          factory.setSizeThreshold(4096); // 设置缓冲区大小，这里是4kb
          factory.setRepository(tempPathFile);// 设置缓冲区目录

          // Create a new file upload handler
          ServletFileUpload upload = new ServletFileUpload(factory);

          // Set overall request size constraint
          upload.setSizeMax(4194304); // 设置最大文件尺寸，这里是4MB

          List<FileItem> items = upload.parseRequest(request);// 得到所有的文件
          Iterator<FileItem> i = items.iterator();
          String searchFile = null;
          while (i.hasNext()) {
             FileItem fi = (FileItem) i.next();
             String fileName = fi.getName();
             if (fileName != null) {
                 File fullFile = new File(fi.getName());
                 File savedFile = new File(uploadPath, fullFile.getName());
                 fi.write(savedFile);
                 if(savedFile.exists()){
                	 searchFile = savedFile.getPath();
                	 System.out.println(searchFile);
                 }
             }
          }
          System.out.print("upload succeed");
          if(searchFile == null){
        	  System.out.print("文件写入错误！！");
          }else{
        	  List<String> filePaths = ProPart3.searchResullt(imainfos,searchFile);
        	  Argorithms.printList(filePaths);
        	  request.setAttribute("filePaths", filePaths);
        	  rd = request.getRequestDispatcher("/searchResult.jsp");
        	  rd.forward(request, response); 
          }
          
          
      } catch (Exception e) {
          // 可以跳转出错页面
          e.printStackTrace();
      }
   }

   public void init() throws ServletException {
      File uploadFile = new File(uploadPath);
      if (!uploadFile.exists()) {
          uploadFile.mkdirs();
      }
      
      tempPathFile = new File(tempPath);
       if (!tempPathFile.exists()) {
          tempPathFile.mkdirs();
      }
       
       imainfos = ImaUtil.readImaInfo();
   }
   
   
}
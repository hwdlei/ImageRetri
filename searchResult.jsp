<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	List<String> files = null;
    try{
   		if(request.getAttribute("filePaths") != null) {
   			files = (List<String>)request.getAttribute("filePaths");	
        }
    }catch(Exception e){
            e.printStackTrace();
  	};
%>

<!DOCTYPE html>
<!-- saved from url=(0026)http://wallbase.cc/toplist -->
<html lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <!--<base href="http://wallbase.cc/">--><base href=".">
	<title>donglei's image retrival</title>
	<!-- styles -->
	<link href="./web_files/application.css" media="screen, projection" rel="stylesheet" 

type="text/css">

	<!-- / styles -->
	<link type="text/css" rel="stylesheet" href="chrome-

extension://cpngackimfmofbokmjmljamhdncknpmg/style.css">
	<script type="text/javascript" charset="utf-8" src="chrome-

extension://cpngackimfmofbokmjmljamhdncknpmg/js/page_context.js"></script>
</head>
<body screen_capture_injected="true" style="">

	<div class="favs-overlay hidden">
   		<div class="loader"><img src="./web_files/loader-circle.gif" class="file"><br>Loading 

favorites...</div>
	</div>

	<div class="modal"><div class="bg"><div class="window"></div></div></div>

	<div id="userbar" class="userbar-subpage">
		<div class="left"></div>
	</div>
    <form action="http://wallbase.cc/search" method="post" class="sort_form">
        <div id="subtop">
            <div class="logomenu">
            
            <div class="logo"><a href="http://wallbase.cc/home"><img src="./web_files/logo.png" style="border:none;"></a></div>
                
            <ul class="menu">
                <li class="item"><a href="javascript:;" class="item-a showsearch"><img class="gui ico-search" src="./web_files/search.png"></img></a></li>
                <li class="searchbar hidden">
                    <div class="inp-wrap keyw">
                       <input type="file" id="query" name="query" value="select" class="query">
                    </div>
                     <div class="inp-wrap color clr">
                       <input type="text" name="color" class="colortab" data-type="color" readonly placeholder="∞">
                    </div>
                </li>
                <li class="item"><a href="http://wallbase.cc/random" class="item-a"><img class="gui ico-search" src="./web_files/small_random.png"></img></a></li>
                <li class="item"><a href="" class="item-a"><img class="gui ico-search" src="./web_files/small_time.png"></img></a></li>
                <li class="item"><a href="http://wallbase.cc/forum" class="item-a"><img class="gui ico-comments" src="./web_files/contact.png"></img></a></li>
                <li class="item"><a href="http://wallbase.cc/site/about" class="item-a"><img class="gui ico-about" src="./web_files/about.png"></img></a></li>
                <li style="clear:both;"></li>
            </ul>
            
        </div>
    </div>
    
    </form>


<div id="wrap">

    <div class="subhead clr">
 <!--       <div class="icon"><a href="./Best wallpapers   Wallbase.cc_files/Best wallpapers   

Wallbase.cc.htm" class="icn spr-bigicon-flatline"></a></div>
 -->
      <div class="icon"></div>
        <div class="main">
            <div class="line1">注： </div>
            <div class="line2">&nbsp;&nbsp;&nbsp;&nbsp;采用sift算法和bag of words模型，提取图像特征并生成特征向量，最后用TopN算法从30608张图片中取出匹配最好的<%=files.size() %>张图片</div>
            <div class="line2">&nbsp;&nbsp;&nbsp;&nbsp;网站的模版来自于<a href="http://wallbase.cc/">wallcc</a>，点击访问原网站 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            											作者： hwdlei  &nbsp;&nbsp;&nbsp;&nbsp;QQ: 1368182238&nbsp;&nbsp;&nbsp;&nbsp;2014.4.26</div>
        </div>
        <div class="rightside">

            <ul class="menumedium nofilter">
                <li class="border"></li>
                <li class="mitem">
                    <a href="" class="link">
                        <span class="icn-colls"></span><br>
                        <span class="txt"></span>
                    </a>
                </li>
            </ul>


            <div class="icon"><a href="http://wallbase.cc/home"><img src="./web_files/image.jpg" 

style="border:none;"></a></div>
        </div>
    </div>



<!--     显示主体-->
<section id="thumbs" class="clr">
	<%
		for(int i = 0;i < 20;i++){
 	%>
      <div id="thumb2099647" class="thumbnail purity-0" style="width:250px;height:188px">

            <div class="wrapper">
                <div class="over-bottom">
                    <span class="reso">1920x1200</span>
                </div>
                <a href="http://wallbase.cc/wallpaper/2099647" target="_blank">
                    <img src=<%=files.get(i) %>  class="file lazy show">
                </a>
       		</div>
   	  </div>
   	  <%
   	  }
   	  %>   
</section>

</div>

<div class="growl">
    <div class="icon"></div>
    <div class="text">
        <div class="title"></div>
        <div class="desc"></div>
    </div>
</div>


<div class="futer">
    <div class="border-top"></div>

    <div class="line-top clr">
    	<div class="left">
    		
    	</div>
    	<div class="right">
    		<div class="l1">All submitted content remains copyright its original copyright 

holder. Images are for personal, non commercial use.</div>
    		<div class="l2">
    			Website code and design © Wallbase.cc, 2013 &nbsp;&nbsp; 0.0351 &nbsp; 1.07MB 

   			<a href="http://wallbase.cc/site/terms" class="termslink">Terms of 

Service</a>
    			<a href="" class="termslink">Privacy Policy</a>
    			<a href="" class="termslink">Cookies</a>
    		</div>
    	</div>
    </div>
</div>

<script src="./web_files/toplist.js"></script><script type="text/javascript" 

src="./web_files/ga.js"></script><script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-862446-7']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>
<script type="text/javascript">

var base_url = 'http://wallbase.cc/';
var opt = 
{
	loggedin: false,
    pagination: 1,
    area: 'toplist',
    section: 'wallpapers',
    coll_view: '',
	thpp: 32,
    curr_page: 1,
    s: 0,
    path: 
	{
		'views': 'http://static.wallbase.cc/front/6/',
		'js': 'http://static.wallbase.cc/front/6/js/',
		'images': 'http://static.wallbase.cc/front/6/images/'
	}
};

</script>

<script type="text/javascript" src="./web_files/jquery.min.js"></script>
<script type="text/javascript" src="./web_files/jquery-extras.js"></script>
<script type="text/javascript" src="./web_files/application.js"></script>
<script type="text/javascript" charset="utf-8"  src="./web_files/stats"></script></body></html>
<?php

	require('includes/config.php');
	$pagetitle = "Battle Now!";           
	$UMsection = "DOWNLOAD_MEDIA";
	require('includes/toolbar.php');
	require('includes/header.php');	
?>
<link href="css/style.css" rel="stylesheet" />
<script src="Scripts/AC_RunActiveContent.js" type="text/javascript"></script>

<body class="battlenow" onLoad="MM_preloadImages('images/battlenow-bg.jpg','images/home-btn-hover.gif','images/game-info-btn-hover.gif','images/screenshot-btn-hover.gif','images/video-btn-hover.gif','images/registration-btn-hover.gif','images/pre-order-now-btn-hover.gif','images/battle-now-btn-hover.jpg','images/buy-now-btn-hover.gif','images/close_on.jpg')">
<!--main div starts here -->
<!--main div ends here -->
<?php Toolbar::print_toolbar_js(); ?>

<div align="center">		
<div class="navpart">
	<ul class="topnavpart">
		<li><a href="<?=$home;?>" onMouseOut="MM_swapImgRestore()" onMouseOver="MM_swapImage('Image2','','images/home-btn-hover.gif',1)"><img src="images/home-btn.gif" alt="<?=$txt_homepage;?>" title="<?=$txt_homepage;?>" name="Image2" width="40" height="16" border="0" id="Image2" /></a></li>
		<li><a href="<?=$game_info;?>" onMouseOut="MM_swapImgRestore()" onMouseOver="MM_swapImage('Image3','','images/game-info-btn-hover.gif',1)"><img src="images/game-info-btn.gif" alt="<?=$txt_gameinfo;?>" title="<?=$txt_gameinfo;?>" name="Image3" width="77" height="16" border="0" id="Image3" /></a></li>
		<li><a href="<?=$screenshots;?>" onMouseOut="MM_swapImgRestore()" onMouseOver="MM_swapImage('Image4','','images/screenshot-btn-hover.gif',1)"><img src="images/screenshot-btn.gif" alt="<?=$txt_screenshots;?>" title="<?=$txt_screenshots;?>" name="Image4" width="100" height="16" border="0" id="Image4" /></a></li>
		<li><a href="<?=$link_register;?>" onMouseOut="MM_swapImgRestore()" onMouseOver="MM_swapImage('Image6','','images/registration-btn-hover.gif',1)" target="_blank"><img src="images/registration-btn-.gif" alt="<?=$txt_register;?>" title="<?=$txt_register;?>" name="Image6" width="101" height="16" border="0" id="Image6" /></a></li>
		<li></li>
	    <a href="<?=$link_buynow;?>" onMouseOut="MM_swapImgRestore()" onMouseOver="MM_swapImage('Image7','','images/pre-order-now-btn-hover.gif',1)" target="_blank"><img src="images/pre-order-now-btn.gif" alt="<?=$txt_pre_order;?>" title="<?=$txt_pre_order;?>" name="Image7" width="116" height="16" border="0" id="Image7" /></a>
	</ul>
</div>
<!--navpart ends here -->
<div class="content">
<a href="<?=$link_battle_now;?>" class="battleBtn3" onMouseOut="MM_swapImgRestore()" onMouseOver="MM_swapImage('Image14','','images/battleNow-hover.jpg',1)" ><img src="images/battleNow.jpg" alt="Battle Now" title="Battle Now" name="Image14" width="189" height="100" border="0" id="Image14" /></a>  <br class="spacer"/>
<div class="closebutton"><a href="index.php" onMouseOut="MM_swapImgRestore()" onMouseOver="MM_swapImage('closeoff','','images/close_on.jpg',1)"><img src="images/close_off.jpg" alt="Close" name="closeoff" width="114" height="45" border="0"></a></div>
<div class="battlenow">
<script language="javascript">AC_FL_RunContent = 0;</script>
<script src="Scripts/AC_RunActiveContent.js" language="javascript"></script>
</head>
<body bgcolor="#ffffff">
<!--url's used in the movie-->
<!--text used in the movie-->
<!-- saved from url=(0013)about:internet -->
<script language="javascript">
	if (AC_FL_RunContent == 0) {
		alert("This page requires AC_RunActiveContent.js.");
	} else {
		AC_FL_RunContent( 'codebase','http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0','width','800','height','400','id','battlenow','align','middle','src','swf/battlenow?buyNowURL=<?=$link_buynow?>','quality','high','bgcolor','#ffffff','name','battlenow','allowscriptaccess','sameDomain','allowfullscreen','false','pluginspage','http://www.macromedia.com/go/getflashplayer','movie','swf/battlenow?buyNowURL=http://www.amazon.com/Battle-Giants-Dinosaurs-Nintendo-DS/dp/B001D5DQKC/ref=sr_1_5?ie=UTF8&s=videogames&qid=1223337558&sr=1-5' ); //end AC code
	}
</script>
<noscript>
	<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="800" height="400" id="battlenow" align="middle">
	<param name="allowScriptAccess" value="sameDomain" />
	<param name="allowFullScreen" value="false" />
	<param name="movie" value="swf/battlenow.swf?buyNowURL=http://www.amazon.com/Battle-Giants-Dinosaurs-Nintendo-DS/dp/B001D5DQKC/ref=sr_1_5?ie=UTF8&s=videogames&qid=1223337558&sr=1-5" /><param name="quality" value="high" /><param name="bgcolor" value="#ffffff" />	<embed src="swf/battlenow.swf?buyNowURL=http://www.amazon.com/Battle-Giants-Dinosaurs-Nintendo-DS/dp/B001D5DQKC/ref=sr_1_5?ie=UTF8&s=videogames&qid=1223337558&sr=1-5" quality="high" bgcolor="#ffffff" width="800" height="400" name="battlenow" align="middle" allowScriptAccess="sameDomain" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />
	</object>
</noscript>
</div>

</div>
</div>

<?
            require('includes/footer.php');
            require('includes/tracker.php');
?>

</body>
</html>

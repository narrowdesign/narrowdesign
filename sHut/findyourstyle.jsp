<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
	<title>Be Inspired - See What the Right Pair of Sunglasses Can Do for You</title>
	<link rel="stylesheet" href="css/main.css" />
	<link rel="stylesheet" href="css/catalog.css" />
	<script type="text/javascript" src="js/swfobject.js"></script>
	<script type="text/javascript" src="js/mootools.js"></script>
</head>
<body class="fc noborder wide inspired">

	<div id="wrapper" >

		<div id="masthead">
			<jsp:include page="inc/header.txt" flush="true" />
		</div>

		<div id="content_border">
			<div id="content">
				<div id="overlay"></div><div id="pane"></div>
				<div id="pdp_grow"></div>
				<div id="flash_wrapper" style="width:955px;height:514px;background:#ffffff;">
					<div id="flash_content">
						<script type="text/javascript">
						   var so = new SWFObject("swf/findyourstyle.swf", "findyourstyles_swf", "955", "514", "8", "#ffffff");
						   so.addVariable("flashvars", "callPath=xml/services.xml&xPath=xml/findyourstyle.xml");
						   so.addParam("quality", "high");
						   so.addParam("wmode", "opaque");
						   so.useExpressInstall('swf/expressinstall.swf');
						   so.setAttribute('xiRedirectUrl',window.location);
						   so.write("flash_content");
						</script>
					</div>
					<jsp:include page="inc/basic_stylefile_overlay.txt" flush="true" />
				</div>
			</div>

		</div>

		<div id="footer">
			<jsp:include page="inc/footer.txt" flush="true" />
		</div>

	</div>

<jsp:include page="inc/overlay.txt" flush="true" />
<jsp:include page="inc/s7dhtmlViewer.jsp" flush="true" />

<jsp:include page="inc/scripts.jsp" flush="true" />
</body>
</html>

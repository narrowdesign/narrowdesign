<?php

//get tha date
$tha_year = date(Y);
$tha_dob = $tha_year - 13;
$tha_day = date(d) - 1;
$tha_month = date(m);
$dob = $tha_dob.$tha_month.$tha_day;

?>
<html>
<head>
<meta name="Description" content="">
<meta name="KeyWords" content="">
<title>John Travolta: Register</title>
<Link rel="stylesheet" type="text/css" href="/html/styles/johntravolta.css">
<script language=JavaScript><!--
function doPop(){
		var newdob = document.form.Year.value + document.form.dobm.value + document.form.dobd.value;
		var dob = "<? print($dob); ?>";
		
		if(newdob > dob){
			alert('You must be at least 13 years old to register');
			return false;

		}



		
	}

	var dob = "<?php $tha_dob ?>";
	function doCheckDate()  {
		return  false;
	}

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_findObj(n, d) { //v3.0
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

function MM_validateForm() { //v3.0
  var i,p,q,nm,test,num,min,max,errors='',args=MM_validateForm.arguments;
  for (i=0; i<(args.length-2); i+=3) { test=args[i+2]; val=MM_findObj(args[i]);
    if (val) { nm=val.name; if ((val=val.value)!="") {
      if (test.indexOf('isEmail')!=-1) { p=val.indexOf('@');
        if (p<1 || p==(val.length-1)) errors+='- '+nm+' must contain an e-mail address.\n';
      } else if (test!='R') { num = parseFloat(val);
        if (val!=''+num) errors+='- '+nm+' must contain a number.\n';
        if (test.indexOf('inRange') != -1) { p=test.indexOf(':');
          min=test.substring(8,p); max=test.substring(p+1);
          if (num<min || max<num) errors+='- '+nm+' must contain a number between '+min+' and '+max+'.\n';
    } } } else if (test.charAt(0) == 'R') errors += '- '+nm+' is required.\n'; }
  } if (errors) alert('The following error(s) occurred:\n'+errors);
  document.MM_returnValue = (errors == '');
}
//-->
</script>
</head>

<body bgcolor=#000000 text=#ffffff link=#ff9900 vlink=#ff600 alink=#ffffff topmargin=10 leftmargin=0 marginheight=10 marginwidth=0 onLoad="MM_preloadImages('images/btn_def_biography.gif','images/btn_int_interviews.gif','images/btn_car_career.gif','images/btn_back_backlot.gif','images/btn_multi_multimedia.gif','images/btn_links_weblinks.gif','images/btn_down_downloads.gif','images/btn_def_next.gif')">
<center>
<table width=602 cellpadding=0 cellspacing=0 border=0 align=center>
 <tr>
  <td width=602 align=left valign=top colspan=3>
  <!--Begin top row; animation, brand, top links-->
  	<table width=602 cellpadding=0 cellspacing=0 border=0>
  	 <tr>
  	  <td width=95 align=right valign=top><a href=index.html><img src=images/sm_ani.gif width=73 height=111 hspace=9 vspace=0 border=0 align=right alt="Click to return to John's home page"></a></td>
  	  <td width=507 align=left valign=top colspan=3><img src=images/hd_tvlistings.gif width=507 height=111 hspace=0 vspace=0 border=0 align=left alt="John Travolta"></td>
  	 </tr>
  	 <tr>
  	  <td width=95 align=left valign=top><a href=index.html><img src=images/btn_home_tv.gif width=95 height=40 hspace=0 vspace=0 border=0 align=left alt="Click to return to John's home page"></a></td>
  	        <td width=146 align=left valign=top><a href=email.htm><img src=images/btn_email_tv.gif width=146 height=40 hspace=0 vspace=0 border=0 align=left alt="Click here to send John email"></a></td>
  	  <td width=191 align=left valign=top><img src=images/lbl_official_tv.gif width=191 height=40 hspace=0 vspace=0 border=0 align=left alt="The Official Web Site"></td>
  	        <td width=170 align=left valign=top><a href=register.php3><img src=images/btn_register_tv.gif width=170 height=40 hspace=0 vspace=0 border=0 align=left alt="Click here for updates"></a></td>
  	 </tr>
  	</table>
  <!--End top row-->
  </td>
 </tr>
 <tr>
  <td width=132 align=left valign=top background=images/btn_bg_tv.gif>
  <!--Begin left column; navigation,ads-->
		<table width=132 cellpadding=0 cellspacing=0 border=0 align=left>
	<tr><td colspan=2 width=132 align=left valign=top><img src=images/btn_top_reg.gif width=132 height=13 align=left border=0 vspace=0 hspace=0></td></tr>
	 <tr><td width=106 align=left valign=top background=/images/util/dot_alpha.gif><a href=biography.htm onMouseOut=MM_swapImgRestore() onMouseOver=MM_swapImage('biography','','images/btn_def_biography.gif',1)><img name=biography border=0 src=images/btn_reg_biography.gif width=106 height=27 hspace=0 vspace=0 align=left></a></td>
		<td rowspan=8 width=26 align=left valign=top background=/images/util/dot_alpha.gif><img src=images/navbox_reg.gif width=26 height=216 hspace=0 vspace=0 border=0 align=left></td></tr>
	 <tr><td width=106 align=left valign=top background=/images/util/dot_alpha.gif><a href=interviews.htm onMouseOut=MM_swapImgRestore() onMouseOver=MM_swapImage('interviews','','images/btn_int_interviews.gif',1)><img name=interviews border=0 src=images/btn_reg_interviews.gif width=106 height=27 hspace=0 vspace=0 align=left></a></td></tr>
	 <tr><td width=106 align=left valign=top background=/images/util/dot_alpha.gif><a href=career.htm onMouseOut=MM_swapImgRestore() onMouseOver=MM_swapImage('career','','images/btn_car_career.gif',1)><img name=career border=0 src=images/btn_reg_career.gif width=106 height=27 hspace=0 vspace=0 align=left></a></td></tr>
	 <tr><td width=106 align=left valign=top background=/images/util/dot_alpha.gif><a href=backlot.htm onMouseOut=MM_swapImgRestore() onMouseOver=MM_swapImage('backlot','','images/btn_back_backlot.gif',1)><img name=backlot border=0 src=images/btn_reg_backlot.gif width=106 height=27 hspace=0 vspace=0 align=left></a></td></tr>
	 <tr><td width=106 align=left valign=top background=/images/util/dot_alpha.gif><a href=multimedia.htm onMouseOut=MM_swapImgRestore() onMouseOver=MM_swapImage('multimedia','','images/btn_multi_multimedia.gif',1)><img name=multimedia border=0 src=images/btn_reg_multimedia.gif width=106 height=27 hspace=0 vspace=0 align=left></a></td></tr>
	 <tr><td width=106 align=left valign=top background=/images/util/dot_alpha.gif><a href=weblinks.htm onMouseOut=MM_swapImgRestore() onMouseOver=MM_swapImage('weblinks','','images/btn_links_weblinks.gif',1)><img name=weblinks border=0 src=images/btn_reg_weblinks.gif width=106 height=27 hspace=0 vspace=0 align=left></a></td></tr>
	 <tr><td width=106 align=left valign=top background=/images/util/dot_alpha.gif><a href=downloads.htm onMouseOut=MM_swapImgRestore() onMouseOver=MM_swapImage('downloads','','images/btn_down_downloads.gif',1)><img name=downloads border=0 src=images/btn_reg_downloads.gif width=106 height=27 hspace=0 vspace=0 align=left></a></td></tr>
	 <tr><td width=106 align=left valign=top background=/images/util/dot_alpha.gif><a href=next.htm onMouseOut=MM_swapImgRestore() onMouseOver=MM_swapImage('next','','images/btn_def_next.gif',1)><img name=next border=0 src=images/btn_reg_next.gif width=106 height=27 hspace=0 vspace=0 align=left></a></td></tr>
	</table>
  <!--End left column-->
  </td>
  <td width=449 align=left valign=top background=images/bg_register.jpg>
    <!--Begin center column; main body of page--><img src=/images/util/dot_alpha.gif width=449 height=75><br>
     <form name=form method=POST action=register_thanks.php3 onSubmit="return doPop()">
     <input type=hidden name="CelebID" value="1204">
	      <table width=449 cellpadding=0 cellspacing=0 border=0>
            <!--- Start Form ---> 
            <tr> 
              <td rowspan=6 width=10 background=/images/util/dot_alpha.gif><img src=/images/util/dot_alpha.gif width=10 height=1 align=left hspace=0 border=0></td>
              <td width=439 align=left valign=top background=/images/util/dot_alpha.gif> 
                <font face=arial class=Main><i><b>By registering you will be the 
                first to receive exclusive invitations to special events, be eligible 
                for online contests, and hear the latest news about John.<br>
                <br>
                </b></i></font> </td>
            </tr>
            <tr>
              <td width=368 background=/images/util/dot_alpha.gif align="left"><img src=images/register_fn.gif width=109 height=15 border=0> 
                <input type=text name="FirstName" size="12" maxlength="100">
                <font class=menu>&nbsp;<br>
                </font> <img src=images/register_ln.gif width=109 height=15 border=0> 
                <input type=text name="LastName" size="12" maxlength="100">
                <font class=menu>&nbsp;<br>
                </font> <img src=images/register_e.gif width=81 height=15 border=0> 
                <input type=text name="Email" size="15" maxlength="255">
                <br>
                <br>
              </td>
            </tr>
            <tr> 
              <td width=439 align=left valign=top background=/images/util/dot_alpha.gif><img src=images/register_birth.gif width=109 height=15 hspace=0 vspace=0> 
                <select name="dobm" class=menu>
                  <option value="Mon">Mon</option>
                  <option value="01">Jan</option>
                  <option value="02">Feb</option>
                  <option value="03">Mar</option>
                  <option value="04">Apr</option>
                  <option value="05">May</option>
                  <option value="06">Jun</option>
                  <option value="07">Jul</option>
                  <option value="08">Aug</option>
                  <option value="09">Sep</option>
                  <option value="10">Oct</option>
                  <option value="11">Nov</option>
                  <option value="12">Dec</option>
                </select>
                <select name="dobd" class=menu>
                  <option value="Day">Day</option>
                  <option value="01">01</option>
                  <option value="02">02</option>
                  <option value="03">03</option>
                  <option value="04">04</option>
                  <option value="05">05</option>
                  <option value="06">06</option>
                  <option value="07">07</option>
                  <option value="08">08</option>
                  <option value="09">09</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                  <option value="13">13</option>
                  <option value="14">14</option>
                  <option value="15">15</option>
                  <option value="16">16</option>
                  <option value="17">17</option>
                  <option value="18">18</option>
                  <option value="19">19</option>
                  <option value="20">20</option>
                  <option value="21">21</option>
                  <option value="22">22</option>
                  <option value="23">23</option>
                  <option value="24">24</option>
                  <option value="25">25</option>
                  <option value="26">26</option>
                  <option value="27">27</option>
                  <option value="28">28</option>
                  <option value="29">29</option>
                  <option value="30">30</option>
                  <option value="31">31</option>
                </select>
                <input type=text name=Year size=4 maxlength=4 class=menu value="year" >
                <font face="Arial, Helvetica, sans-serif" size="1" color="#ffffff">Four 
                digits long, ie. 1980</font><br>
                <br>
              </td>
            </tr>
            <tr> 
              <td width=439 align=left valign=top background=/images/util/dot_alpha.gif><font face=arial class=Main><i><b>Choose 
                the topic(s) which you wish to be notified of:<br>
                <br>
                </b></i></font> </td>
            </tr>
            <tr> 
              <td width=240 align=left valign=top background=/images/util/dot_alpha.gif> 
                <img src=/images/util/dot_alpha.gif width=241 height=4 border=0><br>
                &nbsp; 
                <input type=checkbox name=ntfy_all value=1 checked>
                <font size=1 face="Arial, Helvetica, sans-serif" color=#ffffff class=feattxt><b>&nbsp; 
                Notify me of everything related to John</b><br>
                </font> <img src=/images/util/dot_alpha.gif width=241 height=4 border=0><br>
                &nbsp; 
                <input type=checkbox name=ntfy_site value=1 checked>
                <font size=1 face="Arial, Helvetica, sans-serif" color=#ffffff class=feattxt><b>&nbsp; 
                Notify me of changes to John's site</b><br>
                </font> <img src=/images/util/dot_alpha.gif width=241 height=4 border=0><br>
                &nbsp; 
                <input type=checkbox name=ntfy_tv value=1 checked>
                <font size=1 face="Arial, Helvetica, sans-serif" color=#ffffff class=feattxt><b>&nbsp; 
                Notify me when John will be on TV</b><br>
                </font> <img src=/images/util/dot_alpha.gif width=241 height=4 border=0><br>
                &nbsp; 
                <input type=checkbox name=ntfy_proj value=1 checked>
                <font size=1 face="Arial, Helvetica, sans-serif" color=#ffffff class=feattxt><b>&nbsp; 
                Notify me of any of John's new projects</b><br>
                </font> </td>
            </tr>
            <tr> 
              <td width=439 align=center valign=top background=/images/util/dot_alpha.gif><br>
                <input type="submit" value="Add me to the Mailing List!" onClick="MM_validateForm('FirstName','','R','LastName','','R','Email','','RisEmail','Year','','RisNum');return document.MM_returnValue" name="submit">
                <br>
                <br>
                <br>
                <br>
              </td>
            </tr>
            <!--- End Form ---> 
          </table>
        </form>
        <!--End center column-->
  </td>
  
  <td width=21 align=left valign=top background=images/r_bg_tv.gif>
  <!--Begin right column; spacer-->
  	<table width=21 cellpadding=0 cellspacing=0 border=0><tr><td width=21 align=left valign=top background=/images/util/dot_alpha.gif><img src=images/r_1_tv.gif width=21 height=398 hspace=0 vspace=0 border=0 align=left></td></tr></table>
  <!--End right column-->
  </td>
 </tr>
 
 <tr>
  <td width=132 align=left valign=top><img src=images/bot_left_tv.gif width=132 height=9 hspace=0 vspace=0 border=0 align=left></td>
  <td width=449 align=left valign=top><img src=images/bot_center_tv.gif width=449 height=9 hspace=0 vspace=0 border=0 align=left><font face=arial size=1 class=Tiny><br>John Travolta: The Official Web Site &copy;Copyright 2000 <b><a href=http://www.celebsites.com>CelebSites, Inc.</a> & JTP Films All rights reserved.<br></b></font></td>
  <td width=21 align=left valign=top><img src=images/bot_right_tv.gif width=21 height=9 hspace=0 vspace=0 border=0 align=left></td>
 </tr>
</table>
<!-- BEGIN WEBSIDESTORY CODE V5. COPYRIGHT 1998-2000 WEBSIDESTORY, INC. ALL
RIGHTS RESERVED. U.S. PATENT PENDING. -->
<!-- webbot bot="HTMLMarkup" startspan -->
<IMG SRC="http://hg1.hitbox.com/HG?hc=w124&l=y&hb=WE50051503AE38EN3&l=e&cd=1&n=travolta_register" height=1 width=1 BORDER="0">
<!-- webbot bot="HTMLMarkup" endspan -->
<!-- END WEBSIDESTORY CODE  -->
<!-- BEGIN WEBSIDESTORY CODE v5 --> <!-- COPYRIGHT 1998-1999 WEBSIDESTORY, INC. ALL RIGHTS RESERVED.  U.S.PATENT PENDING. --> 
<img src="http://hg1.hitbox.com/HG?hc=w125&l=y&hb=DM591006DDMBDXEN3&cd=1&n=John+Travolta+register" height=1 width=1 border=0><!-- END WEBSIDESTORY CODE  -->

</center></body>
</html>
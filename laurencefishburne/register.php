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
	<title>Laurence Fishburne Register</title>
<script language="JavaScript1.1" defer src="jsinclude.js"></script>
<Link rel="stylesheet" type="text/css" href=/html/styles/laurence.css>
<script language="JavaScript">
<!--
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

function MM_findObj(n, d) { //v3.0
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document); return x;
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
<body marginwidth=0 marginheight=0 topmargin=0 leftmargin=0 bgcolor=#0F1012 text=white link=#808080 alink=#676666 vlink=#515151 onLoad="MM_preloadImages('images/mousevovers/f_bottom_over.gif','images/mouseovers/register_photo_over.gif','images/mouseovers/register_over.gif','images/mouseovers/bio_photo_over.gif','images/mouseovers/bio_over.gif','images/mouseovers/email_photo_over.gif','images/mouseovers/email_over.gif','images/mouseovers/film_photo_over.gif','images/mouseovers/film_photo.gif','images/mouseovers/film_over.gif','images/mouseovers/photo_photo_over.gif','images/mouseovers/photo_over.gif','images/mouseovers/insider_photo_over.gif','images/mouseovers/insider_over.gif','images/mouseovers/links_photo_over.gif','images/mouseovers/links_over.gif','images/mouseovers/interviews_photo_over.gif','images/mouseovers/interviews_photo.gif','images/mouseovers/interviews_over.gif')">
<table width=622 cellpadding=0 cellspacing=0 border=0 align=center>
 <tr>
  <td rowspan=2 width=1 background=images/gray.gif><img src=images/alpha.gif width=1 height=1></td>
  <td width=620 align=left valign=top background=images/black.gif>
<!-- begin main table -->
   <table width=620 cellspacing=0 cellpadding=0 border=0>
    <tr>
      <td width=117 rowspan=2 align=left valign=top><img src=images/face_link.jpg width=117 height=205 border=0><br></td>
      <td width=503 align=left valign=top><img src=images/hd_lf.gif width=503 height=73 border=0><br></td>
    </tr>
    <tr>
      <td width=503 align=left valign=top>
	  <table width=503 cellspacing=0 cellpadding=0 border=0>
	     <tr>
		<td width=503 valign=top align=left background=images/shd_register.gif><a href="index.html" ONMOUSEOVER="ChangeImage('home','f_bottom_over.gif');" ONMOUSEOUT="ChangeImage('home','f_bottom_up.gif');"><img src=images/mouseovers/f_bottom_up.gif width=84 height=92 border=0 name=home></a></td>
	     </tr>
	     <tr>
		<td width=503 valign=top align=center><img src=images/alpha.gif width=1 height=27></td>
	     </tr>
	     <tr>
		<td width=503 align=left valign=top><img src=images/movies/title_bar.gif width=503 height=13></td>
	     </tr>
	  </table>
      </td>
   </tr>
   <tr>
	  <td width=117 align=center valign=top>
<table width=49 cellspacing=0 cellpadding=0 border=0 align="center">
  <tr> 
    <td colspan=2 width=49 align=center valign=top> 
      <table width=49 cellspacing=0 cellpadding=0 border=0>
        <tr> 
          <td colspan=2 width=49 align=right valign=top background=images/alpha.gif><a href="register.php"><img src="images/mouseovers/register_photo_over.gif" width="47" height="28" alt="register" border="0" name="registerphoto"></a></td>
        </tr>
        <tr> 
          <td colspan=2 width=49 align=right valign=top background=images/alpha.gif><a href="register.php"><img src="images/mouseovers/register_over.gif" width="47" height="9" alt="register" border="0" name="register" vspace=1></a><br>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr> 
    <td width=12 align=right valign=top> <a href="biography.html" onMouseOut="MM_nbGroup('out')" onMouseOver="MM_nbGroup('over','bio','images/mouseovers/bio_over.gif','','biophoto','images/mouseovers/bio_photo_over.gif','',1)"><img src="images/mouseovers/bio_up.gif" width="12" height="16" alt="biography" border="0" name="bio"></a><br>
      <a href="http://www.#/FormMail/LaurenceFishburne/email.html" onMouseOut="MM_nbGroup('out')" onMouseOver="MM_nbGroup('over','email','images/mouseovers/email_over.gif','','emailphoto','images/mouseovers/email_photo_over.gif','',1)"><img src="images/mouseovers/email_up.gif" width="12" height="31" alt="email" border="0" name="email"></a><br>
      <a href="filmography.html" onMouseOut="MM_nbGroup('out')" onMouseOver="MM_nbGroup('over','film','images/mouseovers/film_over.gif','','filmphoto','images/mouseovers/film_photo_over.gif','',1)"><img src="images/mouseovers/film_up.gif" width="12" height="26" alt="filmography" border="0" name="film"></a><br>
      <a href="photos.html" onMouseOut="MM_nbGroup('out')" onMouseOver="MM_nbGroup('over','photo','images/mouseovers/photo_over.gif','','photophoto','images/mouseovers/photo_photo_over.gif','',1)"><img src="images/mouseovers/photo_up.gif" width="12" height="41" alt="photos" border="0" name="photo"></a><br>
      <a href="insider.html" onMouseOut="MM_nbGroup('out')" onMouseOver="MM_nbGroup('over','insider','images/mouseovers/insider_over.gif','','insiderphoto','images/mouseovers/insider_photo_over.gif','',1)"><img src="images/mouseovers/insider_up.gif" width="12" height="39" alt="insider" border="0" name="insider"></a><br>
      <a href="links.html" onMouseOut="MM_nbGroup('out')" onMouseOver="MM_nbGroup('over','links','images/mouseovers/links_over.gif','','linksphoto','images/mouseovers/links_photo_over.gif','',1)"><img src="images/mouseovers/links_up.gif" width="12" height="30" alt="links" border="0" name="links" onLoad=""></a><br>
      <a href="interview.html" onMouseOut="MM_nbGroup('out')" onMouseOver="MM_nbGroup('over','interviews','images/mouseovers/interviews_over.gif','','interviewsphoto','images/mouseovers/interviews_photo_over.gif','',1)"><img src="images/mouseovers/interviews_up.gif" width="12" height="57" alt="interviews" border="0" name="interviews"></a><br>
    </td>
    <td width=37 align=left valign=top> <a href="biography.html" onMouseOut="MM_nbGroup('out')" onMouseOver="MM_nbGroup('over','biophoto','images/mouseovers/bio_photo_over.gif','','bio','images/mouseovers/bio_over.gif','',1)"><img src="images/mouseovers/bio_photo.gif" width="37" height="25" alt="biography" border="0" name="biophoto" vspace=1></a><br>
      <a href="http://www.#/FormMail/LaurenceFishburne/email.html" onMouseOut="MM_nbGroup('out')" onMouseOver="MM_nbGroup('over','emailphoto','images/mouseovers/email_photo_over.gif','','email','images/mouseovers/email_over.gif','',1)"><img src="images/mouseovers/email_photo.gif" width="37" height="34" alt="email" border="0" name="emailphoto"></a><br>
      <a href="filmography.html" onMouseOut="MM_nbGroup('out')" onMouseOver="MM_nbGroup('over','filmphoto','images/mouseovers/film_photo_over.gif','','film','images/mouseovers/film_over.gif','',1)"><img src="images/mouseovers/film_photo.gif" width="37" height="25" alt="filmography" border="0" name="filmphoto" vspace=1></a><br>
      <a href="photos.html" onMouseOut="MM_nbGroup('out')" onMouseOver="MM_nbGroup('over','photophoto','images/mouseovers/photo_photo_over.gif','','photo','images/mouseovers/photo_over.gif','',1)"><img src="images/mouseovers/photo_photo.gif" width="37" height="29" alt="photos" border="0" name="photophoto" vspace=0></a><br>
      <a href="insider.html" onMouseOut="MM_nbGroup('out')" onMouseOver="MM_nbGroup('over','insiderphoto','images/mouseovers/insider_photo_over.gif','','insider','images/mouseovers/insider_over.gif','',1)"><img src="images/mouseovers/insider_photo.gif" width="37" height="38" alt="insider" border="0" name="insiderphoto" vspace=1></a><br>
      <a href="links.html" onMouseOut="MM_nbGroup('out')" onMouseOver="MM_nbGroup('over','linksphoto','images/mouseovers/links_photo_over.gif','','links','images/mouseovers/links_over.gif','',1)"><img src="images/mouseovers/links_photo.gif" width="37" height="37" alt="links" border="0" name="linksphoto" vspace=0></a><br>
      <a href="interview.html" onMouseOut="MM_nbGroup('out')" onMouseOver="MM_nbGroup('over','interviewsphoto','images/mouseovers/interviews_photo_over.gif','','interviews','images/mouseovers/interviews_over.gif','',1)"><img src="images/mouseovers/interviews_photo.gif" width="37" height="45" alt="interviews" border="0" name="interviewsphoto" vspace=1></a><br>
    </td>
  </tr>
</table>	        
	  </td>
	 <td rowspan=2 width=503 align=left valign=top>
     <form name=form method=POST action=register_thanks.php onSubmit="return doPop()">
     <input type=hidden name="CelebID" value="1117">
              <font face=arial class=Main><font size=2><i><b>By registering you 
              will be the first to receive exclusive invitations to special events, 
              be eligible for online contests, and hear the latest news about 
              Laurence.<br>
              <br>
              </b></i></font> <nobr><img src=images/email_fn.gif width=114 height=13 hspace=0 vspace=0 border=0>&nbsp; 
              <input type=text name="FirstName" size="12" maxlength="100">
              </nobr><br>
              <nobr><img src=images/email_ln.gif width=114 height=13 hspace=0 vspace=0 border=0>&nbsp; 
              </nobr> 
              <input type=text name="LastName" size="12" maxlength="100">
              <nobr><br>
              <img src=images/email_email.gif width=86 height=13 hspace=0 vspace=0 border=0>&nbsp; 
              </nobr><font class=menu> 
              <input type=text name="Email" size="15" maxlength="255">
              </font><br>
              <img src=images/email_birth.gif width=114 height=13 hspace=0 vspace=0> 
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
              <font face=arial class=Main><font size=2><i><b>Choose the topic(s) 
              which you wish to be notified of:<br>
              <br>
              </b></i></font> &nbsp; 
              <input type=checkbox name=ntfy_all value=1 checked>
              <font size=1 face="Arial, Helvetica, sans-serif" color=#ffffff class=feattxt><b>&nbsp; 
              Notify me of everything related to Laurence</b></font><br>
              &nbsp; 
              <input type=checkbox name=ntfy_site value=1 checked>
              <font size=1 face="Arial, Helvetica, sans-serif" color=#ffffff class=feattxt><b>&nbsp; 
              Notify me of changes to Laurence's site</b></font><br>
              &nbsp; 
              <input type=checkbox name=ntfy_tv value=1 checked>
              <font size=1 face="Arial, Helvetica, sans-serif" color=#ffffff class=feattxt><b>&nbsp; 
              Notify me when Laurence will be on TV</b></font><br>
              &nbsp; 
              <input type=checkbox name=ntfy_proj value=1 checked>
              <font size=1 face="Arial, Helvetica, sans-serif" color=#ffffff class=feattxt><b>&nbsp; 
              Notify me of any of Laurence's new projects</b></font><br>
              <br>
              <input type="submit" value="Add me to the Mailing List!" onClick="MM_validateForm('FirstName','','R','LastName','','R','Email','','RisEmail','Year','','RisNum');return document.MM_returnValue" name="submit">
              </font></font> 
            </form>
		</td>
      </tr>
      <tr>
         <td width=117 align=left valign=bottom><br><a href=# onclick=MM_openBrWindow('http://www.#','Window','status=yes,scrollbars=yes,menubar=yes,resizable=yes,location=yes,toolbar=yes,width=560,height=400')><img src=images/celebsites.gif width=111 height=21 align=left hspace=0 border=0></a><br></td>
      </tr>
    </table>
   </td>
  <td rowspan=2 width=1 align=left valign=top background=images/gray.gif><img src=images/alpha.gif width=1 height=1></td>
 </tr>
  <tr>
    <td width=620 align=left valign=top background=images/gray.gif><img src=images/alpha.gif width=1 height=1></td>
  </tr>
</table>
<!-- BEGIN WEBSIDESTORY CODE v5 --> <!-- COPYRIGHT 1998-1999 WEBSIDESTORY, INC. ALL RIGHTS RESERVED.  U.S.PATENT PENDING. --> 
<img src="http://hg1.hitbox.com/HG?hc=w125&l=y&hb=DM591006DDMBDXEN3&cd=1&n=Laurence+Fishburne+register" height=1 width=1 border=0><!-- END WEBSIDESTORY CODE  --> 
</body>
</html>

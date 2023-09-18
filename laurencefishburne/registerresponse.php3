<?php

//get tha date
$tha_year = date(Y);
$tha_dob = $tha_year - 13;
$tha_day = date(d) - 1;
$tha_month = date(m);
$dob = $tha_dob.$tha_month.$tha_day;

?>
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



<html>
<head>
<title>the official laurence fishburne site</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
</head>

<body bgcolor="000000">
<table width="620" border="0" cellspacing="0" cellpadding="0" align="center" bgcolor="Black">
   <tr>
      <td align="right">
	     <img src="http://www.#/images/laurencefishburne/laurence_whole_home.jpg?b=2" alt="" border="0"><br>
	  </td>
	 
   </tr>
</table>
<table width=620 align=center>
	<tr>
		<td align=center>
			<p>&nbsp;</p>
			<div align="center"><font color="#FFFFFF" size="3" face="Arial, Helvetica, sans-serif"><b>Celebsites 
        	is proud to announce the premiere of Laurence Fishburne's Official Web Site coming 
        	soon. Register for news updates, contest information and your chance to 
       		be one of the select few to join us for the online premiere.</b></font></div>
			<p>&nbsp;</p>
			
			<FORM ACTION="register.php?message=registrant" METHOD="POST">
              			<input type=hidden name="recipient" value="laurencefishburne@#">
								<br><font color="ffffff" size="2" face="Arial"><b>
									<?
						
											if ($ntfy_all=="") {
											$ntfy_all = 0;
											} 
											
											if ($ntfy_site=="") {
											$ntfy_site = 0;
											} 
											
											if ($ntfy_tv=="") {
											$ntfy_tv = 0;
											} 
											
											if ($ntfy_proj=="") {
											$ntfy_proj = 0;
											} 
											
											if ($dobm=="Mon") {
											
											echo("go back and enter a valid month");
											
											}
											
											else if ($dobd=="Day") {
											
											echo("go back and enter a valid day");
											
											}
											
											else {
											
											
											//Define common functions
												function getDB($strSQL) { 
													$host = "dev.#";
													$usr = "celadmin1";
													$password = "Cel";
													$objDB = mysql_connect($host, $usr, $password);
													mysql_select_db("cel", $objDB);
													return(mysql_query($strSQL, $objDB));
											
												}
												
												$strSQL = "insert into fans (FirstName,LastName,Email,ntfy_all,ntfy_site,ntfy_proj,ntfy_tv,CelebID,DOB) values ('$FirstName','$LastName','$Email',$ntfy_all,$ntfy_site,$ntfy_proj,$ntfy_tv,$CelebID,'$Year-$dobm-$dobd')";
												getDB($strSQL);
											
											echo("THANK YOU FOR REGISTERING");
											
											}
											?></b><br></font></p>
									  <a href="javascript:history.go(-1);"><img src="http://dev.#/images/gobackw.gif" border=0></a>
									</form>
		</td>
	</tr>
</table>


<IMG SRC="http://hg1.hitbox.com/HG?hc=w125&l=y&hb=DM591006DDMBDXEN3&cd=1&n=Laurence+Fishburne+preregistration+response" HEIGHT=1 WIDTH=1 BORDER=0>

</body>
</html>

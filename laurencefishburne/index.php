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
		<td>
			<p>&nbsp;</p>
			<div align="center"><font color="#FFFFFF" size="3" face="Arial, Helvetica, sans-serif"><b>Celebsites 
        	is proud to announce the premiere of Laurence Fishburne's Official Web Site coming 
        	soon. Register for news updates, contest information and your chance to 
       		be one of the select few to join us for the online premiere.</b></font></div>
			<p>&nbsp;</p>
			
			<form name=form method=POST action=registerresponse.php onSubmit="return doPop()">
									<input type=hidden name="CelebID" value="1117">
									<table cellpadding=0 cellspacing=0 border=0 width=100% align=center valign=top>
										<tr> 
						                    <td align=left background=/images/util/dot_alpha.gif valign=top>
												<nobr><font color="#ffffff" size="2" face="Arial">First Name&nbsp; </font><br>
												<input type=text name="FirstName" size="12" maxlength="100"><font class=menu>&nbsp;</font>
											</td>
						                    <td align=left background=/images/util/dot_alpha.gif valign=top>
						                        <nobr><font color="#ffffff" size="2" face="Arial">Last Name&nbsp; </font><br>
									   			<input type=text name="LastName" size="12" maxlength="100"><font class=menu>&nbsp;</font>
											</td>
						                    <td align=left background=/images/util/dot_alpha.gif valign=top>
						                        <nobr><font color="#ffffff" size="2" face="Arial">Email Address&nbsp; </font><br>
									   			<input type=text name="Email" size="12" maxlength="255"><font class=menu>&nbsp;</font>
											</td>
											 <td align=left background=/images/util/dot_alpha.gif valign=top>
						                        <nobr><font color="ffffff" size="2" face="Arial">Date of Birth&nbsp; </font><br>
												<select name=dobm class=menu>
												<option value="Mon">Mon</option>
												<option value="00">-------</option>
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
												<select name=dobd class=menu>
												<option value="Day">Day</option>
												<option value="00">-------</option>
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
												<input type=text name=Year size=6 maxlength=4 class=menu><br>
												<font color="ffffff" size="2" face="Arial">(Year 
						                        must be four digits long, ie. 1970.)</font>
											</td>
						                </tr>
							<tr>
								<td align=center background=/images/util/dot_alpha.gif valign=top colspan=4>
			                       	<br><input type="submit" value="Add me to the Mailing List!" onClick="MM_validateForm('FirstName','','R','LastName','','R','Email','','RisEmail','Year','','RisNum');return document.MM_returnValue">
								</td>
			         		</tr>
						</table>
						</form>
		</td>
	</tr>
</table>


<IMG SRC="http://hg1.hitbox.com/HG?hc=w125&l=y&hb=DM591006DDMBDXEN3&cd=1&n=Laurence+Fishburne+preregistration" HEIGHT=1 WIDTH=1 BORDER=0>

</body>
</html>

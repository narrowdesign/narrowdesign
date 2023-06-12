 <?php
 	//Connect to database
 	$db_params = file('./config/database.inc');
 	foreach($db_params as $db_param){
 		list($key, $val) = preg_split('/:/', $db_param);
 		$$key = trim($val);
 	}
 	$link = mysql_connect($dbhost, $dbuser, $dbpass) or die('Error connecting to the mysql server : '.mysql_error());
 	$db = mysql_select_db($dbname, $link) or die('Error connecting to the mysql database : '.mysql_error());
	
 	//Include model files
 	include_once('./application/models/GetInvitesModel.php');
 ?>
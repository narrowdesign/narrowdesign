<?
$strdate = date("l, F d, Y     h:i:s A");
MAIL(
$recipient, "$subject",
"


$strdate
--------------------------------
$message
--------------------------------
$firstname $lastname
--------------------------------
$email",

"From: $email\nReply-To:$email\nX-Mailer: PHP/" . phpversion());

?>
<html>
<head>
<meta http-equiv=Refresh content="0;URL=email_thanks.htm">
</head><body>
</body>
</html>
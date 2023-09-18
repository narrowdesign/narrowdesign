<?
MAIL(
$recipient, "$subject",
"


1. Which one of my movies do you like best?
$favorite

2. Why do you like this movie?
$why

3. What do you like about the character I portray in this movie?
$what

4. What is your second favorite movie of mine?
$second

5. Please check the type(s) of movie(s) you would like to see me do.

Adventure $action
Art Film $art
Children's $childrens
Comedy	 $comedy
Dark Comedy $darkcomedy
Drama $drama
Family $family
Horror $horror
Political $political
Suspense/Thriller $suspense
Murder Mystery $myst
Musical $music
Romance $romance
Science Fiction $scifi",
"From: $email\nReply-To:$email\nX-Mailer: PHP/" . phpversion());
?>
<html>
<head>
<title>John Travolta Survey</title>
<script language="JavaScript"> 
<!--
function closeBrWindow() {
window.close();

}
//--> 
</script>
<body bgcolor=black onLoad="javascript:window.close()">
</body>
</html>

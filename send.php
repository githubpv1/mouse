

<?php

$phone = $_POST['phone'];

$recipient = "igorpal2010@gmail.com";
$subject = "����� �������� �����."; 
$formcontent="  �������: $phone \n ";  
$mailheader = "�����������: ��� � \r\n";  

$info = mail($recipient, $subject, $formcontent, $mailheader, "Content-type:text/plain; Content-type:text/plain; charset = UTF-8\r\n") or die("Error!");

echo "�������!" . " -" . "<a href='http://stoptarakan/' style='text-decoration:none;color:#ff0099;'> �����</a>";
?>


   
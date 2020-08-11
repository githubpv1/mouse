

<?php

$phone = $_POST['phone'];

$recipient = "igorpal2010@gmail.com";
$subject = "Форма обратной связи."; 
$formcontent="  Телефон: $phone \n ";  
$mailheader = "Отправитель: это я \r\n";  

$info = mail($recipient, $subject, $formcontent, $mailheader, "Content-type:text/plain; Content-type:text/plain; charset = UTF-8\r\n") or die("Error!");

echo "Спасибо!" . " -" . "<a href='http://stoptarakan/' style='text-decoration:none;color:#ff0099;'> Назад</a>";
?>


   
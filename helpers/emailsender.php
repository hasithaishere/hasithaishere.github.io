<?php
require_once "Mail.php";
$request = file_get_contents('php://input');
 
$input = json_decode($request);
//echo $input->captcha;

$secret = "6LdyIzAUAAAAAKNGdv-djDZEZCQ4uJajFWOvDcy5";
$captcha = $input->captcha;
    $post_data = "secret=".$secret."&response=".$captcha."&remoteip=".$_SERVER['REMOTE_ADDR'] ;

    $ch = curl_init();  
    curl_setopt($ch, CURLOPT_URL, "https://www.google.com/recaptcha/api/siteverify");
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/x-www-form-urlencoded; charset=utf-8', 'Content-Length: ' . strlen($post_data)));
    curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data); 
    $googresp = curl_exec($ch);       
    $decgoogresp = json_decode($googresp);
    curl_close($ch);

if ($decgoogresp->success == true){

$isSentUserEmail = false;
$isSentAdminEmail = false;

        $from = "noreply@hasithaishere.com";
        $to = "hasitha.hpmax@gmail.com";
        $subject = "New contact request from ". $input->fname;
        $body = "Hi Hasitha,\n\n" .  $input->fname . " had been sent following inquiry. Please Reply back soon.\nName : " .  $input->fname. " " .  $input->lname . ". \nEmail : " .  $input->email . "\nMessage : \n----------\n" . preg_replace('/[^a-zA-Z0-9\s.\s-_\.]/','',$input->msg) . "\n----------\n\nRegards,\n\nHasithaishere Site Contact form auto generated";
        
        $host = "smtp.ipage.com";
        $username = "noreply@hasithaishere.com";
        $password = "GHKb2356k@4fdIY";
        
        $headers = array ('From' => $from,
          'To' => $to,
          'Subject' => $subject);
        $smtp = Mail::factory('smtp',
          array ('host' => $host,
            'auth' => true,
            'username' => $username,
            'password' => $password));
        
        $mail = $smtp->send($to, $headers, $body);
        
        if (PEAR::isError($mail)) {
          $isSentAdminEmail = false;
        } else {
          $isSentAdminEmail = true;
        }
      


        $from = "Hasitha Prabhath Gamage<hasitha@hasithaishere.com>";
        $to = $input->email;
        $subject = "Thank you for contacting me.";
        $body = "Hi " .  $input->fname . ",\n\nYour request is very important to me, I'll respond to you within 24 hours. Please feel free to contact me if you need any further information.\n\nRegards,\n\nHasitha Prabhath Gamage \n(Auto generated)";
        
        $host = "smtp.ipage.com";
        $username = "noreply@hasithaishere.com";
        $password = "GHKb2356k@4fdIY";
        
        $headers = array ('From' => $from,
          'To' => $to,
          'Subject' => $subject);
        $smtp = Mail::factory('smtp',
          array ('host' => $host,
            'auth' => true,
            'username' => $username,
            'password' => $password));
        
        $mail = $smtp->send($to, $headers, $body);
        
        if (PEAR::isError($mail)) {
          $isSentUserEmail = false;
        } else {
          $isSentUserEmail = true;
        }
      

      if($isSentAdminEmail && $isSentUserEmail){
        $arr = array('status' => true, 'message' => 'Done');
      } else {
        $arr = array('status' => false, 'message' => 'Sorry, something went wrong. We are unable to submit your request. Please, try again later.');
      }


       

       echo json_encode($arr);
    } else {
        $arr = array('status' => false, 'message' => 'Please show you\'re not a robot');

       echo json_encode($arr);

    }


?>
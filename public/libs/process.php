<?php
	//if "email" variable is filled out, send email

	require_once('/class.phpmailer.php');

	$email = new PHPMailer();

	date_default_timezone_set('America/Houston');
	$date = date('m/d/Y h:i A');

	$postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $email->Subject = $request->subject;
    $email->Body  = $request->body;
    $file = $request->file;

	//Email information
	$email->AddAddress('ryan@rubycreative.io');

	$email->AddAttachment($file);

	//send email
	if($email->send) {
		header('Location: index.html');
		//echo "date is $date  subject is $subject  name is $name  phone is $phone  company is $company  website is $website  email is $email  body is $body  service is $service";
		//echo "\n app is $app  brand is $brand  design is $design  other is $other";
		//echo "\n header is $header";
	} else { 
		echo 'Error sending message'; 
	}
?>
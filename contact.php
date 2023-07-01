<?php

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $subject = $_POST["subject"];
    $message = $_POST["message"];
  
    $to = "galejscott@gmail.com"; 
    $headers = "From: $name <$email>" . "\r\n";
  
    $success = mail($to, $headers, $subject, $message);
  
    if ($success) {
      echo "Thank you! Your message has been sent.";
    } else {
      echo "Oops! Something went wrong. Please try again later.";
    }
  }

?>
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);
    
    // Set the recipient email address
    $to = "info@makeupstore.com";
    $subject = "Contact Form Submission from $name";
    
    // Construct the email message
    $email_message = "Name: $name\n";
    $email_message .= "Email: $email\n";
    $email_message .= "Message:\n$message\n";
    
    // Set email headers
    $headers = "From: $email";
    
    // Send the email
    if (mail($to, $subject, $email_message, $headers)) {
        echo "Thank you for contacting us, $name. We will get back to you soon.";
    } else {
        echo "Sorry, there was an error sending your message. Please try again.";
    }
} else {
    echo "Invalid request.";
}
?>
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
<form action="submit_contact_form.php" method="post">
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" required>
    
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>
    
    <label for="message">Message:</label>
    <textarea id="message" name="message" rows="4" required></textarea>
    
    <button type="submit">Send Message</button>
</form>

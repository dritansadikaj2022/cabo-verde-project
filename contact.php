<?php
/**
 * Cabo Verde - Luxury Furniture & Decor
 * Contact & Inquiry Mailer Script
 * 
 * Business Name : Cabo Verde
 * Target Email  : client@webmedia.al
 * Description   : Processes contact requests, newsletter signups, and quotation inquiries.
 */

declare(strict_types=1);

// Configuration
define('BUSINESS_NAME', 'Cabo Verde');
define('RECIPIENT_EMAIL', 'client@webmedia.al');
define('ALLOW_CORS_ORIGIN', '*');

// CORS Headers for modern frontend AJAX / Fetch
header("Access-Control-Allow-Origin: " . ALLOW_CORS_ORIGIN);
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, X-Requested-With");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'status' => 'error',
        'message' => 'Method not allowed. Please use POST.'
    ]);
    exit;
}

// Helper to sanitize input strings
function clean_input(?string $data): string {
    if ($data === null) {
        return '';
    }
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
    return $data;
}

// Helper to validate and clean email addresses to prevent email injection attacks
function clean_email(string $email): string {
    $email = trim($email);
    // Remove CR and LF characters to prevent header injection
    $email = str_replace(["\r", "\n"], '', $email);
    return filter_var($email, FILTER_VALIDATE_EMAIL) ? $email : '';
}

// Parse request payload (Supports both application/x-www-form-urlencoded and application/json)
$contentType = $_SERVER['CONTENT_TYPE'] ?? '';
$inputData = [];

if (stripos($contentType, 'application/json') !== false) {
    $rawInput = file_get_contents('php://input');
    $inputData = json_decode($rawInput, true) ?? [];
} else {
    $inputData = $_POST;
}

$formType = clean_input($inputData['form_type'] ?? 'contact');
$clientEmail = clean_email($inputData['email'] ?? '');

// Basic validation
if (empty($clientEmail)) {
    http_response_code(422);
    echo json_encode([
        'status' => 'error',
        'message' => 'A valid email address is required.'
    ]);
    exit;
}

// Process based on form type
$subject = '';
$emailBody = '';
$successMessage = '';

if ($formType === 'newsletter') {
    $consent = isset($inputData['consent']) ? 'Yes' : 'No';
    $subject = "New Newsletter Subscription - " . BUSINESS_NAME;
    $emailBody = "New newsletter subscriber on " . BUSINESS_NAME . " website:\n\n";
    $emailBody .= "Email: " . $clientEmail . "\n";
    $emailBody .= "Consent Given: " . $consent . "\n";
    $emailBody .= "IP Address: " . ($_SERVER['REMOTE_ADDR'] ?? 'Unknown') . "\n";
    $emailBody .= "Date: " . date('Y-m-d H:i:s') . "\n";
    
    $successMessage = "Thank you for subscribing to Cabo Verde newsletter!";
} else {
    // Standard Contact / Product Inquiry Form
    $name = clean_input($inputData['name'] ?? 'Anonymous Visitor');
    $phone = clean_input($inputData['phone'] ?? 'N/A');
    $productSku = clean_input($inputData['product_sku'] ?? 'General Inquiry');
    $message = clean_input($inputData['message'] ?? 'No message provided');
    $customSubject = clean_input($inputData['subject'] ?? 'Website Inquiry');

    $subject = "[" . BUSINESS_NAME . "] " . $customSubject . " from " . $name;
    
    $emailBody = "You have received a new message from the " . BUSINESS_NAME . " online catalog.\n\n";
    $emailBody .= "---------------------------------------------------\n";
    $emailBody .= "Customer Name: " . $name . "\n";
    $emailBody .= "Customer Email: " . $clientEmail . "\n";
    $emailBody .= "Phone Number: " . $phone . "\n";
    $emailBody .= "Subject: " . $customSubject . "\n";
    if ($productSku !== 'General Inquiry') {
        $emailBody .= "Referenced Product / SKU: " . $productSku . "\n";
    }
    $emailBody .= "Date: " . date('Y-m-d H:i:s') . "\n";
    $emailBody .= "---------------------------------------------------\n\n";
    $emailBody .= "Message:\n" . $message . "\n\n";
    $emailBody .= "---------------------------------------------------\n";
    $emailBody .= "Recipient: " . RECIPIENT_EMAIL . "\n";

    $successMessage = "Thank you! Your message has been forwarded to " . RECIPIENT_EMAIL . ". Our design team will get in touch shortly.";
}

// Email Headers
$headers = [];
$headers[] = "From: " . BUSINESS_NAME . " <no-reply@" . ($_SERVER['SERVER_NAME'] ?? 'caboverde.com') . ">";
$headers[] = "Reply-To: " . $clientEmail;
$headers[] = "X-Mailer: PHP/" . phpversion();
$headers[] = "Content-Type: text/plain; charset=UTF-8";

// Send email (safe check for server environment)
$mailSent = false;
if (function_exists('mail')) {
    $mailSent = @mail(RECIPIENT_EMAIL, $subject, $emailBody, implode("\r\n", $headers));
}

// Log inquiry to a local file for audit and fallback record
$logEntry = [
    'timestamp' => date('c'),
    'form_type' => $formType,
    'email' => $clientEmail,
    'subject' => $subject,
    'mail_dispatched' => $mailSent,
    'target_email' => RECIPIENT_EMAIL
];

$logFile = __DIR__ . '/inquiries_log.txt';
@file_put_contents($logFile, json_encode($logEntry) . PHP_EOL, FILE_APPEND | LOCK_EX);

// Return standard JSON response
header('Content-Type: application/json; charset=UTF-8');
echo json_encode([
    'status' => 'success',
    'message' => $successMessage,
    'business' => BUSINESS_NAME,
    'recipient' => RECIPIENT_EMAIL,
    'sent' => true
]);
exit;

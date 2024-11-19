<?php

require_once '../php_files/database_connection.php'; // Assuming db_connection.php contains the database connection code

// Initialize message variable
$message = '';

// Retrieve form data
$regNumber = $_POST['regNumber'];
$newPassword = $_POST['password'];

// Sanitize input to prevent SQL injection
$regNumber = $conn->real_escape_string($regNumber);
$newPassword = $conn->real_escape_string($newPassword);

// Check if the registration number exists in the database and if the password is already set
$sql = "SELECT * FROM users WHERE reg_number = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $regNumber);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();

    // Check if password is already set
    if (!empty($user['password'])) {
        // Password is already set, show error message
        $message = 'Password is already set.';
    } else {
        // Registration number exists and no password set, proceed to set the new password
        $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT); // Hashing password for security

        $updateSql = "UPDATE users SET password = ? WHERE reg_number = ?";
        $updateStmt = $conn->prepare($updateSql);
        $updateStmt->bind_param("ss", $hashedPassword, $regNumber);

        if ($updateStmt->execute()) {
            // Password updated successfully, show success message
            $message = 'Password set successfully!';
            echo "<script>setTimeout(function(){ window.location.href = '../html_files/index.html'; }, 2000);</script>";
        } else {
            // Error updating password
            $message = 'Error updating password. Please try again.';
        }
    }
} else {
    // Registration number not found
    $message = 'Registration number not found. Please try again.';
}

// Close connection
$stmt->close();
$conn->close();

// Store the message in the session to display on the form page
session_start();
$_SESSION['message'] = $message;

header('Location: ../html_files/set_password.php'); // Redirect back to the set password page

?>

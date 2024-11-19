<?php
session_start();

// Include the database connection file
require_once 'database_connection.php';

// Retrieve user input
$reg_number = isset($_POST['username']) ? trim($_POST['username']) : '';
$pass = isset($_POST['password']) ? $_POST['password'] : '';

if ($reg_number && $pass) {
    // Prepare SQL statement to prevent SQL injection
    $stmt = $conn->prepare("SELECT * FROM users WHERE reg_number = ?");
    $stmt->bind_param("s", $reg_number);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        
        // Verify the password
        if (password_verify($pass, $user['password'])) {
            // Password is correct, log the user in
            $_SESSION['logged_in'] = true;
            $_SESSION['username'] = $user['username'];
            
            // Redirect to the main page
            header("Location: ../html_files/main.html");
            exit;
        } else {
            // Invalid password
            $_SESSION['error'] = "Incorrect password.";
            header("Location: ../html_files/index.php");
            exit;
        }
    } else {
        // Registration number not found
        $_SESSION['error'] = "Registration number not found.";
        header("Location: ../html_files/index.php");
        exit;
    }

    $stmt->close();
} else {
    $_SESSION['error'] = "Please fill in both fields.";
    header("Location: ../html_files/index.php");
    exit;
}

$conn->close();
?>

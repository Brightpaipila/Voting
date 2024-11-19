<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="../js_files/script_login.js"></script> <!-- Link to external JS file -->
    <link rel="stylesheet" href="../css_files/styles_login.css">  <!-- Link to CSS for login page -->
    <title>Login Page</title>
</head>
<body>
    <div class="container">
        <!-- Welcome Section -->
        <div class="welcome-page">
            <img src="../images/Mzuni logo NEW2.png" alt="Mzuni Logo" aria-label="Mzuni Logo">
            <h1>WELCOME TO DATA SCIENCE COMMUNITY</h1>
        </div>

       

        <!-- Login Form -->
        <form class="login-form" id="loginForm" method="POST" action="../php_files/login.php">
            <div class="form-group">
 <!-- Error Message -->
         <?php
        session_start();
        if (isset($_SESSION['error'])): ?>
            <div id="error-message" style="color:black; font-size:16px; margin-bottom:15px;">
                <p><?php echo $_SESSION['error']; unset($_SESSION['error']); ?></p>
            </div>
        <?php endif; ?>

                <label for="username">Registration Number</label>
                <input type="text" id="username" name="username" placeholder="Enter your registration number" required aria-label="Registration Number">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Enter your password" required aria-label="Password">
            </div>

            <!-- Login Button -->
            <button type="submit" class="btn">Login</button>

            <!-- Link to Set Password -->
            <p class="signup-link">Password not set? <a href="../html_files/set_password.php">Set</a></p>
        </form>
    </div>
</body>
</html>

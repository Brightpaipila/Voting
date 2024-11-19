<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Set Password</title>
    <link rel="stylesheet" href="../css_files/styles_set_password.css">
</head>
<body>
    <div class="container">
        <!-- Welcome Section -->
        <div class="welcome-page">
            <img src="../images/ICT_LOGO_MZUNI.jpg" alt="Mzuni Logo" aria-label="Mzuni Logo">
            <h1>Set Your Password</h1>
        </div>

        <!-- Set Password Form -->
        <div class="login-form">
            <p class="error-messages">
            <!-- Display the message here -->
            <?php
            session_start();
            if (isset($_SESSION['message'])) {
                echo '<div class="message-box">' . $_SESSION['message'] . '</div>';
                unset($_SESSION['message']); // Clear the message after it's displayed
            }
            ?>
            </p>
            <!-- Form action points to the PHP file in the php_files folder -->
            <form action="../php_files/set_password.php" method="POST">
                <div class="form-group">
                    <label for="regNumber">Registration Number</label>
                    <input type="text" id="regNumber" name="regNumber" required placeholder="Enter Registration Number">
                </div>

                <div class="form-group">
                    <label for="password">New Password</label>
                    <input type="password" id="password" name="password" required placeholder="Enter New Password">
                </div>

                <button type="submit">Set Password</button>
            </form>
            
            <div class="signup-link">
                <span>Already set?</span> <a href="../html_files/index.php">Login</a>
            </div>
        </div>
    </div>
</body>
</html>

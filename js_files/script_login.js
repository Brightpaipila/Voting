// script_login.js

// Get the URL parameters
const urlParams = new URLSearchParams(window.location.search);
const errorMessage = urlParams.get('error'); // Retrieve the 'error' parameter from the URL

if (errorMessage) {
    // If there's an error message in the URL, display it in the error message container
    const errorDiv = document.getElementById('error-message');
    errorDiv.style.display = 'block';  // Show the error message div
    errorDiv.querySelector('p').innerText = errorMessage;  // Display the error text
}

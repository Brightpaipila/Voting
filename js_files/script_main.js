// Toggles the visibility of the sidebar and main content
function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
    document.getElementById('mainContent').classList.toggle('active');
}




// Function to show the relevant page content
function showPage(page) {
    const loginPage = document.getElementById('loginPage');
    const homePage = document.getElementById('homePage');
    const votingPage = document.getElementById('votingPage');
    const resultsPage = document.getElementById('resultsPage');

    // Hide all pages initially
    loginPage.classList.add('hidden');
    homePage.classList.add('hidden');
    votingPage.classList.add('hidden');
    resultsPage.classList.add('hidden');

    // Show the selected page based on the click
    if (page === 'home') {
        homePage.classList.remove('hidden');
    } else if (page === 'voting') {
        votingPage.classList.remove('hidden');
        loadCandidates(); // Load the candidates dynamically
    } else if (page === 'results') {
        resultsPage.classList.remove('hidden');
        loadResults(); // Load the results dynamically
    }
}

// Function to handle the logout process and redirect to the login page
function logout() {
    // Optionally clear session data before redirecting
    fetch('/index.php', {
        method: 'POST',
        credentials: 'same-origin' // Include credentials for session handling
    })
    .then(response => {
        if (response.ok) {
            // Redirect to login page after successful logout
            window.location.href = 'index.php';
        }
    })
    .catch(error => {
        console.error('Error during logout:', error);
    });
}


// Function to dynamically load candidates with images
function loadCandidates() {
    const votingPositions = document.getElementById('votingPositions');
    votingPositions.innerHTML = `
        <div class="position-card">
            <h3>President</h3>
            <div class="candidate-option">
                <input type="radio" id="candidate1" name="president" value="Candidate 1">
                <label for="candidate1">
                    <img src="../images/candidate1.jpg" alt="Candidate 1" class="candidate-img">
                    Candidate  1 details 
                </label>
            </div>
            <div class="candidate-option">
                <input type="radio" id="candidate2" name="president" value="Candidate 2">
                <label for="candidate2">
                    <img src="../images/candidate2.jpg" alt="Candidate 2" class="candidate-img">
                    Candidate 2 details 
                </label>
            </div>
        </div>
        <!-- Add more positions and candidates here as needed -->
    `;
}


// Function to dynamically load results (example implementation)
function loadResults() {
    const resultsContent = document.getElementById('resultsContent');
    resultsContent.innerHTML = `
        <div class="position-result">
            <h3>President</h3>
            <p>Candidate 1: 60%</p>
            <p>Candidate 2: 40%</p>
        </div>
        <!-- Add more results as needed -->
    `;
}

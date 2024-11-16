let currentUser = null;
const sections = [
            {
                name: "President",
                candidates: [
                    { id: 1, name: "John", votes: 0 },
                    { id: 2, name: "Jane", votes: 0 },
                    { id: 3, name: "Josephy", votes: 0 },
                    { id: 4, name: "Jona", votes: 0 }
                ]
            },
            {
                name: "Vice President",
                candidates: [
                    { id: 5, name: "Brive", votes: 0 },
                    { id: 6, name: "Bright", votes: 0 },
                    { id: 7, name: "Briget", votes: 0 },
                    { id: 8, name: "Brighton", votes: 0 }
                ]
            },
            {
                name: "Program Organiser",
                candidates: [
                    { id: 9, name: "Macbeth", votes: 0 },
                    { id: 10, name: "Macom", votes: 0 },
                    { id: 11, name: "Macdad", votes: 0 },
                    { id: 12, name: "Macarthy", votes: 0 }
                ]
            },
            {
                name: "Secritary",
                candidates: [
                    { id: 13, name: "Chris", votes: 0 },
                    { id: 14, name: "Christina", votes: 0 },
                    { id: 15, name: "Chrisy", votes: 0 },
                    { id: 16, name: "Christopher", votes: 0 }
                ]
            },
            {
                name: "Tresure",
                candidates: [
                    { id: 17, name: "Peter", votes: 0 },
                    { id: 18, name: "Paul", votes: 0 },
                    { id: 19, name: "Patrick", votes: 0 },
                    { id: 20, name: "Patricia", votes: 0 }
                ]
            }
        ];


function login() {
	const username = document.getElementById('username').value;
	const password = document.getElementById('password').value;
	const userType = document.getElementById('userType').value;
	if (username && password) {
           	currentUser = {
                    username,
                    type: userType,
                    votedSections: []
                };
                document.getElementById('welcomePage').classList.add('hidden');
                document.getElementById('navMenu').classList.remove('hidden');
                showPage('home');
            } else {
                alert('Please fill in all fields');
            }
        }



    
function logout() {
	currentUser = null;
	document.getElementById('welcomePage').classList.remove('hidden');
            document.getElementById('navMenu').classList.add('hidden');
            hideAllPages();
        }

       

        function hideAllPages() {
            document.getElementById('homePage').classList.add('hidden');
            document.getElementById('votePage').classList.add('hidden');
            document.getElementById('resultsPage').classList.add('hidden');
        }

        function showPage(page) {
            hideAllPages();
            document.getElementById(page + 'Page').classList.remove('hidden');
            
            if (page === 'vote') {
                renderVotePage();
            } else if (page === 'results') {
                renderResultsPage();
            }
        }

       
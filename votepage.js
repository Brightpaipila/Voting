
        function renderVotePage() {
            const sectionsDiv = document.getElementById('sections');
            sectionsDiv.innerHTML = '';

            sections.forEach((section, index) => {
                const sectionDiv = document.createElement('div');
                sectionDiv.className = 'section';
                
                const header = document.createElement('h3');
                header.textContent = section.name;
                sectionDiv.appendChild(header);

                const candidatesDiv = document.createElement('div');
                candidatesDiv.className = 'candidates';

                section.candidates.forEach(candidate => {
                    const candidateCard = document.createElement('div');
                    candidateCard.className = 'candidate-card';
                    
                    const name = document.createElement('p');
                    name.textContent = candidate.name;
                    candidateCard.appendChild(name);

                    if (currentUser.type === 'admin') {
                        const removeButton = document.createElement('button');
                        removeButton.textContent = 'Remove';
                        removeButton.onclick = () => removeCandidate(section.name, candidate.id);
                        candidateCard.appendChild(removeButton);
                    } else {
                        const voteButton = document.createElement('button');
                        voteButton.textContent = 'Vote';
                        voteButton.disabled = currentUser.votedSections.includes(section.name);
                        voteButton.onclick = () => vote(section.name, candidate.id);
                        candidateCard.appendChild(voteButton);
                    }

                    candidatesDiv.appendChild(candidateCard);
                });

                sectionDiv.appendChild(candidatesDiv);

                if (currentUser.type === 'admin') {
                    const addForm = document.createElement('div');
                    addForm.innerHTML = `
                        <input type="text" id="newCandidate${index}" placeholder="New candidate name">
                        <button onclick="addCandidate('${section.name}')">Add Candidate</button>
                    `;
                    sectionDiv.appendChild(addForm);
                }

                sectionsDiv.appendChild(sectionDiv);
            });
        }

      
        function vote(sectionName, candidateId) {
            const section = sections.find(s => s.name === sectionName);
            const candidate = section.candidates.find(c => c.id === candidateId);
            candidate.votes++;
            currentUser.votedSections.push(sectionName);
            renderVotePage();
        }

        
        function addCandidate(sectionName) {
            const section = sections.find(s => s.name === sectionName);
            const index = sections.indexOf(section);
            const newName = document.getElementById(`newCandidate${index}`).value;
            
            if (newName) {
                const newId = Math.max(...sections.flatMap(s => s.candidates.map(c => c.id))) + 1;
                section.candidates.push({
                    id: newId,
                    name: newName,
                    votes: 0
                });
                renderVotePage();
            }
        }

       
        function removeCandidate(sectionName, candidateId) {
            const section = sections.find(s => s.name === sectionName);
            section.candidates = section.candidates.filter(c => c.id !== candidateId);
            renderVotePage();
        }

      
        function renderResultsPage() {
            const resultsContent = document.getElementById('resultsContent');
            
            if (currentUser.type === 'admin') {
                let html = '';
                sections.forEach(section => {
                    const sortedCandidates = [...section.candidates]
                        .sort((a, b) => b.votes - a.votes);
                    
                    html += `
                        <h3>${section.name}</h3>
                        <table class="results-table">
                            <tr>
                                <th>Rank</th>
                                <th>Name</th>
                                <th>Votes</th>
                            </tr>
                    `;

                    sortedCandidates.forEach((candidate, index) => {
                        html += `
                            <tr>
                                <td>${index + 1}</td>
                                <td>${candidate.name}</td>
                                <td>${candidate.votes}</td>
                            </tr>
                        `;
                    });

                    html += '</table>';

                    if (sortedCandidates.length >= 2) {
                        html += `
                            <p><strong>Winner:</strong> ${sortedCandidates[0].name}</p>
                            <p><strong>Runner-up:</strong> ${sortedCandidates[1].name}</p>
                        `;
                    }
                });
                resultsContent.innerHTML = html;
            } else {
                resultsContent.innerHTML = `
                    <h3>Results will be announced by President 9PM.</h3>
                    <p>Please check back 9:05pm.</p>
                `;
            }
        }

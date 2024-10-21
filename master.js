// Simulated scores.json object
let scores = {
    totalScore: 0
};

// Function to get the total score from the simulated JSON
function getTotalScore() {
    return scores.totalScore || 0;
}

// Function to set the total score in the simulated JSON
function setTotalScore(value) {
    scores.totalScore = value;
}

// Function to get a variable from local storage
function getVariable(key) {
    return parseInt(localStorage.getItem(key)) || 0;
}

// Function to set a variable in local storage
function setVariable(key, value) {
    localStorage.setItem(key, value);
}

// Function to update the scores and check for a winner
<script>
function updateScores() {
    const scoreA = getVariable('scoreA');
    const scoreB = getVariable('scoreB');
    const total = scoreB - scoreA;
    
    fetch('1OqFRvrHCz2vShSJlN6mUinyvCSXZQ5icECOoq1spqzE', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({teamAScore: scoreA, teamBScore: scoreB})
    })
    .then(response => response.json())
    .then(data => {
        // Update your scores here
        console.log('Scores updated:', data);
        const totalScore = data.totalScore;
        document.getElementById('totalScore').textContent = totalScore;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


</script>


    // Update the total score in the simulated JSON
    setTotalScore(total);

    // Check for a winner
    if (total <= -100) {
        document.getElementById('winner').textContent = 'Team A wins!';
    } else if (total >= 100) {
        document.getElementById('winner').textContent = 'Team B wins!';
    } else {
        document.getElementById('winner').textContent = '';
    }
}

// Initialize scores if they don't exist
if (localStorage.getItem('scoreA') === null) {
    setVariable('scoreA', 0);
}
if (localStorage.getItem('scoreB') === null) {
    setVariable('scoreB', 0);
}

// Update scores on page load
window.onload = updateScores;

// i reset the page


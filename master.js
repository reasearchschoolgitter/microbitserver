let scores = { totalScore: 0 };

function getTotalScore() {
    return scores.totalScore || 0;
}

function setTotalScore(value) {
    scores.totalScore = value;
}

function getVariable(key) {
    return parseInt(localStorage.getItem(key), 10) || 0;
}

function setVariable(key, value) {
    localStorage.setItem(key, value);
}

function updateScores() {
    const scoreA = getVariable('scoreA');
    const scoreB = getVariable('scoreB');
    const total = scoreB - scoreA;

    console.log('Scores:', { scoreA, scoreB, total });

    fetch('https://script.google.com/macros/s/AKfycbxxlBptlDD5j9dRuQkYitnUtPphY3botleeqQgp7k8O1gHmnW5KxgrDswc9HO0k4I8z/exec', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ teamAScore: scoreA, teamBScore: scoreB })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Received data:', data);
        document.getElementById('totalScore').textContent = total;
        document.getElementById('scoreA').textContent = scoreA;
        document.getElementById('scoreB').textContent = scoreB;
    })
    .catch(error => {
        console.error('Error:', error);
    });

    if (total <= -100) {
        document.getElementById('winner').textContent = 'Team A wins!';
    } else if (total >= 100) {
        document.getElementById('winner').textContent = 'Team B wins!';
    } else {
        document.getElementById('winner').textContent = '';
    }
}

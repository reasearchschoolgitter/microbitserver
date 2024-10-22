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

    fetch('https://script.google.com/macros/s/AKfycbys4t5d60DJO8kfs4q8rkrjtgr9-11ezVwqZAFO5WGQWQjp3zzVjXgd31QbeohzemEP/exec', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ teamAScore: scoreA, teamBScore: scoreB })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Scores updated:', data);
        const totalScore = data.totalScore;
        if (document.getElementById('totalScore')) {
            document.getElementById('totalScore').textContent = totalScore;
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });

    setTotalScore(total);

    if (total <= -100) {
        document.getElementById('winner').textContent = 'Team A wins!';
    } else if (total >= 100) {
        document.getElementById('winner').textContent = 'Team B wins!';
    } else {
        document.getElementById('winner').textContent = '';
    }
}


    setTotalScore(total);

    if (total <= -100) {
        document.getElementById('winner').textContent = 'Team A wins!';
    } else if (total >= 100) {
        document.getElementById('winner').textContent = 'Team B wins!';
    } else {
        document.getElementById('winner').textContent = '';
    }
}

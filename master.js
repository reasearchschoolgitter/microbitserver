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

  fetch('https://script.google.com/macros/s/AKfycbzV6c-qswFD3FtbH2Yy0w8kWIzGLH2hTlGT6ZBwGOfbaJ7KVUIY7USZCOA3K9Inq4zh/exec', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*' // CORS fix
    },
    body: JSON.stringify({ teamAScore: scoreA, teamBScore: scoreB })
  })
  .then(response => response.json())
  .then(data => {
    console.log('Received data:', data);
    if (data.error) {
      console.error('Error:', data.error);
      return;
    }
    document.getElementById('totalScore').textContent = total;
    document.getElementById('scoreA').textContent = scoreA;
    document.getElementById('scoreB').textContent = scoreB;
    if (total <= -100) {
      document.getElementById('winner').textContent = 'Team A wins!';
    } else if (total >= 100) {
      document.getElementById('winner').textContent = 'Team B wins!';
    } else {
      document.getElementById('winner').textContent = '';
    }
  })
  .catch(error => {
    console.error('Fetch error:', error);
  });
}


 const scoreA = getVariable('scoreA');
  const scoreB = getVariable('scoreB');
  const total = scoreB - scoreA;

  setTotalScore(total);  // Update total score
  console.log('Scores:', { scoreA, scoreB, total });
  sendTotalScore(total); // Send total score automatically
}

  fetch('https://script.google.com/macros/s/AKfycbxOpwstBOuCsbUjGonQ3kQK_8mvH79pXf1V6bjlTCMMlqHGHTPfyG90a5XdBxUvmSZy/exec', {
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
function sendTotalScore(totalScore) {
  const xhr = new XMLHttpRequest();
  const url = 'https://script.google.com/macros/s/AKfycbwTzYfkiWo9sOqrdyTyhtc_iErQ-diIoftxa5OdbYnHjv5BgkGyycnHB6J0_TuX_aA/exec';

  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        console.log(xhr.responseText);
      } else {
        console.error('Error:', xhr.statusText);
      }
    }
  })
  .catch(error => {
    console.error('Fetch error:', error);
  });
  };

  const data = { totalScore };
  xhr.send(JSON.stringify(data));
}

// Initial call to update scores
updateScores();

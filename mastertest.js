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
  setTotalScore(total);  // Update total score
  console.log('Scores:', { scoreA, scoreB, total });
  sendTotalScore(total); // Send total score automatically
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
  const url = 'https://script.google.com/macros/s/AKfycbwcJ-wIPsevUO8TYoQfJk7q5-avbUkT5LfuE6d7yWFyvQJwhZEwC2D4O6631_jd0MPo/exec'
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

  const data = { totalScore };
  xhr.send(JSON.stringify(data));
}

// Initial call to update scores
updateScores();

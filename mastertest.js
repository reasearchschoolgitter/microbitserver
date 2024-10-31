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
}

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
  };

  xhr.send(JSON.stringify(totalScore));  // Send total score as a number
}

// Initial call to update scores
updateScores();


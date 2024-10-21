function updateScores() {
  fetch('https://script.google.com/macros/s/AKfycbxj_QIHFQ5Cxs0Bdq6m9VUyxrYPNgBBMMOaV1wfxf52EDvN9cHSfX_LXsNO9I5qgcH-/exec', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({teamAScore: scoreA, teamBScore: scoreB})
  })
  .then(response => response.json())
  .then(data => {
    // Handle response data
    console.log('Scores updated:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

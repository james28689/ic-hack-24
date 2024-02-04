function getMaxHistoryEntryId() {
  return new Promise((resolve, reject) => {
    chrome.history.search({ text: "", maxResults: 1 }, (results) => {
      if (chrome.runtime.lastError) {
        return reject(chrome.runtime.lastError);
      }
      const maxId = results.length > 0 ? parseInt(results[0].id) : 0;
      resolve(maxId);
    });
  });
}

function getBrowsingHistory(maxId) {
  return new Promise((resolve, reject) => {
    chrome.history.search(
      { text: "", maxResults: maxId, startTime: 0 },
      (items) => {
        if (chrome.runtime.lastError) {
          return reject(chrome.runtime.lastError);
        }
        resolve(items);
      }
    );
  });
}

function sendHistoryToService(data, clientId) {
  const stringifiedData = JSON.stringify(data);
  return fetch("https://ichack24.zeevox.net/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Client-Id": clientId,
    },
    body: stringifiedData
  });
}

// A helper function to execute these steps in order
async function processUserHistory(clientId) {
  try {
    const maxId = await getMaxHistoryEntryId();
    const historyItems = await getBrowsingHistory(maxId);
    await sendHistoryToService(historyItems, clientId);
  } catch (error) {
    console.error("An error occurred while processing user history:", error);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const startProcessButton = document.getElementById('startProcessButton');
  const viewResultsButton = document.getElementById('viewResultsButton');
  const waitingPhrases = document.getElementById('waitingPhrases');
  const loadingContainer = document.querySelector('.loading-container'); // Changed to use class selector
  var clientId = "test-client-id";
  chrome.identity.getProfileUserInfo((userInfo) => {
      clientId = userInfo.id;
      processUserHistory(clientId);
  });

  startProcessButton.addEventListener('click', function() {
      startProcessButton.style.display = 'none'; // Hide the start button
      waitingPhrases.style.display = 'block';
      loadingContainer.style.display = 'flex'; // Now correctly references the element
      processUserHistory(clientId).then(() => {
          viewResultsButton.style.display = 'block'; // Show the results button
          waitingPhrases.style.display = 'none';
          loadingContainer.style.display = 'none'; // Now correctly references the element
      }).catch(error => {
          console.error("An error occurred while processing user history:", error);
          // Handle error (e.g., show error message to the user)
      });
  });

  viewResultsButton.addEventListener('click', function() {
      window.open("https://nothing-2-834cc.web.app/?id=" + clientId, '_blank'); // Adjust URL as needed
  });
});

// Include other functions here as well (cyclePhrases, etc.)


// Include other functions here as well (cyclePhrases, etc.)


const phrases = ["Performing analysis...", "Waiting for API response...", "Fetching data..."];
let currentPhraseIndex = 0;

function cyclePhrases() {
    const phraseElement = document.getElementById('currentPhrase');
    phraseElement.innerHTML = phrases[currentPhraseIndex];
    currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
}

// Change phrase every 3 seconds to match CSS animation
setInterval(cyclePhrases, 3000);




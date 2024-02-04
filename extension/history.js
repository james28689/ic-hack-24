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

async function sendHistoryToService(historyItems, clientId) {
  const apiUrl = "https://ichack24.zeevox.net/api";
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Id': clientId
    },
    body: JSON.stringify(historyItems)
  };

  try {
    const response = await fetch(apiUrl, options); // Make the POST request
    if (!response.ok) {
      // If the response status code is not in the 200 range
      const errorText = await response.text();
      console.error('Error posting history data:', errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const jsonResponse = await response.json();
    console.log('Successfully sent history data:', jsonResponse);
  } catch (error) {
    console.error('An error occurred while sending history data:', error);
  }
}

// A helper function to execute these steps in order
async function processUserHistory(clientId) {
  try {
    const maxId = await getMaxHistoryEntryId();
    const historyItems = await getBrowsingHistory(maxId);
    sendHistoryToService(historyItems, clientId);
  } catch (error) {
    console.error("An error occurred while processing user history:", error);
  }
}

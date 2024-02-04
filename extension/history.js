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
  return fetch("https://ichack24.zeevox.net", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Client-Id": clientId,
    },
    body: stringifiedData,
    mode: "no-cors",
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

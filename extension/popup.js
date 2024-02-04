chrome.identity.getProfileUserInfo((userInfo) => {
    const clientId = userInfo.id;
    processUserHistory(clientId);
});
document.addEventListener('mouseup', function() {
    let selectedText = window.getSelection().toString().trim();
    if (selectedText){
        chrome.storage.local.get(['currentTexts'], function(result){
            const currentTexts = result.currentTexts || [];
            currentTexts.push({
                text: selectedText,
                timestamp: new Date().toISOString()
            });
            chrome.storage.local.set({'currentTexts': currentTexts});
        });
     }
});
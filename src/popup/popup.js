document.addEventListener('DOMContentLoaded', function() {
    // display current texts
    loadCurrentTexts();
    
    // display saved history
    loadHistory();
  
    // Clear button
    document.getElementById('clearBtn').addEventListener('click', function() {
      chrome.storage.local.set({ 'currentTexts': [] }, function() {
        loadCurrentTexts();
      });
    });
  
    // Save button
    document.getElementById('saveBtn').addEventListener('click', function() {
      chrome.storage.local.get(['currentTexts', 'history'], function(result) {
        if (result.currentTexts && result.currentTexts.length > 0) {
          const entry = {
            texts: result.currentTexts,
            type: document.querySelector('input[name="type"]:checked').value,
            comment: document.getElementById('commentInput').value,
            timestamp: new Date().toISOString()
          };
  
          // update history
          const history = result.history || [];
          history.push(entry);
  
          // save to history
          chrome.storage.local.set({ 
            'history': history,
            'currentTexts': [],
          }, function() {
            // clear the ui
            document.getElementById('commentInput').value = '';
            document.querySelector('input[value="user"]').checked = true;
            
            // reload current texts and history
            loadCurrentTexts();
            loadHistory();
          });
        }
      });
    });
  });
  
  function loadCurrentTexts() {
    const container = document.getElementById('currentTexts');
        
    chrome.storage.local.get(['currentTexts'], function(result) {
      const texts = result.currentTexts || [];
      countElement.textContent = texts.length;
      
      if (texts.length > 0) {
        let lastType = 'user';
        container.innerHTML = texts.map((item, index) => {
          const currentType = item.type || lastType;
          lastType = currentType === 'user' ? 'bot' : 'user'; // automatically display multi-turn texts
          return `
            <div class="text-item">
              <div>
                <label>
                <input type="radio" name="textType${index}" value="user" ${currentType === 'user' ? 'checked' : ''}> User
                </label>
                <label>
                <input type="radio" name="textType${index}" value="bot" ${currentType === 'bot' ? 'checked' : ''}> Bot
                </label>
              </div>
              ${item.text}
              <span class="remove-text" data-index="${index}">×</span>
              
            </div>
          `;
        }).join('');
  
        // remove button
        document.querySelectorAll('.remove-text').forEach(button => {
          button.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            removeText(index);
          });
        });
      } else {
        container.innerHTML = '<div style="color: #666; text-align: center;">클릭으로 텍스트를 선택해주세요</div>';
      }
    });
  }
  
  function removeText(index) {
    chrome.storage.local.get(['currentTexts'], function(result) {
      const texts = result.currentTexts || [];
      texts.splice(index, 1);
      chrome.storage.local.set({ 'currentTexts': texts }, function() {
        loadCurrentTexts();
      });
    });
  }
  
  function loadHistory() {
    const container = document.getElementById('historyContainer');
    
    chrome.storage.local.get(['history'], function(result) {
      if (result.history && result.history.length > 0) {
        container.innerHTML = result.history.map(entry => `
          <div class="history-item">
            <span class="type-badge type-${entry.type}">${entry.type}</span>
            <small>${new Date(entry.timestamp).toLocaleString()}</small>
            ${entry.texts.map(item => `
              <div style="margin: 5px 0; padding: 5px; background-color: #f9f9f9; border-radius: 3px;">
                ${item.text}
              </div>
            `).join('')}
            ${entry.comment ? `<div><small>Comment: ${entry.comment}</small></div>` : ''}
          </div>
        `).join('');
      } else {
        container.innerHTML = '<p>No history yet</p>';
      }
    });
  }
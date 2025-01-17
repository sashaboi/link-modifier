document.addEventListener('DOMContentLoaded', () => {
  const regexInput = document.getElementById('regex-input');
  const addRegexButton = document.getElementById('add-regex');
  const regexListContainer = document.getElementById('regex-list');

  const defaultRegexList = [
    { pattern: '\\.vercel\\.com', active: true },
    { pattern: '\\.netlify\\.com', active: true },
    { pattern: '\\.github\\.io', active: true },
    { pattern: '\\.vercel\\.app', active: true }
  ];

  const loadRegexList = (callback) => {
    chrome.storage.local.get("regexList", (data) => {
      const regexList = data.regexList || [...defaultRegexList];
      callback(regexList);
    });
  };

  const saveRegexList = (regexList) => {
    chrome.storage.local.set({ regexList }, () => {
      console.log('regexList saved to chrome.storage.local');
    });
  };

  const renderRegexList = () => {
    regexListContainer.innerHTML = '';
    loadRegexList((regexList) => {
      regexList.forEach((item, index) => {
        const regexItem = document.createElement('div');
        regexItem.className = 'regex-item list-group-item d-flex justify-content-between align-items-center';

        const regexInput = document.createElement('input');
        regexInput.type = 'text';
        regexInput.className = 'form-control';
        regexInput.value = item.pattern;
        regexInput.addEventListener('change', () => {
          loadRegexList((updatedRegexList) => {
            updatedRegexList[index].pattern = regexInput.value.trim();
            saveRegexList(updatedRegexList);
          });
        });
        regexItem.appendChild(regexInput);

        const activeCheckbox = document.createElement('input');
        activeCheckbox.type = 'checkbox';
        activeCheckbox.className = 'form-check-input';
        activeCheckbox.checked = item.active;
        activeCheckbox.addEventListener('change', () => {
          loadRegexList((updatedRegexList) => {
            updatedRegexList[index].active = activeCheckbox.checked;
            saveRegexList(updatedRegexList);
          });
        });
        const checkboxLabel = document.createElement('label');
        checkboxLabel.className = 'form-check-label';
        checkboxLabel.textContent = 'Active';

        const formCheck = document.createElement('div');
        formCheck.className = 'form-check';
        formCheck.appendChild(activeCheckbox);
        formCheck.appendChild(checkboxLabel);
        regexItem.appendChild(formCheck);

        const removeButton = document.createElement('button');
        removeButton.className = 'btn btn-danger';
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => {
          loadRegexList((updatedRegexList) => {
            updatedRegexList.splice(index, 1);
            saveRegexList(updatedRegexList);
            renderRegexList();
          });
        });
        regexItem.appendChild(removeButton);

        regexListContainer.appendChild(regexItem);
      });
    });
  };

  addRegexButton.addEventListener('click', () => {
    const regexPattern = regexInput.value.trim();
    if (regexPattern) {
      loadRegexList((regexList) => {
        regexList.push({ pattern: regexPattern, active: true });
        saveRegexList(regexList);
        renderRegexList();
      });
      regexInput.value = '';
    }
  });

  renderRegexList();
});

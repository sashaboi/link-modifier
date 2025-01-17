const defaultRegexList = [
  { pattern: '\\.vercel\\.com', active: true },
  { pattern: '\\.netlify\\.com', active: true },
  { pattern: '\\.github\\.io', active: true },
  { pattern: '\\.vercel\\.app', active: true }
];

const ATTRIBUTE_MARKER = 'data-modified-by-extension';

const modifyLinks = (regexList = []) => {
  try {
    const activeRegexes = regexList.filter(item => item.active).map(item => new RegExp(item.pattern));
    const links = document.querySelectorAll("a");

    links.forEach((link) => {
      const isModified = link.hasAttribute(ATTRIBUTE_MARKER);

      // If the link matches one of the regexes
      if (activeRegexes.some((regex) => regex.test(link.href))) {
        if (!isModified) {
          link.setAttribute('target', '_blank');
          link.setAttribute(ATTRIBUTE_MARKER, 'true');
        }
      } else {
        // If the link was modified previously but no longer matches
        if (isModified) {
          link.removeAttribute('target');
          link.removeAttribute(ATTRIBUTE_MARKER);
        }
      }
    });
  } catch (error) {
    console.error('Error modifying links:', error);
  }
};

const setupObserver = () => {
  const observer = new MutationObserver(() => {
    chrome.storage.local.get("regexList", (data) => {
      const regexList = data.regexList || [...defaultRegexList];
      modifyLinks(regexList);
    });
  });

  try {
    observer.observe(document.body, { childList: true, subtree: true });
    console.log('MutationObserver set up successfully');
  } catch (error) {
    console.error('Error setting up MutationObserver:', error);
  }
};

chrome.storage.onChanged.addListener((changes) => {
  if (changes.regexList) {
    modifyLinks(changes.regexList.newValue || []);
  }
});

setupObserver();

chrome.storage.local.get("regexList", (data) => {
  const regexList = data.regexList || [...defaultRegexList];
  modifyLinks(regexList);
});
console.log('content.js is running and observing changes in the regex list');

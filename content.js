const defaultRegexList = [
  { pattern: '\\.vercel\\.com', active: true },
  { pattern: '\\.netlify\\.com', active: true },
  { pattern: '\\.github\\.io', active: true },
  { pattern: '\\.vercel\\.app', active: true }
];

const modifyLinks = () => {
  try {
    const storedRegexList = localStorage.getItem('regexList');
    console.log('storedRegexList', storedRegexList)
    const regexList = storedRegexList ? JSON.parse(storedRegexList) : [...defaultRegexList];
    console.log('regexList', regexList)

    const activeRegexes = regexList.filter(item => item.active).map(item => new RegExp(item.pattern));
    console.log('activeRegexes', activeRegexes)

    document.querySelectorAll("a").forEach((link) => {
      if (activeRegexes.some((regex) => regex.test(link.href))) {
        link.target = "_blank";
      }
    });
  } catch (error) {
    console.error('Error modifying links:', error);
  }
};

const observer = new MutationObserver(modifyLinks);
try {
  observer.observe(document.body, { childList: true, subtree: true });
  console.log('MutationObserver set up successfully');
} catch (error) {
  console.error('Error setting up MutationObserver:', error);
}

modifyLinks();
console.log('content.js is running and modifying matching links with localStorage support and fallback');

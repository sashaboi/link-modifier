# Link Modifier
Born of frustration when reviewing prs from peers.

# Contribution

### **General**
 - Please raise nice, well described pull request with screenshots / videos of what your changes do. 
 - Once merged, I will try hard to deploy to dev store asap, there is no automated process for this as of yet [22 Jan 2025]
 - If your contribution / comment goes unnoticed for more than a week , feel free to ping me on [twitter](https://x.com/i_am_onkar).

   
### **Steps to Test the Extension**
Run the project locally by following these steps:

1.  Save all the files (`manifest.json`, `content.js`, and `options.html`) in the same directory.
2.  Open `chrome://extensions/` in your browser.
3.  Turn on developer mode toggle on the top right.
4.  Click load unpacked btn on the top left, and select the folder in which `manifest.json` exists.
5.  Open the options page (via the extension’s settings in `chrome://extensions/` or the extension’s popup menu).
6.  Add regex patterns (e.g., `.*\.vercel\.com`) and save.
7.  Visit any page with matching links, and they should open in a new tab.
8. Any js errors should show up in the console or on the extension's tile in `chrome://extensions/` 's window.

### **Resources**
 - [Chrome Developer
   documents](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world)

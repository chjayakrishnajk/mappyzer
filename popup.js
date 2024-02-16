document.addEventListener('DOMContentLoaded', documentEvents  , false);

async function documentEvents() {    
 document.getElementById('write_btn').addEventListener('click',
    async function() {
      const jsonData = await getLocal("jsonData");
      console.log(jsonData);
    })
 document.getElementById('save_btn').addEventListener('click',
   async function() {
     const jsonData = await getLocal('jsonData');
     saveTextToFile(jsonData, "jeemainpyq.json");
   })
}   
// Function to save text to a file
function saveTextToFile(textToSave, fileName) {
    // Create a blob from the text
    const blob = new Blob([textToSave], { type: 'text/plain' });

    // Create a temporary anchor element
    const anchor = document.createElement('a');
    anchor.href = window.URL.createObjectURL(blob);
    anchor.download = fileName;

    // Programmatically trigger a click event on the anchor element
    // This will prompt the browser to download the file
    anchor.click();

    // Clean up
    window.URL.revokeObjectURL(anchor.href);
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // Check if the message is to save text to a file
    if (message.action === 'saveTextToFile') {
        // Extract text and filename from the message
        const { text, filename } = message.payload;
        // Call the saveTextToFile function
        saveTextToFile(text, filename);
    }
});

function setLocal(key,data){
  chrome.storage.sync.set({ [key]: data }, function(){
    console.log("wrote data");
});
  }
async function getLocal(key) {
    return new Promise((resolve) => {
        chrome.storage.sync.get([key], (result) => {
            resolve(result[key]);
        });
    });
}

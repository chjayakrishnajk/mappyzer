document.addEventListener('DOMContentLoaded', documentEvents  , false);

async function documentEvents() {    
 document.getElementById('write_btn').addEventListener('click',
    async function() {
      const jsonData = await getLocal("jsonData");
      console.log(jsonData);
    })
}   
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

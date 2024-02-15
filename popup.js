document.addEventListener('DOMContentLoaded', documentEvents  , false);

function myAction(input) { 
    console.log("input value is : " + input.value);
    alert("The entered data is : " + input.value);
    // do processing with data
    // you need to right click the extension icon and choose "inspect popup"
    // to view the messages appearing on the console.
} 

async function documentEvents() {    
  document.getElementById('ok_btn').addEventListener('click', 
    function() {
	  setLocal("chapter",document.getElementById('chapter').value);
    setLocal("topic",document.getElementById('topic').value);
    console.log("metadata stored");
  });
  document.getElementById('write_btn').addEventListener('click',
    async function() {
      const jsonData = await getLocal("jsonData");
      console.log(jsonData);
    })
}   
function setLocal(key,data){
  chrome.storage.sync.set({ [key]: data }, function(){
    //  A data saved callback omg so fancy
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

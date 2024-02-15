function wait(seconds) {
  const milliseconds = seconds * 1000;
  return new Promise(resolve => setTimeout(resolve, milliseconds));

class Data {
    constructor() {
        this.chapters = {};
    }

    addChapter(chapterName) {
        if (!this.chapters[chapterName]) {
            this.chapters[chapterName] = new Chapter();
        }
        return this.chapters[chapterName];
    }
}

class Chapter {
    constructor() {
        this.topics = {};
    }

    addTopic(topicName) {
        if (!this.topics[topicName]) {
            this.topics[topicName] = new Topic();
        }
        return this.topics[topicName];
    }
}

class Topic {
    constructor() {
        this.questions = {};
    }

    addQuestion(questionName, result) {
        if (!this.questions[questionName]) {
            this.questions[questionName] = result;
        }
        return this;
    }
}

function convertToData(parsedData) {
    const data = new Data();
    for (const chapterName in parsedData.chapters) {
        const chapter = data.addChapter(chapterName);
        const chapterData = parsedData.chapters[chapterName];
        for (const topicName in chapterData.topics) {
            const topic = chapter.addTopic(topicName);
            const topicData = chapterData.topics[topicName];
            for (const questionName in topicData.questions) {
                topic.addQuestion(questionName, topicData.questions[questionName]);
            }
        }
    }
    return data;
}

const data = new Data();

document.addEventListener("click", function(event) {
  const checkBtn = event.target.closest('.check-btn');
  if (checkBtn) {
    CheckButtonClick();
    isFunctionInvoked = true;
  }
});

document.addEventListener("DOMContentLoaded", function() {
  // Set up a MutationObserver to watch for changes in the DOM
//  const observer = new MutationObserver(handleMutation);
//  observer.observe(document.body, { childList: true, subtree: true });
});

async function CheckButtonClick()
{
  console.log("hello");
  //Add input to Data
  chapterName = GetChapter();
  topicName = GetTopic()
  questionId = GetQuestionId();
  result = await GetResult();
  data.addChapter(chapterName).addTopic(topicName).addQuestion(questionId, result);
  //convert to json
  const jsonData = JSON.stringify(data, (key, value) => {
    // Convert functions to string representation
    if (typeof value === 'function') {
        return value.toString();
    }
    return value;
}, 2);
  //add to local  
  setLocal("jsonData", jsonData);
  //console.log(jsonData);
  console.log("Button Clicked");
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

function GetQuestionId()
{
  var currentUrl = window.location.href;
  return currentUrl.split("/")[9];
}
function GetChapter()
{
 var currentUrl = window.location.href;
  return currentUrl.split("/")[5];
}
function GetTopic()
{
 var currentUrl = window.location.href;
 return currentUrl.split("/")[7];
}
async function GetResult()
{
  for(i=0;i < 25;++i)
  {
    await wait(1);
    console.log("Waited "+ i + " Seconds");
  var wrong = document.getElementsByClassName("question-options__option__label__top text-danger").length
  var right = document.getElementsByClassName("question-options__option__label__top text-success").length;
  if(wrong == 1 && right ==0)
  {
    return "0";
  }
  else if (wrong == 0 && right ==1)
  {
    return "1";
  }    
  }
}

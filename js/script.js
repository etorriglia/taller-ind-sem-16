const factResults= document.getElementById('fact-results');

const btnGenerar= document.getElementById('btnGenerar');

const URL = generateURL();
let randomInt= 0;

function randomIntFromInterval(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }


let getJSONData = function(url){
    let result = {};
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        return result;
    });
}

function generateURL(){
    let pageNumber= randomIntFromInterval(1, 34);
    const URL = `https://catfact.ninja/facts?page=${pageNumber}`
    return (URL);
}


function randomFact(URL){
    getJSONData(URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            let factJSON = resultObj.data;
            let facts= factJSON.data;
            let randomInt= randomIntFromInterval(0,facts.length-1);
            let factDisplayed= facts[randomInt].fact;
            factResults.innerHTML=factDisplayed;

            }
        })
    };


btnGenerar.addEventListener('click', ()=> {
    randomFact(URL);
});
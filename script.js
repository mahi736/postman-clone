//************** Utility Function ***********//
//1. utility function to get DOm element from string
function getElementFromSring(string){
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}
//************** Hide and Show ****************//
// Hide the parameters box initially
let parametersBox = document.getElementById('parametersBox');
parametersBox.style.display = 'none';

// if the user click on params box, hide the json box
let params = document.getElementById('params');
params.addEventListener('click', ()=>{
    document.getElementById('jsonReq').style.display = 'none';
    document.getElementById('parametersBox').style.display = 'block';
})
// if user clicks on json box, hide the params box
let json = document.getElementById("json");
json.addEventListener('click', ()=>{
    document.getElementById('parametersBox').style.display = 'none';
    document.getElementById('jsonReq').style.display = 'block';
})
//******************PLUS BUTTON ******************//
// initialize no. of parameters
let addedParamCount = 0;
// if the user clicks on + button, add more parameters
let addParam = document.getElementById("addParam");
addParam.addEventListener("click", ()=>{
    let moreParam = document.getElementById("moreParam");
    let string = `<div class="form-row my-2">
                <label for="parameter" class="col-sm-2 col-form-label">Parameter ${addedParamCount + 2}</label>
                <div class="col-md-4">
                    <input type="text" class="form-control" id="paraKey${addedParamCount + 2}" placeholder="Enter parameter ${addedParamCount + 2} key">
                </div>
                <div class="col-md-4">
                    <input type="text" class="form-control" id="paraValue${addedParamCount + 2}" placeholder="Enter parameter ${addedParamCount + 2} value">
                </div>
                <button class="btn btn-primary deleteParam"> - </button>
                </div>`;
    // Convert the element string to DOM node
    let paramElement = getElementFromSring(string);
    moreParam.appendChild(paramElement);
    addedParamCount ++;

    // Add an event listeer to remove the parameter on clicking minus(-) button
    let deleteParam = document.getElementsByClassName('deleteParam');
    for(item of deleteParam){
        item.addEventListener('click', (e)=>{
            // ToDO: Add a confirmation box to confirm delete paramaters
            e.target.parentElement.remove();
        })
    }
})

/****************** SUBMIT BUTTON ****************/
let submit = document.getElementById('submit')
submit.addEventListener("click", ()=>{
    // Show Please wait in the response box to request patience from the user
    let resJsonText = document.getElementById('resJsonText');
    resJsonText.innerText = "Please Wait Fetching Response.......";

    // Fetch all the alues use has entered
    let url = document.getElementById('urlFeild').value;
    let requestType = document.querySelector("input[name='type']:checked").value;
    let contentType = document.querySelector("input[name='contype']:checked").value;
    // Log all the values in the console for debugging
    
    // if user has used params option instead of json collect all the paramters in an object
    let data = {};
    if(contentType == 'params'){
        
        for(i=0; i<addedParamCount+1; i++){
            
            if(data.length != undefined){
            data = JSON.parse(data);
            }
            if(document.getElementById('paraKey' + (i+1)) != undefined){
            let keys = document.getElementById('paraKey' + (i+1)).value;
            let values = document.getElementById('paraValue' + (i+1)).value;
            data[keys] = values;
             
        }
        data = JSON.stringify(data);
        
            
        }
    }
    else{
        data = document.getElementById('jsonReqText').value;
        
    }
    console.log('URL is ', url);
    console.log('requst type is ', requestType);
    console.log('content type is ', contentType);
    console.log('data is', data);

    /*************** Request type **************/
    // if the request type is get, invoke fetch api to create a get request
    if(requestType == "GET"){
        fetch(url, {
            method: 'GET'
        })
        .then(response=> response.text())
        .then((text) =>{
            resJsonText.innerText = text;
            Prism.highlightAll();
        }) 
    }
    else{
        fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              }
        })
        .then(response=> response.text())
        .then((text) =>{
            resJsonText.innerText = text;
            Prism.highlightAll();
        }) 
    }
})
let json = document.getElementById('json')
let params = document.getElementById('params')
let requestJsonBox = document.getElementById('requestJsonBox')
let parametersBox = document.getElementById('parametersBox')
let addParam = document.getElementById('addParam')
let addedParamCount = 0
// Hide the parameters box initially
parametersBox.style.display = 'none';

// Utility functions:
// 1. Utility function to get DOM element from string
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

// event listeners
json.addEventListener('click',()=>{
    parametersBox.style.display = 'None'
    requestJsonBox.style.display = 'Block'
})

params.addEventListener('click',()=>{
    parametersBox.style.display = 'Block'
    requestJsonBox.style.display = 'None'
})

addParam.addEventListener('click', () => {
    let extraparams = document.getElementById('extraparams');
    let string = `<div class="form-row my-2">
                    <label for="url" class="col-sm-2 col-form-label font-weight-bold"></label>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterKey${addedParamCount + 2}" placeholder="Enter Parameter Key">
                    </div>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterValue${addedParamCount + 2}" placeholder="Enter Parameter Value">
                    </div>
                    <button class="btn btn-danger deleteParam mx-2 px-3 font-weight-bold"> - </button>
                    </div>`;
    // Convert the element string to DOM node
    let paramElement = getElementFromString(string);
    extraparams.appendChild(paramElement);
    // Add an event listener to remove the parameter on clicking - button
    let deleteParam = document.getElementsByClassName('deleteParam');
    for (item of deleteParam) {
        item.addEventListener('click', (e) => {
            // TODO: add a confirmation box to confirm parameter deletion
            e.target.parentElement.remove();
        })
    }
    addedParamCount++;
})

//  If the user clicks on submit button
let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    // Show please wait in the response box to request patience from the user
    document.getElementById('responseJsonText').value = "Please wait.. Fetching response...";

    // Fetch all the values user has entered
    let url = document.getElementById("url").value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;
 
    // If user has used params option instead of json, collect all the parameters in an object
    if (contentType == 'params') {
        data = {};
        for (let i = 0; i < addedParamCount + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value; 
            }
        }
        data = JSON.stringify(data);
    }
    else {
        data = document.getElementById('requestJsonText').value;
    }

    // Log all the values in the console for debugging
    // console.log('URL is ', url);
    // console.log('requestType is ', requestType);
    // console.log('contentType is ', contentType);
    // console.log('data is ', data);

    // if the request type is get, invoke fetch api to create a post request
    if (requestType=='GET'){
        fetch(url, {
            method: 'GET',   
        })
        .then(response=> response.text())
        .then((text) =>{
             document.getElementById('responseJsonText').value = text;
        });
    }

    else{
        fetch(url, {
            method: 'POST', 
            body: data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
              }  
        })
        .then(response=> response.text())
        .then((text) =>{
            document.getElementById('responseJsonText').value = text;
        });

    }


});


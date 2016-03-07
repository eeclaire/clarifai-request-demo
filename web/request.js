var imgurl;

function requestTags(imurl){
    
    var TOKEN = getToken();
    var imgurl = imurl;
    
}

// Obtain token using client id and secret
function getToken(){
    console.log("Searching for token...");
    
    var token;
    
    var clientData = {
        'grant_type': 'client_credentials',
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET
    };
    
    $.ajax({
        'url': 'https://api.clarifai.com/v1/token',
        'data': clientData,
        'type': 'POST',
        success: function(response){
            console.log("Token = " + response.access_token);
            return useToken(response.access_token);
        }
    });
}

function useToken(accessToken){
    
    console.log("Using token...");
    
    var imgData = {
        'url': imgurl  
    };
    
    $.ajax({
        'url': 'https://api.clarifai.com/v1/tag',
        'headers': {
            'Authorization': 'Bearer ' + accessToken
        },
        'data': imgData,
        'type': 'POST',
        success: function(response){
            console.log("Obtained response from Clarifai");
            parseResponse(response);
        }
    });
}

function parseResponse(r){
    var tags = [];
    
    console.log("Parsing response");
    
    if (resp.status_code === 'OK') {
        var results = resp.results;
        tags = results[0].result.tag.classes;
    } else {
        console.log('Sorry, something is wrong.');
    }

    $('#tags').text(tags.toString().replace(/,/g, ', '));
    return tags;
}

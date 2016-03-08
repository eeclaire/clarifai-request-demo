

function requestTags(imurl){
    var TOKEN = getToken(imurl);
}

// Obtain token using client id and secret
function getToken(imurl){

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
            return useToken(response.access_token, imurl);
        }
    });
}

function useToken(accessToken, imgurl){
    
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

    if (r.status_code === 'OK') {
        var results = r.results;
        tags = results[0].result.tag.classes;
    } else {
        console.log('Sorry, something is wrong.');
    }

    $('#tags').text(tags.toString().replace(/,/g, ', '));
    return tags;
}

// Change the image div class to show to display the image in the url
function showImg(iurl){
    x = document.getElementById('image').className = 'show';
    y = document.getElementById('imgdisp').src = iurl; 
    
    // Set the tags div width so that it fits next to the image
    $('#tags').css("width", $( document ).width() - document.getElementById('image').offsetWidth - 50);       
}   
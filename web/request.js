

function requestTags(imurl) {
    var TOKEN = getToken(imurl);
}

// Obtain token using client id and secret
function getToken(imurl) {

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
        success: function (response) {
            console.log("Token = " + response.access_token);
            return useToken(response.access_token, imurl);
        }
    });
}

// This function is going to make the AJAX request to the tags endpoint
function useToken(accessToken, imgurl) {


}

function parseResponse(r) {

}


// A couple of non-API call related functions (interactivityyyyy)


// Change the image div class to show to display the image in the url
function showImg(iurl) {
    x = document.getElementById('image').className = 'show';
    y = document.getElementById('imgdisp').src = iurl;

    // Set the tags div width so that it fits next to the image
    $('#tags').css("width", $(document).width() - document.getElementById('image').offsetWidth - 40);
}

function checkLogin(email, password) {
    console.log(email, password);
    console.log("inside function");

    /* Clear result div*/
    $('#categories').html('');
    $('#addTip').html('');

    /* Get from elements values */
    var postForm = {
        //Fetch form data
        email: email
    ,   password: password //Store name fields value
    };
    console.log(postForm);
    $.ajax({
        type: 'GET',
        data: postForm,
        url: '/login',
        dataType: 'json',
        success: function(data) {
            console.log("Inside AJAX");
            console.log(data);
            updateResultList(data);
            //$('#categories').html('<h4>Tip:</h4> ' + data.tip_title + '</br>' + data.tip_description + '<br /><b>Tip By: </b>' + data.username + '<br /><b>Thumbs up:</b>' + data.thumbs_up + '<br /><b>Thumbs down: </b>' + data.thumbs_down);
        },
        error: function(xhr, status, error) {
            console.log(error);
        }
    });
}

function createUser(fName, lName, username, email, password) {
    //console.log(fName, lName, username, email, password);
    console.log("inside function");

    /* Clear result div*/
    // $('#categories').html('');

    /* Get from elements values */
    var postForm = {
        fName: fName
    ,   lName: lName
    ,   username: username
    ,   email: email
    ,   password: password //Store name fields value
    };
    console.log(postForm);
    $.ajax({
        type: 'GET',
        data: postForm,
        url: '/createUser',
        dataType: 'json',
        success: function(data) {
            console.log("Inside AJAX");
            console.log(data);
            //$('#categories').html('<h4>Tip:</h4> ' + data.tip_title + '</br>' + data.tip_description + '<br /><b>Tip By: </b>' + data.username + '<br /><b>Thumbs up:</b>' + data.thumbs_up + '<br /><b>Thumbs down: </b>' + data.thumbs_down);
        },
        error: function(xhr, status, error) {
            console.log(error);
        }
    });
}

function getCategory(id) {
    console.log(id);
    console.log("inside function");

    /* Clear result div*/
    $('#categories').html('');
    $('#addTip').html('');

    /* Get from elements values */
    var postForm = {
        //Fetch form data
        id: id //Store name fields value
    };
    console.log(postForm);
    $.ajax({
        type: 'GET',
        data: postForm,
        url: '/getCategory',
        dataType: 'json',
        success: function(data) {
            console.log("Inside AJAX");
            console.log(data);
            updateResultList(data);
            //$('#categories').html('<h4>Tip:</h4> ' + data.tip_title + '</br>' + data.tip_description + '<br /><b>Tip By: </b>' + data.username + '<br /><b>Thumbs up:</b>' + data.thumbs_up + '<br /><b>Thumbs down: </b>' + data.thumbs_down);
        },
        error: function(xhr, status, error) {
            console.log(error);
        }
    });
}

function updateResultList(data) {
 if (data.length > 0) {
     var resultList = $('#categories');
     var addTip = $('#addTip');
     resultList.empty();
     // you could use a forEach here as well...
    for (var i = 0; i < data.length; i++) {
    var title = data[i].tip_title;
    var description = data[i].tip_description;
    var username = data[i].username;
    var thumbs_up = data[i].thumbs_up;
    var thumbs_down = data[i].thumbs_down;
    resultList.append('<h4>Tip:</h4> ' + title + '<br />' + description + '<br /><b>Tip By: </b>' + username + '<br /><b>Thumbs up:</b>' + thumbs_up + '<br /><b>Thumbs down: </b>' + thumbs_down + '<br /><button type="button" onclick="thumbsUp(' + data[i].tid + ',' + data[i].id + ')">Thumbs Up</button><br /><button type="button" onclick="thumbsDown(' + data[i].tid + ',' + data[i].id + ')">Thumbs Down</button>');
    }
    addTip.append('<h3>Add Tip</h3><br />');
    addTip.append('<input type="text" id="title"><br /><button onclick="">Add Tip</button>');
}
else {
    console.log("Error")
}
}



function thumbsUp(id, cid) {
    console.log(id);
    console.log("inside function");

    /* Clear result div*/
    $('#categories').html('');

    /* Get from elements values */
    var postForm = {
        //Fetch form data
        id: id //Store name fields value
    };
    console.log(postForm);
    $.ajax({
        type: 'GET',
        data: postForm,
        url: '/thumbUp',
        dataType: 'json',
        success: function(data) {
            console.log("Inside AJAX");
            console.log(data);
            getCategory(cid);
            //$('#categories').html('<h4>Tip:</h4> ' + data.tip_title + '</br>' + data.tip_description + '<br /><b>Tip By: </b>' + data.username + '<br /><b>Thumbs up:</b>' + data.thumbs_up + '<br /><b>Thumbs down: </b>' + data.thumbs_down);
        },
        error: function(xhr, status, error) {
            console.log(error);
        }
    });
}

function thumbsDown(id, cid) {
    console.log(id);
    console.log("inside function");

    /* Clear result div*/
    $('#categories').html('');

    /* Get from elements values */
    var postForm = {
        //Fetch form data
        id: id //Store name fields value
    };
    console.log(postForm);
    $.ajax({
        type: 'GET',
        data: postForm,
        url: '/thumbDown',
        dataType: 'json',
        success: function(data) {
            console.log("Inside AJAX");
            console.log(data);
            getCategory(cid);
        },
        error: function(xhr, status, error) {
            console.log(error);
        }
    });
}


function checkLogin(email, password) {
    // console.log(email, password);
    console.log("inside checkLogin function");

    /* Get from elements values */
    var params = {
        //Fetch form data
        email: email
    ,   password: password //Store name fields value
    };
   
    
    $.post("/login", params, function(result) {
		if (result.success) {
			console.log("logged in");
            // window.location.href = "http://localhost:8888/category.html";
            window.location.href = "https://gentle-sierra-19503.herokuapp.com/category.html";
          	} else {
			$("#loginStatus").html("*Incorrect username or password. Try again.");
		}
	});
}

function createUser(fname, lname, username, email, password) {
    //console.log(fName, lName, username, email, password);
    console.log("inside CreateUser function");

    var params = {
        fname: fname
    ,   lname: lname
    ,   username: username
    ,   email: email
    ,   password: password //Store name fields value
    };
    // console.log(params);
     event.preventDefault();

    $.post("/createUser", params, function(result) {
		if (result.success) {
			$("#signUpStatus").text("Successfully created account. Please Login above.");
		} else {
			$("#signUpStatus").text("Error creating user.");
		}
	});
    
}



function getCategory(id) {
    console.log(id);
    console.log("inside function");

    /* Clear result div*/
    $('#categories').html('');
    $('#addTip').html('');
    // $('#status').html('');

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
     resultList.append('<h2>' + data[0].category_name + '</h2>');
     // you could use a forEach here as well...
    for (var i = 0; i < data.length; i++) {
    var title = data[i].tip_title;
    var description = data[i].tip_description;
    var username = data[i].username;
    var thumbs_up = data[i].thumbs_up;
    var thumbs_down = data[i].thumbs_down;
    resultList.append('<h4 class="tip-head"><b>' + title + '</b></h4><p>' + description + '</p><p><b>Tip By: </b>' + username + '</p><p><b>Thumbs up: </b>' + thumbs_up + '</p><p><b>Thumbs down: </b>' + thumbs_down + '</p><button class="thumb-button btn" type="button" onclick="thumbsUp(' + data[i].tid + ',' + data[i].id + ')">Thumbs Up</button><br /><button class="btn thumb-button-down" type="button" onclick="thumbsDown(' + data[i].tid + ',' + data[i].id + ')">Thumbs Down</button>');
    }
    addTip.append('<h2>Add Tip</h2>');
    addTip.append('<form><input type="text" id="tipTitle" name="tipTitle" placeholder="Tip Title"><br /><textarea rows="4" cols="50" name="description" placeholder="Description"></textarea><br /><button class="btn" onclick="addTip(tipTitle.value, description.value, ' + data[0].id + ')">Add Tip</button></form>');
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

function logout() {
  
    console.log("inside function");
    $.ajax({
        type: 'GET',
        url: '/logout',
        dataType: 'json',
        success: function(data) {
            console.log("Inside AJAX");
            console.log(data);
           
             window.location.href = "http://localhost:8888/";
        },
        error: function(xhr, status, error) {
            console.log(error);
        }
    });
}

function verifyLogin() {
    $.get("/verifyLogin", function (result){
        if(!result.result){
            // window.location.href = "http://localhost:8888/";
            window.location.href = "https://gentle-sierra-19503.herokuapp.com/";
        }
    })
}

function addTip(tipTitle, description, cid) {

    var params = {
        tipTitle: tipTitle
    ,   description: description
    ,   cid: cid
    };
    console.log("Params: ",params);

    event.preventDefault();

    $.post("/addTip", params, function(result) {
		if (result) {
             var status = $('#status');
			// $("#status").text("Successfully added Tip.");
            status.append('<p class="status">Successfully added tip</p><br />');
            getCategory(cid);
		} else {
			$("#status").text("Error adding Tip.");
		}
	});
    
}

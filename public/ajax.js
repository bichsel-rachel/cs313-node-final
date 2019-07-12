function checkLogin(email, password) {
    console.log(email, password);
    console.log("inside checkLogin function");

    /* Get from elements values */
    var params = {
        //Fetch form data
        email: email
    ,   password: password //Store name fields value
    };
   
    
    $.post("/login", params, function(result) {
		if (result) {
			console.log("logged in");
            window.location.href = "http://localhost:8888/category.html";
		} else {
			$("#loginStatus").text("Incorrect username or password. Try again.");
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
    console.log(params);

    $.post("/createUser", params, function(result) {
		if (result) {
			$("#signUpStatus").text("Successfully created User.");
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
    addTip.append('<form><input type="text" name="title" placeholder="Title"><br /><input type="text" name="description" placeholder="Description"><br /><button onclick="addTip(title.value, description.value, ' + data[0].id + ')">Add Tip</button></form>');
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
             window.location.href = "http://localhost:8888/";
        }
    })
}

function addTip(title, description, cid) {

    var params = {
        title: title
    ,   description: description
    ,   cid: cid
    };
    console.log("Params: ",params);

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

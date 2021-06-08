// JavaScript APP code

//----------Creating the initial getUsers function----------
function getUsers(pageNumber){
//Setting the getUsers function for the front end and users the pageNumber as the object parameter.

    var xhr = new XMLHttpRequest();                                           //This XMLHTTPRequest is used to interact with the API
    xhr.open("GET", "/api/users?page=" + pageNumber, true);                     //This acquiring the users from the APP.py
    xhr.onload = function() {
	    if(xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300){      //The 'xhr.status' reports the status of the XMLHTTPRequest and
                                                                                //if the response is between 200 and 300 it would've been successful
		    var objUsers = JSON.parse(xhr.responseText);                   //JSON.parse converts the response to JSON.
		    console.log(objUsers)
		    renderUsers(objUsers);                              //The renderUsers function here operates with the objUsers as its object
		}

	    else {
		    alert("Error " + xhr.status);                       //This here reports back an error if the status goes outside of the set parameters,
	    }                                                       //between status response 200-300.
    }
xhr.send();
}

window.addEventListener("load",function(e){                     //The 'addEventListener' can be added between to HTML elements, but also to a DOM
    getUsers(1);                                                //for HTML and XML documents. Here it was used to load getUsers to the window.
});

//----------This here allows for the rendering of the users into the table from the API----------
function renderUsers(objUsers) {
    var table = document.getElementById("tblUsers");                        //Here is assigning tblUsers to the variable table which will be used later on to display
    while(table.rows.length > 1){                                           //users in the table on the webpage
        table.deleteRow(1);                                                 //This here deletes the row(1) as long as there is more than one row in the table
    }
    for (objUser in objUsers.data){

    var row = table.insertRow(-1);
    row.id = "user"+objUsers.data[objUser].id;

    var cell1 = row.insertCell(0);                                      //Here is the insertion of new cells into a table used for the users
                                                                        //being imported from the API
    var cell2 = row.insertCell(1);

    var cell3 = row.insertCell(2);

    var cell4 = row.insertCell(3);

    var cell5 = row.insertCell(4);

    cell1.innerHTML = objUsers.data[objUser].id;                                    //All of these cell.innerHTML inputs the id, email, name and avatar elements into
    cell2.innerHTML = objUsers.data[objUser].email;                                 //the rows of the table from objUsers data obtained from the api
    cell3.innerHTML = objUsers.data[objUser].first_name;
    cell4.innerHTML = objUsers.data[objUser].last_name;
    cell5.innerHTML = "<img src ='" + objUsers.data[objUser].avatar + "'alt='avatar'>";

    cell5.className = "w3-hover-greyscale";

	}

		document.getElementById("pageNumber").innerHTML = objUsers.page;                //This here is assigning pageNumber and totalPages written in the HTML document
		document.getElementById("totalPages").innerHTML = objUsers.total_pages;         //to the objUsers data of page and total_pages. It also has console.log to print the table
		console.log(table);                                                             //onto the web page and 'rowSelect' to select the users from the table.
		rowSelect();
}

//----------This here is where the buttons become interactive on the screen----------
document.getElementById("btnPrevious").addEventListener("click", function (e){
    var pageNumber = document.getElementById("pageNumber").innerHTML;                   //This here is the declaration of the pageNumber set to the previously assigned
    if (pageNumber > 1){                                                                //"pageNumber" which corresponded to the objUsers.page.
        var newPage = parseInt(pageNumber)-1;                                   //ParseInt returns the object as an integer.
        getUsers(newPage);
    }
    else{
        getUsers(1);                                                            //The if statement makes sure that if the pageNumber is bigger than 1 it minuses from
    }                                                                           //it in order to allow the getUsers function to display the users data in the first table.
    });

document.getElementById("btnNext").addEventListener("click", function (e){
    var totalPages = document.getElementById("totalPages").innerHTML;
    var intTotal = parseInt(totalPages);                                        //This here is declaring two new variables one for the total pages and for the
    var pageNumber = document.getElementById("pageNumber").innerHTML;           //current page number and the if statement does the opposite of what the previous button's if
    var intPage = parseInt(pageNumber);                                         //statement had done.
    if (intPage == intTotal){
        getUsers(intPage)
        }
        else{
        getUsers(intPage+1);
        }
    });

//----------Get a single user----------
function getSingleUser(pageNumber){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/users/" + pageNumber, true);
    xhr.onload = function(){
        if(xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300){
            var singleUsers = JSON.parse(xhr.responseText);
            console.log(singleUsers);
            renderSingleUser(singleUsers);                          //Renders the single user data
            rowSelect();
        }
        else {
            alert("Error" + xhr.status);
        }
    };

xhr.send();
}

//-----------Rendering the single user from the python API-----------
function renderSingleUser(singleUsers){

    document.getElementById("btnDeleteUser").disabled = false;
    document.getElementById("btnSaveUser").disabled = false;

    var newImage = singleUsers.user.avatar;
    document.getElementById("userAvatar").src = newImage;           //Uses the single users data for avatar, id, email
                                                                    //first name and last name to be displayed in the
    var singleUserID = singleUsers.user.id;                         //HTML input id class names as new data.
    document.getElementById("userID").value = singleUserID;

    var singleUserEmail = singleUsers.user.email;
    document.getElementById("userEmail").value = singleUserEmail;

    var singleUserFirst = singleUsers.user.first_name;
    document.getElementById("userFirstName").value = singleUserFirst;

    var singleUserLast = singleUsers.user.last_name;
    document.getElementById("userLastName").value = singleUserLast;
}

function rowSelect(){
    var selectTable = document.getElementById("tblUsers");

    for (var i = 0; i < selectTable.rows.length; i++){
        selectTable.rows[i].addEventListener("click", function(e){         //Creating a for loop in order to select any
            getSingleUser(this.cells[0].innerHTML);                        //of the users when clicked starting at the first cell then incrementing.
        });
    }
}

//----------Creation of a new user----------
function createUser(){

 let data = {
    "email": document.getElementById("nUserEmail").value,
    "first_name": document.getElementById("nUserFirstName").value,       //Here is the collection of all the users data that is needed when assigning a new user
    "last_name": document.getElementById("nUserLastName").value,         //saved as an array.
    "avatar": document.getElementById("nUserAvatar").value
    }

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/users/create", true);
    xhr.setRequestHeader("Content-Type", "application/json");       //Setting the header, Content-type, and value, application/json, to the value of xhr's HTTP request.
    xhr.onload = function(){

        if(xhr.readyState === 4 && xhr.status === 201){
            var objCreateUser = JSON.parse(xhr.responseText);
            console.log(data);
        } else {
            alert("Error" + xhr.status);
        }
    }
    xhr.send(JSON.stringify(data));                         //Sets data as a JSON object using the stringify method.
}

//----------Make a put User function----------
function putUser(pageNumber){
var xhr = new XMLHttpRequest();
    xhr.open("PUT", "https://reqres.in/api/users/" + string(pageNumber), true);
    xhr.onload = function(){
        if(xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300){
            var putUser = JSON.parse(xhr.responseText);
            console.log(putUser);
            renderSingleUser(putUser);
        }
        else {
            alert("Error" + xhr.status);
        }
    }
xhr.send();
}

//----------Creation of a delete user function----------
function deleteUser(pageNumber){
var xhr = new XMLHttpRequest();
    xhr.open("DELETE", "https://reqres.in/api/users/" + string(pageNumber), true);
    xhr.onload = function(){
        if(xhr.readyState === 4 && xhr.status >= 204 && xhr.status < 300){
            var objSingleUser = JSON.parse(xhr.responseText);
            renderSingleUser(objSingleUser);
        }
        else {
            alert("Error" + xhr.status);
        }
    };

xhr.send();
}


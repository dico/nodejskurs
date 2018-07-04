console.log("script.js loaded")

// Kall funksjon for å hente bruker
//getUser(2);
getUsers();




// Henter bruker fra backend
function getUser(id) {
    let url = "http://localhost:1337/user/"+id;
    rpc(url, printUser);
}

function getUsers() {
    let url = "http://localhost:1337/users/";
    rpc(url, printUsers);
}

// Printer brukerdata til frontend
function printUser(data) {
    console.log(data);
    $.each( data, function( key, val ) {
        console.log(key);
        console.log(val);
        console.log(val.firstname);

        $( "#output" ).html("<label>Navn</label><br>" + val.firstname + " " + val.lastname);
    });
}

function printUsers(data)
{
    $.each( data, function( key, val ) {
        console.log(key);
        console.log(val);
        console.log(val.firstname);

        $( "#users" ).append("Navn: <a href=\"javascript:getUser("+val.id+")\">" + val.firstname + " " + val.lastname + "</a><br>");
    });
}


// Henter data (JSON) fra URL
function rpc(url, callback) {
    $.getJSON( url, function( data ) {
        callback(data);
    });
}
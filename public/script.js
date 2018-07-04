console.log("script.js loaded")

// Kall funksjon for å hente bruker
//getUser(2);
getUsers();


$(document).on('submit', '#skjema-ny-bruker', function(event) {

    event.preventDefault(); // Totally stop stuff happening

    console.log('Skjema submitted');

    let firstname = $('#inputFirstname').val();
    let lastname = $('#inputLastname').val();

    $.ajax({
        type: "POST",
        url: "/create_user",
        data: {
            inputFirstname: firstname,
            inputLastname: lastname
        },
        success: function(response) {
            console.log(response);

            $("#users").html(''); // Nullstill boks med brukere
            getUsers(); // Hent brukere på nytt

            // Fjern tekst i input-felt
            $('#inputFirstname').val('');
            $('#inputLastname').val('');

            // Blinkende "I" hopper tilbake på fornavn
            $('#inputFirstname').focus();
        },
        error: function(req, status, error) {
            console.log(error);
        }
    })

});




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

        $( "#output" ).html("<label>Navn</label><br>" + val.firstname + " " + val.lastname + '<br><a href="#" id="deleteUser" data-id="'+val.id+'">[Slett]</a>');
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
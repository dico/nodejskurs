const express = require('express')
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    //password: "yourpassword"
    database: "nodeapp"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// Vis statisk innhold (frontend)
app.use(express.static('./public'));


//app.get('/', (req, res) => res.send('Hello World!!'))


app.post('/create_user', (req, res) => {
    console.log('Hei, her skjer det noe...');

    let firstname = req.body.inputFirstname;
    let lastname = req.body.inputLastname;

    let queryString = "INSERT INTO users (firstname, lastname) VALUES (?, ?)";

    con.query(queryString, [firstname, lastname], (err, results, fields) => {
        if (err) {
            res.sendStatus(500);
            return;
        }

        let feedback = {status: "OK", userId: results.insertId}
        res.json(feedback);

        console.log("Ny bruker med ID: " + results.insertId);
    });
})


// Slett bruker fra database
app.post('/delete_user', (req, res) => {

    let id = req.body.id; // Hent ID som sendes med POST
    let queryString = "DELETE FROM users WHERE id = ?"; // Database query

    con.query(queryString, [id], (err, results, fields) => {
        if (err) {
            res.sendStatus(500);
            return;
        }

        let feedback = {status: "OK"}
        res.json(feedback);
    });
})

app.get('/users', (req, res) => {
    con.query("SELECT * FROM users", (err, rows, fields) => {
        if (err) {
            res.sendStatus(500);
            return;
        }
        res.json(rows);
    });
})

app.get('/user/:id', (req, res) => {

    let userId = req.params.id;
    let queryString = "SELECT * FROM users WHERE id = ?";

    con.query(queryString, [userId], (err, rows, fields) => {
        if (err) {
            res.sendStatus(500);
            return;
        }
        res.json(rows);
    });
})

app.listen(1337, () => console.log('Example app listening on port 1337!'))
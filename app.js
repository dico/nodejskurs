const express = require('express')
const mysql = require('mysql');
const app = express()

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

app.get('/', (req, res) => res.send('Hello World!!'))


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
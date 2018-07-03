const express = require('express')
var mysql = require('mysql');
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

app.get('/', (req, res) => res.send('Hello World!!'))
app.get('/users', (req, res) => {
    var user1 = {firstname: "Robert"}
    res.json(user1)
})

app.get('/user/:id', (req, res) => {

    const userId = req.params.id;
    const queryString = "SELECT * FROM users WHERE id = ?";

    con.query(queryString, [userId], (err, rows, fields) => {

        if (err) {
            res.sendStatus(500);
            return;
        }

        res.json(rows);
    });
})

app.listen(1337, () => console.log('Example app listening on port 1337!'))
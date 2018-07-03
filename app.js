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
    con.query("SELECT * FROM users", (err, rows, fields) => {
        res.json(rows);
    });
})

app.listen(1337, () => console.log('Example app listening on port 1337!'))
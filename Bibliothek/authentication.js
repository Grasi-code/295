const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');


const app = express();
app.use(session({
  secret: 'test', 
  resave: false,
  saveUninitialized: true
}));

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function(req, res){
    res.send("Willkomen")
})

// post request that posts the name to the session

app.post('/name', (req, res) => {
    const name = req.body.name; // Auslesen des 'name'-Werts aus dem Request-Body
    req.session.name = name; // Speichern des 'name'-Werts in der Session
    res.send(`Name wurde erfolgreich gespeichert. ${name}`);
    console.log(name);
});


//get request that returns the name from the session

app.get('/name', (req, res) => {
    const name = req.session.name; // Auslesen des 'name'-Werts aus der Session
    res.send(name);
    console.log(name);
});

// delete request that deletes the name from the session

app.delete('/name', (req, res) => {
    delete req.session.name; // Löschen des 'name'-Werts aus der Session
    res.send('Name wurde erfolgreich gelöscht.');
});

app.listen(3000, () => {
});

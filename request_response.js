const express = require('express');
const { get } = require('http');
const app = express()
const port = 3000;
const path = require('path')
const moment = require('moment-timezone');
const bodyParser = require('body-parser');
const https = require('https');
const axios = require('axios');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.get('/', function(req, res){
    res.send("Sali")
})

app.get('/now', function(req, res){
    const currentTime = new Date().toLocaleTimeString();
    res.send(`The current time is: ${currentTime}`);
});

app.get('/now2', (req, res) => {
    const { tz } = req.query;
    let timezone;

    if (tz) {
        timezone = tz;
    } else {
        timezone = 'UTC';
    }

    const currentTime = moment().tz(timezone).format('YYYY-MM-DD HH:mm:ss');

    res.send(`Aktuelle Zeit (${timezone}): ${currentTime}`);
});


app.get('/zli', function(req, res){
    res.redirect('https://www.zli.ch');
});

const names = [
    "Max",
    "Sophia",
    "Liam",
    "Emma",
    "Alex",
    "Seppli"
];

app.post('/namePost', (req, res) => {
  const { name } = req.body;
  console.log('${names}')

  if (name) {
    names.push(name);
    res.send('Name wurde zur Namensliste hinzugefügt.');
  } else {
    res.status(400).send('Name fehlt im Formular.');
  }

});

let nameList = ['Alice', 'Bob', 'Charlie'];

app.delete('/nameDelete', (req, res) => {
  const { name } = req.body;

  const index = nameList.indexOf(name);
  if (index !== -1) {
    nameList.splice(index, 1);
  }

  res.sendStatus(204);
});

app.get('/html', (req, res) =>{
    res.sendFile(path.join(__dirname, "/index.html"));
});

app.get('/image', (req, res) => {
    res.sendFile(path.join(__dirname, "/Dajiro-Kato-2.jpg"));
})

app.get('/teapot', (req, res) => {
    res.sendStatus(418);
});

app.get('/user-agent', (req, res) => {
    const userAgent = req.get('User-Agent');
    res.send(`User-Agent: ${userAgent}`);
});

app.get('/secret', (req, res) => {
    res.sendStatus(403);
});

app.get('/xml', (req, res) =>{
    res.sendFile(path.join(__dirname, "/test.xml"));
});

app.get('/me', (req, res) =>{
    res.sendFile(path.join(__dirname, "/info.json"));
});


app.get('/secret2', (req, res) =>{
    const auth = req.headers.authorization;
    if (auth == "Basic dGVzdDp0ZXN0"){
        res.sendStatus(200)
    }
    else{
        res.sendStatus(401)
    }
})

app.get('/chuck',(req, res) =>  {
	const name = req.query.name;
    axios.get("https://api.chucknorris.io/jokes/random").then((response) => {
        let joke = response.data.value.toString();
        joke = joke.replace("Chuck Norris", name.toString());
        console.log(name)
        console.log(joke)
        res.send(joke);
    });
});

let userData = {    
    "vorname": "Max",
    "nachname": "Mustermann",
    "alter": 25,
    "wohnort": "Berlin",
    "augenfarbe": "blau"
}; 

app.patch('/mePatch', (req, res) => {
    const updatedData = req.body;
    userData = updatedData;
    res.status(200).json({ message: 'JSON updated successfully' });
    console.log(updatedData);
});



app.listen(port, function() {
    console.log(`Example app listening on port ${port}!`)
});
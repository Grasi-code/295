const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
app.use(bodyParser.json());
app.use(session({
  secret: 'mysecretkey',
  resave: false,
  saveUninitialized: false
}));

// Middleware zum Überprüfen der Authentifizierung
const checkAuth = (req, res, next) => {
  if (req.session.authenticated) {
    next();
  } else {
    res.sendStatus(401);
  }
};

// Login-Endpunkt
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  // Hier sollte die eigentliche Überprüfung der Email und des Passworts erfolgen
  // Beispiel: if (validateUser(email, password)) {
  if (email === 'user@example.com' && password === 'password') {
    req.session.authenticated = true;
    req.session.email = email;
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
});

// Verify-Endpunkt
app.get('/verify', (req, res) => {
  if (req.session.authenticated) {
    res.status(200).json({ email: req.session.email });
  } else {
    res.sendStatus(401);
  }
});

// Logout-Endpunkt
app.delete('/logout', (req, res) => {
  req.session.authenticated = false;
  req.session.email = null;
  res.sendStatus(204);
});

// Beispielgeschützter Endpunkt für die Ressource "Lend"
app.get('/lends', checkAuth, (req, res) => {
  // Code zur Verarbeitung des Lend-Endpunkts
  res.send('Lend resource accessed');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

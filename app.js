const express = require('express');
const app = express();
const path = require('path');

app.use('/js', express.static(path.join(__dirname, 'public', 'js')));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/sobre', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'sobre.html'));
});

app.get('/contato', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'contato.html'));
});

const server = app.listen(3000, function () {
  console.log('Server running on port 3000');
});
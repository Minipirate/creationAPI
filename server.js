// importer body-parser et express
const express = require('express');
const bodyParser = require('body-parser');
const students = require('./app/routers/students.router.js');
//const lessons = require('./app/routers/lessons.router');
const users = require('./app/routers/users.router');
const { initDb } = require("./app/models/db"); 

const app = express(); //créer une application express
app.use(bodyParser.json()); //ajouter bodyParser comme middleware

initDb();

app.use('/students', students);
app.use('/', users);
//app.use('/lessons', lessons);

app.listen(3000);


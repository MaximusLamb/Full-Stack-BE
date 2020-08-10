const express = require('express');
const app = express();
const Superhero = require('../models/Superhero');

app.use(require('cors')());
app.use(express.json());

app.post('/superheroes', (req, res) => {
  Superhero
    .create(req.body)
    .then(superhero=> res.send(superhero));
});

app.get('/superheroes', (req, res) => {
  Superhero
    .find()
    .then(superheroes => res.send(superheroes));
});

app.get('/superheroes/:id', (req, res) => {
  Superhero
    .findById(req.params.id)
    .then(superhero => res.send(superhero));
});

app.patch('/superheroes/update/:id', (req, res) => {
  Superhero
    .findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(superhero => res.send(superhero));
});

app.delete('/superheroes/:id', (req, res) => {
  Superhero
    .findByIdAndDelete(req.params.id)
    .then(superhero => res.send(superhero));
});

module.exports = app;

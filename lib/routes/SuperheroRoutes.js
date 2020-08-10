const { Router } = require('express');
const Superhero = require('../models/Superhero');

module.exports = Router()

  .post('/superheroes', (req, res) => {
    Superhero
      .create(req.body)
      .then(superhero=> res.send(superhero));
  })

  .get('/superheroes', (req, res) => {
    Superhero
      .find()
      .then(superheroes => res.send(superheroes));
  })

  .get('/superheroes/:id', (req, res) => {
    Superhero
      .findById(req.params.id)
      .then(superhero => res.send(superhero));
  })

  .patch('/superheroes/update/:id', (req, res) => {
    Superhero
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(superhero => res.send(superhero));
  })

  .delete('/superheroes/:id', (req, res) => {
    Superhero
      .findByIdAndDelete(req.params.id)
      .then(superhero => res.send(superhero));
  });


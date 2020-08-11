const { Router } = require('express');
const Superhero = require('../models/Superhero');

module.exports = Router()

  .post('/', (req, res) => {
    Superhero
      .create(req.body)
      .then(superhero=> res.send(superhero));
  })

  .get('/', (req, res) => {
    Superhero
      .find()
      .then(superheroes => res.send(superheroes));
  })

  .get('/:id', (req, res) => {
    Superhero
      .findById(req.params.id)
      .then(superhero => res.send(superhero));
  })

  .patch('/update/:id', (req, res) => {
    Superhero
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(superhero => res.send(superhero));
  })

  .delete('/:id', (req, res) => {
    Superhero
      .findByIdAndDelete(req.params.id)
      .then(superhero => res.send(superhero));
  });


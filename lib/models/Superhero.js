const mongoose = require('mongoose');

const superHeroSchema = new mongoose.Schema({
    
  name: {
    type: String,
    require: true
  },
  power: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Superhero', superHeroSchema);

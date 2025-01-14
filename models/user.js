const mongoose = require('mongoose');

const beerSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
  },
  type: { 
    type: String, 
    required: true,
  },
  method: { 
    type: String, 
    enum: ['tap', 'can', 'bottle', 'other'],
  },
  rating: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
  },
  comment: {
    type: String,
  }
});
 
const brewerySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
  },
  location: { 
    type: String, 
    required: true,
  },
  link: { 
    type: String, 
    required: true,
  },
  beer: {
    type: String,
    // default: []
  },
  rating: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
  },
  comment: {
    type: String,
  }
});

const userSchema = mongoose.Schema({
  firstname: {
    type: String,
    // required: true,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String
  },
  age: {
    type: Number,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  brewery: {
    type: [brewerySchema],
    default: []
 }
});

const User = mongoose.model('User', userSchema);

module.exports = User;



const mongoose = require('mongoose');
 
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
    type: String,
    enum: ['🍻', '🍻🍻', '🍻🍻🍻', '🍻🍻🍻🍻', '🍻🍻🍻🍻🍻'],
  },
  comment: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const userSchema = mongoose.Schema({
  firstname: {
    type: String,
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



const mongoose = require('mongoose');

// Define a schema for the Person model
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number
  }
});

// Create a Mongoose model based on the schema
const User = mongoose.model('User', userSchema);

// Export the Person model
module.exports = User;

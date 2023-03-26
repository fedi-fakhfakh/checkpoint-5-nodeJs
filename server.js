require('dotenv').config();

const bodyParser = require('body-parser');

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const express = require('express');
const app = express();

// Import the Person model
const User = require('./models/User');


app.use(bodyParser.json());

// Route to get all users from the database
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

// Route to add a new user to the database
app.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json(user);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

// Route to edit a user by ID
app.put('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user.name = req.body.name;
    user.age = req.body.age;
    await user.save();
    res.json(user);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

// Route to delete a user by ID
app.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log('Server started on port 3000');
});


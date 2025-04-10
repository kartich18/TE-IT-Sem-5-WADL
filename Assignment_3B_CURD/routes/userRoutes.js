const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Create a new user
router.post('/users', userController.create);

// Get all users
router.get('/users', userController.findAll);

// Get a single user by ID
router.get('/users/:id', userController.findOne);

// Update a user by ID
router.put('/users/:id', userController.update);

// Delete a user by ID
router.delete('/users/:id', userController.destroy);

module.exports = router;
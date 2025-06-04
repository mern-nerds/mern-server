const express = require('express');
const router = express.Router();
const users = require('../data/users.json');

// GET /user — returns all test users from JSON
router.get('/', (req, res) => {
  res.json(users);
});

module.exports = router;

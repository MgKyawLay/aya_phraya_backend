const express = require('express');
const { regsiterUser, loginUser } = require('../controller/authController');
const router = express.Router();

router.post('/register',regsiterUser);
router.post('/login', loginUser)

module.exports = router;
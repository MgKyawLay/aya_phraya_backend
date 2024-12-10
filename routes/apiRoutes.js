const express = require('express');
const { recharge } = require('../controller/homeController');
const { authenticateToken } = require('../middlewares/middleware');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({message: "api route"})
})

router.post('/recharge', authenticateToken,recharge);

module.exports = router;
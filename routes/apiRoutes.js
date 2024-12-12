const express = require('express');
const { authenticateToken } = require('../middlewares/middleware');
const { requestRecharge } = require('../controller/rechargeController');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({message: "api route"})
})

router.get('/recharge-request', (req, res) => {
    return res.status(500).json({message: "wrong method"});
});
router.post('/recharge-request', requestRecharge);

module.exports = router;
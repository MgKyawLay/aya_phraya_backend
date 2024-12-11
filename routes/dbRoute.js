const express = require('express');
const { checkDatabaseHealth } = require('../model/db');
const router = express.Router();

router.get('/health', async (req, res) => {
  try {
    const isHealthy = await checkDatabaseHealth();

    if (isHealthy) {
      res.status(200).json({ status: 'healthy', database: 'connected' });
    } else {
      res.status(500).json({ status: 'unhealthy', database: 'disconnected' });
    }
  } catch (error) {
    res.status(500).json({
      status: 'unhealthy',
      database: 'disconnected',
      error: error.message,
    });
  }
});

module.exports = router;

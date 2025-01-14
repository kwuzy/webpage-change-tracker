const express = require('express');

const router = express.Router();

router.post('/add', async (req, res) => {
    res.json({ message: 'hello world.' });
});

module.exports = router;
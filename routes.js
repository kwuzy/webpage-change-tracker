const express = require('express');

const router = express.Router();

const { getPageContent } = require('./helper.js');

router.post('/add', async (req, res) => {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: 'No URL' });
    try {
        const pageContent = await getPageContent(url);
        res.json({ message: pageContent });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
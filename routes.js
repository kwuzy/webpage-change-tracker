const express = require('express');

const router = express.Router();

const {
    removeHttpUrl,
    hashString,
    tryToAddNewPageDictionaryElement,
    getPageContent } = require('./helper.js');

router.post('/add', async (req, res) => {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: 'No URL' });
    try {
        const pageContent = await getPageContent(url);
        const shortenedUrl = removeHttpUrl(url);
        const pageHash = hashString(pageContent);
        if (tryToAddNewPageDictionaryElement(shortenedUrl, pageHash)) {
            res.json({ newPageAdded: pageHash });
        } else {
            res.status(409).json({ pageAlreadyExists: pageHash });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
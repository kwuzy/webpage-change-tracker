const express = require('express');

const router = express.Router();

const {
    removeHttpUrl,
    ensureValidHttpUrl,
    hashString,
    tryToAddNewPageDictionaryElement,
    getPageContent } = require('./helper.js');

router.post('/add', async (req, res) => {
    const { url } = req.body;
    const validUrl = ensureValidHttpUrl(url);
    if (!validUrl) return res.status(400).json({ error: 'No URL' });
    try {
        const pageContent = await getPageContent(validUrl);
        const shortenedUrl = removeHttpUrl(validUrl);
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

router.get('/list', (req, res) => {
    res.json(pageDictionary);
});

module.exports = router;
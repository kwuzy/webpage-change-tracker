const express = require('express');

const router = express.Router();

const {
    removeHttpUrl,
    ensureValidHttpUrl,
    hashString,
    tryToAddNewPageDictionaryElement,
    getPageDictionaryList,
    checkPage,
    getPageContent, } = require('./helper.js');

router.post('/add', async (req, res) => {
    const { url } = req.body;
    const validUrl = ensureValidHttpUrl(url);
    if (!validUrl) return res.status(400).json({ error: 'No URL' });
    try {
        const pageContent = await getPageContent(validUrl);
        if (pageContent.error) {
            throw new Error(pageContent.error);
        }
        const shortenedUrl = removeHttpUrl(validUrl);
        const pageHash = hashString(pageContent);
        if (tryToAddNewPageDictionaryElement(shortenedUrl, pageHash)) {
            res.json({ newPageAdded: shortenedUrl });
        } else {
            res.status(409).json({ pageAlreadyExists: shortenedUrl });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/list', (req, res) => {
    res.json(getPageDictionaryList());
});

router.get('/check', async (req, res) => {
    const { url } = req.body;
    const validUrl = ensureValidHttpUrl(url);
    if (!validUrl) return res.status(400).json({ error: 'No URL' });
    try {
        const doesPageMatch = await checkPage(validUrl);
        if (doesPageMatch.error) {
            if (doesPageMatch.error === 'Page not tracked') {
                return res.status(404).json({ error: 'Page not tracked' });
            } else {
                throw new Error(doesPageMatch.error);
            }
        }
        res.json({ doesPageMatch: doesPageMatch });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/checkAll', async (req, res) => {
    const pageList = getPageDictionaryList();
    const pageStatus = {};
    for (let page of pageList) {
        const validUrl = ensureValidHttpUrl(page);
        if (validUrl) {
            const doesPageMatch = await checkPage(validUrl);
            if (doesPageMatch.error) {
                pageStatus[page] = doesPageMatch.error;
            } else {
                pageStatus[page] = doesPageMatch;
            }
        } else {
            pageStatus[page] = 'Invalid URL';
        }
    }
    res.json(pageStatus);
});

module.exports = router;
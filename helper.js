const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const crypto = require('crypto');

const FILE_PATH = './watchPages.txt';

let pageDictionary = {};

const removeHttpUrl = (str) => {
    let newUrl = str.replace(/^https?:\/\//, "").replace(/\/$/, "");
    return newUrl;
}

const hashString = (str) => {
    return crypto.createHash('sha256').update(str).digest('hex');
};

const loadPageDictionary = () => {
    if (fs.existsSync(FILE_PATH)) {
        const data = fs.readFileSync(FILE_PATH, 'utf8');
        pageDictionary = data ? JSON.parse(data) : {};
    } else {
        pageDictionary = {};
    }
};

const savePageDictionary = () => {
    fs.writeFileSync(FILE_PATH, JSON.stringify(pageDictionary, null, 2));
};

const tryToAddNewPageDictionaryElement = (url, hash) => {
    if (pageDictionary[url]) return false;
    pageDictionary[url] = hash;
    savePageDictionary();
    return true;
};

const getPageContent = async (url) => {
    try {
        const response = await axios.get(url, {
            timeout: 10000, // 10 seconds
        });
        const $ = cheerio.load(response.data);
        $('script, style').remove(); // remove script and css tags
        return $('body')
            .text()
            .replace(/[\n\t]/g, ' ') // replace newlines and tabs with a single space
            .replace(/\s+/g, ' ') // replace multiple spaces with a single space
            .trim();
    } catch (error) {
        if (error.code === 'ECONNABORTED') {
            throw new Error('Request timed out');
        } else {
            throw new Error(`Failed to get page content`);
        }
    }
}

module.exports = {
    removeHttpUrl,
    hashString,
    loadPageDictionary,
    tryToAddNewPageDictionaryElement,
    getPageContent,
};
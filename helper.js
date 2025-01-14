const axios = require('axios');
const cheerio = require('cheerio');

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
    getPageContent,
};
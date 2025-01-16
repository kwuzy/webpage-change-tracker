const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes.js');
const { loadPageDictionary } = require('./helper.js');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 3000;

loadPageDictionary();
app.use('/', routes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
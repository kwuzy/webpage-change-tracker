const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes.js');
const cors = require('cors');
const { loadPageDictionary } = require('./helper.js');

const api = express();
api.use(cors());
api.use(express.json())
api.use(bodyParser.urlencoded({ extended: true }));

const PORT = 8080;

loadPageDictionary();
api.use('/', routes);

api.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
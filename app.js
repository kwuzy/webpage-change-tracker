const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes.js');

const app = express();
app.use(bodyParser.json());

const PORT = 3000;

app.use('/', routes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
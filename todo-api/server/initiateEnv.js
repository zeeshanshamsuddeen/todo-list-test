const path = require('path');
const dotenv = require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

module.exports = dotenv;

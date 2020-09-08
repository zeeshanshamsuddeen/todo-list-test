const mongoose = require('mongoose');
const config = require('../config');

mongoose.Promise = global.Promise;
const { DATABASE } = config.appDefaults;
const { URL, NAME } = DATABASE;
const mongoOptions = {
  useNewUrlParser: true,
  useFindAndModify: false,
};
mongoose.connect(`mongodb://${URL}/${NAME}`, mongoOptions);

module.exports = mongoose;

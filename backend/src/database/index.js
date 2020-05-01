const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/buyrest', { useNewUrlParser: true,  useUnifiedTopology: true });
mongoose.set('useCreateIndex', true);

mongoose.Promise = global.Promise;

module.exports = mongoose;
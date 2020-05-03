const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//app.use(cors());
app.use(express.static('public'));
app.use(cors());
//app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.send('OK');
});

require('./controller/authController')(app);
require('./controller/authVendorController')(app);

require('./controller/vendorList')(app);
require('./controller/vendorProducts')(app);
require('./controller/vendorAddProducts')(app);

require('./controller/productData')(app);

require('./controller/orderAdd')(app);
require('./controller/orderList')(app);

app.listen(3333);
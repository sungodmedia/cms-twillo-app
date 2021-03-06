'use strict';
let express = require('express');
let app = express();
let models = require('./models');
let bodyParser = require('body-parser');
let userRouter = express.Router();
let remittanceRouter = express.Router();
let paymentRouter = express.Router();
let activityRouter = express.Router();
let loginRouter = express.Router();
let adminRouter = express.Router();
let smsRouter = express.Router();

var port = process.env.PORT || 3000;
console.log(process.env.PORT);

app.use(bodyParser.json());

require('./routes/login-routes')(loginRouter, models);
require('./routes/admin-routes')(adminRouter, models);
require('./routes/user-routes')(userRouter, models);
require('./routes/payment-routes')(paymentRouter, models);
require('./routes/remittance-routes')(remittanceRouter, models);
require('./routes/activity-routes')(activityRouter, models);
require('./routes/sms-routes')(smsRouter, models);



app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, authorization, token');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});
app.use(express.static(__dirname + '/build'));

app.use('/', paymentRouter, userRouter, remittanceRouter,
        loginRouter, adminRouter, activityRouter, smsRouter);



app.listen(port, () => {
  console.log('Server running on '+ port);
});

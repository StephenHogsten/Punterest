require('dotenv').config();
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');
const Pin = require('./server/models/Pin');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI, (err) => {
  // eslint-disable-next-line
  if (err) console.log('mongoose connection error: ' + err);
});

// initialize app
const app = express();

// var sessionOptions = {
//   secret: process.env.SECRET || 'simplesecret',
//   resave: false,
//   saveUninitialized: true,
//   store: new MongoStore({
//     mongooseConnection: mongoose.connection
//   })
// };
// if (process.env.ENV_TYPE === 'PRODUCTION') {
//   sessionOptions.cookie = { secure: true };
//   app.set('trust proxy', 1);
// }

// // execute my passport set-up
// // require('./server/configurePassport.js')(passport);

app.use(bodyParser.json());
// app.use(session( sessionOptions ));
// app.use(passport.initialize());
// app.use(passport.session());

// const router = require('./server/routes')(passport);
// app.use('/api', router);d

app.get('/api/test', (req, res) => {
  res.send('successful test');
});

app.get('/api/test/pins.json', (req, res) => {
  res.sendFile(process.cwd() + '/mock_data/pins.json');
});

app.route('/api/pins')
  .get( (req, res) => {
    Pin.find( {}, (err, docs) => {
      res.send(docs.map( (val) => {
        return {
          this_user_likes: true,        // TODO add the actual calculation
          is_saving: false,
          likes: val.likes.length,
          img_url: val.img_url,
          uploader: val.uploader
        };
      }));
    });
  });
app.route('/api/pin')
  .post( (req, res) => {
    Pin.create({
      uploader: 'hogdogthenewgod',       // TODO - fix this
      img_url: decodeURIComponent(req.body.img_url),
      likes: [ 'hogdogthenewgod' ]
    }, (err, doc) => {
      if (err) { res.send({ success: false, error: err }); }
      else { res.send({ success: true }); }
    });
  });

const port = Number(process.env.PORT) + 1 || 3001;
app.listen(port, () => {
  // eslint-disable-next-line
  console.log('listening on port ' + (port));
});

require('dotenv').config();
const path = require('path');
const express = require('express');
const session = require('express-session');
// const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpack = require("webpack");
const webpackConfig = require("./webpack.config");
const bodyParser = require('body-parser');

const Pin = require('./server/models/Pin');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI, (err) => {
  // eslint-disable-next-line
  if (err) console.log('mongoose connection error: ' + err);
});

passport.use( 
  new TwitterStrategy({
    consumerKey: process.env.TWITTER_KEY,
    consumerSecret: process.env.TWITTER_SECRET,
    callbackURL: 'http://127.0.0.1:3000/api/login/callback'
  }, function(token, tokenSecret, profile, cb) {
    return cb(null, profile);
  })
);
passport.serializeUser((user, cb) => cb(null, user));
passport.deserializeUser((obj, cb) => cb(null, obj));


// INITIALIZE APP
const app = express();

// app.use('/public', express.static(path.join(__dirname, 'public')));

var sessionOptions = {
  secret: process.env.SECRET || 'bigoldsecret',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  })
};
if (process.env.ENV_TYPE === 'PRODUCTION') {
  sessionOptions.cookie = { secure: true };
  app.set('trust proxy', 1);
}


app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(session( sessionOptions ));
app.use(passport.initialize());
app.use(passport.session());

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
    if (!req.user) { return res.send({ success: false, message: 'no user found'}); }
    let username = req.user.username;
    if (!username) { return res.send({ success: false, message: 'no username found'}); }
    Pin.create({
      uploader: username,       
      img_url: decodeURIComponent(req.body.img_url),
      likes: [ username ]
    }, (err, doc) => {
      if (err) { res.send({ success: false, error: err }); }
      else { res.send({ success: true }); }
    });
  });

app.get('/api/login', passport.authenticate('twitter'));
app.get('/api/login/callback', passport.authenticate('twitter', { 
  successRedirect: '/login_success',
  failureRedirect: '/login_failure' 
}));
app.get('/api/checkSession', (req, res) => {
  res.json({
    username: req.user? req.user.username: ''
  });
});
app.get('/api/logout', (req, res) => {
  req.logout();
  res.redirect('/');
})

let compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, {
  publicPath: '/public',
  index: 'index.html',
  stats: { colors: true }
}));
app.use('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), '/public/index.html'));
});

const port = Number(process.env.PORT) || 3000;
app.listen(port, () => {
  // eslint-disable-next-line
  console.log('listening on port ' + (port));
});

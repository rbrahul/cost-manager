var flash = require('express-flash');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var nunjucks = require('nunjucks');
var session = require('express-session');
var bodyParser = require('body-parser'); 
var app = express();
var expressValidator=require('express-validator');
var mongoose=require('mongoose');
var mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/costmanager',function(err){
  if(err){
    
  console.log("Database connection failed");
  }
});
mongoose.connection.on('connected',function(){
  console.log("Database connected");
});

app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '{'+ param+':'+ namespace.shift() + '}';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

app.use(session({
    secret: 'abcdef123',
    resave:true,
    saveUninitialized:true
}));
app.use(flash());
var User=require('./models/user');
app.use(function(req, res, next) {
  if (req.session && req.session.user) {
    User.findOne({ email: req.session.user.email }, function(err, user) {
      if (user) {
        req.user = user;
        delete req.user.password; // delete the password from the session
        req.session.user = user;  //refresh the session value
        res.locals.user = user;
        req.session.save();
      }
      // finishing processing the middleware and run the route
      next();
    });
  } else {
    next();
  }
});
var routes = require('./routes/index');
var users = require('./routes/users');
var api = require('./routes/api');
var costCategory = require('./routes/costCategory');
var costEntry = require('./routes/costentry');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
nunjucks.configure('views', {
    autoescape: true,
    express: app
});
app.set('port',process.env.PORT||3000);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/api', api);
app.use('/categories', costCategory);
app.use('/costs', costEntry);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

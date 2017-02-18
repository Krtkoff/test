/**
 * Created by Krtkoff on 18.02.2017.
 */

/**
 * Created by Krtkoff on 5.6.2016.
 */

var express     = require('express'),
    path        = require('path'),
    http        = require('http'),
    ejs         = require('ejs'),
    tpl         = require('./staticType'),
    url         = require('url'),
    fs          = require('fs'),
    router      = require('./routes'),
    buildConfig = require('../build.config'),
    sass        = require('./express-sass');

var app         = express();

app.engine('.html', ejs.__express);
app.set('views', path.join(__dirname,'..','client','src'));
app.set('view engine', 'html');

app.use('/client/src'   , express.static(path.join(__dirname, '../client/src')));
app.use('/client/vendor', express.static(path.join(__dirname, '../client/vendor')));

app.use('/client/src',sass({
  loadPath: [],
  src: './client/src',
  cache_location: './.sass-cache'
}));


app.use(tpl(path.join(__dirname, '..','client','src','app')));
app.use(tpl(path.join(__dirname, '..','client','src','common')));

app.use(function(req,res, next){
  var rootDir  = path.join(__dirname, '..', buildConfig.app_dir, 'app'),
      pathname = url.parse(req.url).pathname,
      dirname  = path.dirname(pathname),

      pathExists = fs.existsSync(path.join(rootDir, pathname)) || ( dirname!=='/' && fs.existsSync(path.join(rootDir, dirname)) );

  if (!pathExists && pathname !== dirname){
    res.status(404);
  }

  router.index(req,res, next);
});

module.exports = http.createServer(app);

module.exports.on('listening',function(){
  console.log("Listening on port " + (this.address().port+"")+ " in " + app.get('env') + " mode");
});


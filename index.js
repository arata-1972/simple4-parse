// Example express application adding the parse-server module to expose Parse
// compatible API routes.

var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var path = require('path');

var databaseUri = process.env.DATABASE_URI || process.env.MONGODB_URI;

if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}

var api = new ParseServer({
  databaseURI: databaseUri || 'mongodb://heroku_m0t8c028:fsmrvbtoq7a789lr7m2kfvj6de@ds031157.mlab.com:31157/heroku_m0t8c028',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || 'kucok7cmperlkewrsq6ghgx5vor84ghgbyqju0hc',
  masterKey: process.env.MASTER_KEY || 'wv2i8p38407ftw2d4i847ltbyx9w8k0pse5t4aix', //Add your master key here. Keep it secret!
  serverURL: process.env.SERVER_URL || 'https://japanese-spanish-dictionary.herokuapp.com/parse',  // Don't forget to change to https if needed
  liveQuery: {
    classNames: ["Posts", "Comments"] // List of classes to support for query subscriptions
  },
  // 以下為新增部分
  push: {
    // 此篇未提到 Android，因此註解掉
    // android: {
    //   senderId: '...',
    //   apiKey: '...'
    // },
    ios: {
      pfx:  __dirname + '/iPhone12/com.arata1972.japanese.spanish.dict.p12', // 與 index.js 目錄同層
      bundleId: 'com.arata1972.japanese.spanish.dict', // 填入先前填的 Bundle ID
      production: true // false: development, true: production
    }
  }
});
// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKey

var app = express();

// Serve static assets from the /public folder
app.use('/public', express.static(path.join(__dirname, '/public')));

// Serve the Parse API on the /parse URL prefix
var mountPath = process.env.PARSE_MOUNT || '/parse';
app.use(mountPath, api);

// Parse Server plays nicely with the rest of your web routes
app.get('/', function(req, res) {
  res.status(200).send('I dream of being a website.  Please star the parse-server repo on GitHub!');
});

// There will be a test page available on the /test path of your server url
// Remove this before launching your app
app.get('/test', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/test.html'));
});

var port = process.env.PORT || 1337;
var httpServer = require('http').createServer(app);
httpServer.listen(port, function() {
    console.log('parse-server-example running on port ' + port + '.');
});

// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer);

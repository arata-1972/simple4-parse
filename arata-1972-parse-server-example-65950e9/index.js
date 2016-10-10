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
  databaseURI: databaseUri || 'mongodb://heroku_rkkf2ws6:h56hgokgqji34bnqfc00stmksq@ds011775.mlab.com:11775/heroku_rkkf2ws6/dev',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || '7iQswl5kOnrXyXR6xSp7YL795QXRTauY7tMAZp9Y',
  masterKey: process.env.MASTER_KEY || 'r2NaBd3Sdcb82h5cfF5NajrvgxoJiJBdchW2NM0x', //Add your master key here. Keep it secret!
  serverURL: process.env.SERVER_URL || 'https://japanese-chinese.herokuapp.com/parse',  // Don't forget to change to https if needed
  liveQuery: {
    classNames: ["Posts", "Comments"] // List of classes to support for query subscriptions
  }
         "push": {
    "android": {
      "senderId": "aaa",
      "apiKey":"aaa"
    },
    "ios": {
      "pfx": "/Users/arata1972/Documents/iPhoneP12/com.satoshogoTranslate-Chinese store.p12",
      "pfx": "/Users/arata1972/Documents/iPhoneP12/com.satoshogoChinesePro store.p12",
      "pfx": "/Users/arata1972/Documents/iPhoneP12/com.satoshogoJapaneseChineseEnlishPaid store.p12",
       "pfx": "/Users/arata1972/Documents/iPhoneP12/com.satoshogo.SimplePinyin store.p12",
        "pfx": "/Users/arata1972/Documents/iPhoneP12/com.arata1972.SimpleChinesePinyin store.p12",
        "bundleId": "com.arata1972.SimpleChinesePinyin",
       "bundleId": "com.satoshogo.SimplePinyin",
      "bundleId": "com.satoshogoTranslate-Chinese",
      "bundleId": "com.satoshogoChinesePro",
      "bundleId": "com.satoshogoJapaneseChineseEnlishPaid"
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

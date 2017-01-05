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
	  databaseURI: databaseUri || 'mongodb://heroku_39ph8l15:2qe15qkc248vl44r3837r3mha4@ds017205.mlab.com:17205/heroku_39ph8l15',
	  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
	  appId: process.env.APP_ID || 'LPCuEZXRHqxJcdoa2O6n5sfqkibzYzhk1RwWa8W1',
	  masterKey: process.env.MASTER_KEY || 'Aln2aRCdNE2T7GRHMuWUgYs3heSQICSdTqeqo6T0', //Add your master key here. Keep it secret!
	  serverURL: process.env.SERVER_URL || 'https://simple-translator4.herokuapp.com/parse',  // Don't forget to change to https if needed
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
	    ios:[
	      {
	        pfx: __dirname + '/iPhoneP12/com.satoshogo.SimplePersianGerman store.p12',
	        bundleId: 'com.satoshogo.SimplePersianGerman',
	        production: true
	      },
		    {
	        pfx: __dirname + '/iPhoneP12/com.satoshogo.SimpleEnglishPersian store.p12',
	        bundleId: 'com.satoshogo.SimpleEnglishPersian',
	        production: true
	      },
		    {
	        pfx: __dirname + '/iPhoneP12/com.satoshogo.SimpleJapaneseIndonesian store.p12',
	        bundleId: 'com.satoshogo.SimpleJapaneseIndonesian',
	        production: true
	      },
		    {
	        pfx: __dirname + '/iPhoneP12/com.satoshogo.SimpleRussianChinese store.p12',
	        bundleId: 'com.satoshogo.SimpleRussianChinese',
	        production: true
	      },
		    {
	        pfx: __dirname + '/iPhoneP12/com.satoshogo.SimpleJapaneseFrench store.p12',
	        bundleId: 'com.satoshogo.SimpleJapaneseFrench',
	        production: true
	      },
	  {
		pfx: __dirname + '/iPhoneP12/com.satoshogo.SimpleJapaneseGerman store.p12', 
	        bundleId: 'com.satoshogo.SimpleJapaneseGerman',  
	        production: true
	      }
	       ]
	  },
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

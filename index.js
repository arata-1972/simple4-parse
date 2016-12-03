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
	  databaseURI: databaseUri || 'mongodb://heroku_9m219cnn:seld6gfusqp4hkvnpdi9mj44dg@ds031965.mlab.com:31965/heroku_9m219cnn',
	  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
	  appId: process.env.APP_ID || 'e5KgVRXCV4ispgRJTupQ4t7MlbO4pNWnEiQ2PCGI',
	  masterKey: process.env.MASTER_KEY || '2fszed3GfnV5gl3ku4QuF6dKv68hffARLSGxLcKI', //Add your master key here. Keep it secret!
	  serverURL: process.env.SERVER_URL || 'https://english-thai.herokuapp.com/parse',  // Don't forget to change to https if needed
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
	        pfx: __dirname + '/iPhoneP12/com.satoshogoEnglish-vietnam store.p12',
	        bundleId: 'com.satoshogoEnglish-vietnam',
	        production: true
	      },
	      {
	        pfx: __dirname + '/iPhoneP12/com.satoshogoEngishRussan store.p12', 
	        bundleId: 'com.satoshogoEngishRussan',  
	        production: true
	      },
	      {
	        pfx: __dirname + '/iPhoneP12/com.satoshogoEnglishHebrew store.p12', 
	        bundleId: 'com.satoshogoEnglishHebrew',  
	        production: true
	      },
	      {
	        pfx: __dirname + '/iPhoneP12/com.satoshogoEngishTurkey store.p12', 
	        bundleId: 'com.satoshogoEngishTurkey',  
	        production: true
	      },
	      {
	        pfx: __dirname + '/iPhoneP12/com.satoshogoEnglishFrench store.p12', 
	        bundleId: 'com.satoshogoEnglishFrench',  
	        production: true
	      },
		{
	        pfx: __dirname + '/iPhoneP12/com.satoshogoEnglishVietnamnese store.p12', 
	        bundleId: 'com.satoshogoEnglishVietnamnese',  
	        production: true
	      },
// 		{
// 	        pfx: __dirname + '/iPhoneP12/com.satoshogo.EnglishArabic.remake store.p12', 
// 	        bundleId: 'com.satoshogo.EnglishArabic.remake',  
// 	        production: true
// 	      },
		{
	        pfx: __dirname + '/iPhoneP12/com.satoshogoWeatherNews store.p12', 
	        bundleId: 'com.satoshogoWeatherNews',  
	        production: true
	      },
// 		 {
// 	        pfx: __dirname + '/iPhoneP12/com.satoshogoEnglishAfrikaans store.p12', 
// 	        bundleId: 'com.satoshogoEnglishAfrikaans',  
// 	        production: true
// 	      },
		    {
	        pfx: __dirname + '/iPhoneP12/com.satoshogoThaiArabic store.p12', 
	        bundleId: 'com.satoshogoThaiArabic',  
	        production: true
	      },
		    {
	        pfx: __dirname + '/iPhoneP12/com.satoshogoKoreanRussian store.p12', 
	        bundleId: 'com.satoshogoKoreanRussian',  
	        production: true
	      },
		{
	        pfx: __dirname + '/iPhoneP12/com.satoshogoKoreanVietnamnese store.p12', 
	        bundleId: 'com.satoshogoKoreanVietnamnese',  
	        production: true
	      },
		{
	        pfx: __dirname + '/iPhoneP12/com.satoshogoChineseArabicEglish store.p12', 
	        bundleId: 'com.satoshogoChineseArabicEglish',  
	        production: true
	      },
		{
	        pfx: __dirname + '/iPhoneP12/com.satoshogoEnglishIndonesian store.p12', 
	        bundleId: 'com.satoshogoEnglishIndonesian',  
	        production: true
	      },
		{
	        pfx: __dirname + '/iPhoneP12/com.satoshogoArabicIndoneian store.p12', 
	        bundleId: 'com.satoshogoArabicIndoneian',  
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


Parse.Cloud.define('currentTime', function(req, res) {
  res.success(""+new Date().getTime());
});


Parse.Cloud.define('hello', function(req, res) {
 res.success('hi');
});




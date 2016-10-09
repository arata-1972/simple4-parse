
Parse.Cloud.define('currentTime', function(req, res) {
  res.success(""+new Date().getTime());
});


Parse.Cloud.define('progress', function(req, res) {
  res.success('progressVisible');
});


Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});


Parse.Cloud.define('progress', function(req, res) {
  res.success('progressVisible');
});

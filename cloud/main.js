Parse.Cloud.define('currentTime', function(req, res) {
  res.success(""+new Date().getTime());
});


Parse.Cloud.define('hello', function(req, res) {
 res.success('hi');
});


Parse.Cloud.define('elementsBaidu', function(req, res) {
 res.success('document.getElementsByClassName(<ordinary-output target-output clearfix>)[0].innerText');
});


Parse.Push.send({
  where: query,
  data: {
    alert: 'Test',
    badge: 1,
    sound: 'default'
  }
}, {
  useMasterKey: true,
  success: function() {
    // Push sent!
  },
  error: function(error) {
    // There was a problem :(
  }
});
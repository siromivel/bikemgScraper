var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('scrape', { title: 'Express' });
});

module.exports = router;

exports.index = function(data) {
  return function(req, res) {
    res.render('scrape');
    data.sockets.on('connection', function(socket) {
      socket.emit('message', 'welcome');
    });
  }
}
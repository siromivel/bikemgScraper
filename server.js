var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

app.get('/', function(req, res){
  	
	url = 'https://www.sram.com/sram/mountain/products/sram-xx1-trigger-shifter';

	request(url, function(error, response, html){
		if(!error){
			var $ = cheerio.load(html);

			var component, name, weight;
      var json = { name : "", component : "", weight: "" }
      
      var $data = $('#sram-headline-dropdown h1');
      $data.filter(function() {
        var $name = $data.text();
        json.name = $name;
      });
      var $data = $('#fragment-2 > table tr:nth-child(1) td:nth-child(2)');
      $data.filter(function() {
        var $weight = $data.text();
        json.weight = $weight;
      });
      var $data = $('.current-component');
      $data.filter(function() {
        var $component = $data.text();
        json.component = $component;
      });
    }
        // Output the desired data to a json file using fs
        // Param 1:  output.json - this is what the created filename will be called
        // Param 2:  JSON.stringify(json, null, 4) - the data to write; use JSON.stringify to beautify output
        // Param 3:  callback
        fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
          console.log(json);
        	console.log('File successfully written! - Check your project directory for the output.json file');
        })

        // Notify the browser that this application outputs to the console
        res.send('Check your console!');
	})
})

app.listen('8081');
console.log('Magic happens on port 8081');
exports = module.exports = app;
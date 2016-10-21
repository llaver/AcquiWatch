var path = require('path');
var Acqui = require('./models/acqui');

module.exports = function(app) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

	app.get('/api/acquis', function(req, res) {
	    // use mongoose to get all nerds in the database
        Acqui.find(function(err, acquis) {
            // if there is an error retrieving, send the error. Nothing after res.send(err) will execute
	        if(err) {
	            res.send(err);
	        } else {
	        	res.json(acquis); // return all nerds in JSON format
	    	}
	    });
	});

	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('/', function(req, res) {
		//res.sendFile('./public/views/index.html');
		res.sendFile(path.join(__dirname, '../public', 'index.html'));
	});

};
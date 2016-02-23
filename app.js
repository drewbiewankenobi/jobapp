// Requires \\
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Create Express App Object \\
var app = express();

// Application Configuration \\
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
mongoose.connect('mongodb://localhost/Conglomo')

//Data\\

var Drone = mongoose.model( "Drone", {
	name: {type: String},
	bio: {type: String},
	skills : {type: Array},
	years : {type: Number},
	why: {type: String},

})

// var drew = new Drone({name:"Drew",bio:"I AM GREAT", skills:["being great", "beardliness"],
// 	exp: 11, answer : "I am great."})



// drew.save(function (err) {
//   if (err) return handleError(err);
//   else console.log("You did it!" + drew.name)
//   // saved!
// })


// Routes \\

app.get('/', function(req, res) {
	res.sendFile('html/index.html', {root : './public'});
});

// displays a list of applicants
app.get('/applicants', function(req, res){
	res.sendFile('html/applicants.html', {root : './public'});
	
});

app.get('/api/people', function(req, res){
	Drone.find({}, function(err, drones){
	 	if (err) {
	 		return handleError(err)
	 	}
	 	else {
			res.send(drones)
		}
	})
})

// app.post('/api/people', function(req, res){

// })

// creates and applicant
app.post('/applicant', function(req, res){
	console.log(req.body)
	var x = new Drone(req.body)
	x.save(function (err){
		if (err) console.log("NO!")
	})
	// Here is where you need to get the data
	// from the post body and store it in the database
	res.sendFile('html/success.html', {root : './public'});
});

app.get('/success', function(req, res){
	res.sendFile('html/success.html', {root : './public'});
});


// Creating Server and Listening for Connections \\
var port = 3000
app.listen(port, function(){
  console.log('Server running on port ' + port);

})
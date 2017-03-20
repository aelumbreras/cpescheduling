var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var scheduleSchema = new Schema({
	roomtag : String ,
	schedule : String ,
	day: String,
	start : String ,
	end : String ,
	occupant : String ,
	professor : String
}, {collection: 'schedules'});

var schedules = mongoose.model('schedules', scheduleSchema);
// Get Homepage
router.get('/', ensureAuthenticated, function(req, res, next){
	schedules.find()
	.then(function(doc) {
		res.render('index', {scheduleData: doc, scheduleString: JSON.stringify(doc)});
	});
});

router.get('/viewer', function(req, res, next){
	schedules.find()
	.then(function(doc) {
		res.render('viewer', {scheduleData: doc, scheduleString: JSON.stringify(doc)});
	});
});

router.post('/insert', function(req, res, next){
	var item = {
		roomtag : req.body.roomtag ,
		schedule : req.body.day + " " + req.body.start + " - " +   req.body.end ,
		day:  req.body.day ,
		start :  req.body.start ,
		end :  req.body.end ,
		occupant :  req.body.year + "-" +  req.body.section ,
		professor :  req.body.professor
	};

	var data = new schedules(item);
	data.save();
	res.redirect('/');
});

router.post('/update', function(req, res, next) {
	var id = req.body.id;
	schedules.findById(id, function(err, doc) {
		if (err) {
			console.error('error, no entry found');
		}
		doc.roomtag = req.body.roomtag;
		doc.schedule = req.body.day + " " + req.body.start + " - " +   req.body.end;
		doc.day = req.body.day;
		doc.start = req.body.start;
		doc.end = req.body.end;
		doc.occupant = req.body.year + "-" +  req.body.section;
		doc.professor = req.body.professor;
		doc.save();
	})
	res.redirect('/');
});

router.post('/delete', function(req, res, next) {
  var id = req.body.id;
  schedules.findByIdAndRemove(id).exec();
  res.redirect('/');
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		res.redirect('/users/login');
	}
}

function test(req, res, next){

}

module.exports = router;

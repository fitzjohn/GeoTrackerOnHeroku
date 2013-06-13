var GeoTrackerOnHeroku = require('../model/GeoTrackerOnHeroku.js');

exports.post = function(req, res) {
    var gtoh = new GeoTrackerOnHeroku({name: req.body.name, description: req.body.descr,
        longitude: req.body.longitude, latitude: req.body.latitude});
    gtoh.save(function (err) {
        if (err) throw err;
        console.log('Location saved.');
        
        res.send('GeoTrackerOnHeroku saved.');
    });
}

exports.save = function(req, res) {
    var gtoh = new GeoTrackerOnHeroku({name: req.params.name, description: req.params.descr,
        longitude: req.params.longitude, latitude: req.params.latitude});
    gtoh.save(function (err) {
        if (err) throw err;
        console.log('GeoTrackerOnHeroku saved.');
	
        res.send('GeoTrackerOnHeroku saved.');
    });
}

exports.list = function(req, res) {
    GeoTrackerOnHeroku.find(function(err, gtoh) {
	res.setHeader('Content-Type', 'text/javascript;charset=UTF-8');
        res.send(req.query["callback"] + '({"records":' +  JSON.stringify(gtoh) + '});');
    });
}

exports.show = (function(req, res) {
    GeoTrackerOnHeroku.findOne({name: req.params.name}, function(error, gtoh) {
        res.send([{provider: gtoh}]);
    })
});

exports.near = function(req, res) {
    GeoTrackerOnHeroku.find({coords : { $near : [req.params.lon, req.params.lat], $maxDistance : req.params.dist/68.91}}, function (error, gtoh) {        
        res.setHeader('Content-Type', 'text/javascript;charset=UTF-8');
        res.send(req.query["callback"] +'({"records":' + JSON.stringify(gtoh) + '});');
    })
}
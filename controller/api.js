var GeoTrackerOnHeroku = require('../model/GeoTrackerOnHeroku.js');

exports.post = function(req, res) {
    var GeoTrackerOnHeroku = new GeoTrackerOnHeroku({name: req.body.name, description: req.body.descr,
        longitude: req.body.longitude, latitude: req.body.latitude});
    GeoTrackerOnHeroku.save(function (err) {
        if (err) throw err;
        console.log('Task saved.');
        
        res.send('GeoTrackerOnHeroku saved.');
    });
}

exports.save = function(req, res) {
    var GeoTrackerOnHeroku = new GeoTrackerOnHeroku({name: req.params.name, description: req.params.descr,
        longitude: req.params.longitude, latitude: req.params.latitude});
    GeoTrackerOnHeroku.save(function (err) {
        if (err) throw err;
        console.log('GeoTrackerOnHeroku saved.');
	
        res.send('GeoTrackerOnHeroku saved.');
    });
}

exports.list = function(req, res) {
    GeoTrackerOnHeroku.find(function(err, GeoTrackerOnHeroku) {
	res.setHeader('Content-Type', 'text/javascript;charset=UTF-8');
        res.send(req.query["callback"] + '({"records":' +  JSON.stringify(GeoTrackerOnHeroku) + '});');
    });
}

exports.show = (function(req, res) {
    GeoTrackerOnHeroku.findOne({name: req.params.name}, function(error, GeoTrackerOnHeroku) {
        res.send([{provider: GeoTrackerOnHeroku}]);
    })
});

exports.near = function(req, res) {
    GeoTrackerOnHeroku.find({coords : { $near : [req.params.lon, req.params.lat], $maxDistance : req.params.dist/68.91}}, function (error, GeoTrackerOnHeroku) {        
        res.setHeader('Content-Type', 'text/javascript;charset=UTF-8');
        res.send(req.query["callback"] +'({"records":' + JSON.stringify(GeoTrackerOnHeroku) + '});');
    })
}
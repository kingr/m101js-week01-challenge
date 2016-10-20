const express = require('express'),
    app = express(),
    engines = require('consolidate'),
    MongoClient = require('mongodb').MongoClient,
    assert = require('assert'),
    bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

const dbPath = 'mongodb://localhost:27017/video';

MongoClient.connect(dbPath, function(err, db){
    assert.equal(null, err);

    app.post('/addMovie', function(req, res, next){
        console.log(req.body);
        res.send('done');
    });

    db.collection('movies').find({}).toArray(function(err, docs){
       console.log(docs);
    });

    var server = app.listen(3000, function(){
        var port = server.address().port;
        console.log('express running on port %s.', port);
    });

});

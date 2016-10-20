const express = require('express'),
    app = express(),
    engines = require('consolidate'),
    MongoClient = require('mongodb').MongoClient,
    assert = require('assert'),
    bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

// configure HTML engine
app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

const dbPath = 'mongodb://localhost:27017/video';

MongoClient.connect(dbPath, function(err, db){
    assert.equal(null, err);

    app.get('/', function(req, res, next){
       res.render('home');
    });

    app.get('/movies', function(req, res, next){
        db.collection('movies').find({}).toArray(function(err, doc){
            console.log(doc);
            res.render('movies', {'movies': doc});
        });
    });
    app.post('/addMovie', function(req, res, next){
        const title = req.body.title;
        const year = req.body.year;
        const imdb = req.body.imdb;
        db.collection('movies').insertOne({"title": title, "year": year, "imdb":imdb});
        res.redirect('/movies');
    });
    var server = app.listen(3000, function(){
        var port = server.address().port;
        console.log('express running on port %s.', port);
    });

});

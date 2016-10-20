const express = require('express'),
    app = express(),
    engines = require('consolidate'),
    MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

const dbPath = 'mongodb://localhost:27017/video';

MongoClient.connect(dbPath, function(err, db){
    assert.equal(null, err);

    console.log('connected to mongo!');

   db.close();
});

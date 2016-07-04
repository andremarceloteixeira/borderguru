var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {
    var db = req.db;
    var collection = db.get('order');
    collection.find({},{},function(e,docs){
        res.render('index', {
            "order" : docs,
        });
    });
});

router.get('/company', function(req, res) {
    var db = req.db;
    var collection = db.get('order'); //possible user searh param
    //pass param if neccessary
    collection.find({companyName : req.param('search')},function(e,docs){
        res.render('filter_company', {
            "searchByFilterCompany" : docs,
        });
    });

});

router.get('/address', function(req, res) {
    var db = req.db;
    var collection = db.get('order'); //possible user searh param
    //pass param if neccessary

    collection.find({companyName : req.param('search')},function(e,docs){
        res.render('filter_address', {
            "searchByFilterAddress" : docs,
        });
    });
});

router.get('/delete', function(req, res) {
    var db = req.db;
    var collection = db.get('order'); //possible user searh param
    //pass param if neccessary
    collection.distinctAndCount(['orderItem'], {orderItem: /^a/i})

    collection.find({},{}, function(e, docs){
        res.render('index', {
            "order" : docs,
        });
    });
});

router.get('/delete', function(req, res) {
    var db = req.db;
    var collection = db.get('order'); //possible user searh param
    //pass param if neccessary
    collection.remove({orderId : req.param('id')});

    collection.find({},{}, function(e, docs){
        res.render('index', {
            "order" : docs,
        });
    });
});

router.get('/groups', function(req, res) {
    var db = req.db;
    var collection = db.get('order'); //possible user searh param
    //pass param if neccessary
    collection.aggregate({$group: {_id : "$orderItem", count:  { $sum : 1} }},
     function(e, docs){
        res.render('group', {
            "order" : docs,
        });
    });
});

module.exports = router;

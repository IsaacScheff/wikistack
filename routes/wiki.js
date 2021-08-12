const express = require('express');
const { addPage } = require('../views');
const router = express.Router();

router.get('/', function(req, res, next) {
    res.send("wiki");
});

router.post('/', function(req, res, next){
    res.send("post here");
});

router.get('/add', function(req, res, next){
    res.send(addPage());
});

module.exports = router;




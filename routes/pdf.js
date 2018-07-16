var express = require('express');
var router = express.Router();
var createPDF = require('./createPDF.js');

var user = {};
/* GET users listing. */
router.post('/', function(req, res, next) {
    var user = req.body;
    console.log(user);
    var d = new Date();
    var fileName = user.gonhao + d.getTime().toString();

    createPDF(user,fileName).then(data=>{
        console.log(fileName);
        res.setHeader('Access-Control-Allow-Origin','*');
        res.setHeader('Access-Control-Allow-Methods','GET,POST,OPTIONS,DELETE,PUT');

        res.json(fileName);
    })

});

router.get('/', function(req, res, next) {
    console.log(__dirname);
        var file = __dirname + '../pdfs/'+ req.query.fileName +'.pdf';
    res.setHeader('Content-Type', 'application/pdf');

    res.download(file);
});
module.exports = router;
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
        res.json(fileName);
    })

});

router.get('/', function(req, res, next) {
        var file = 'pdfs/'+ req.query.fileName +'.pdf';
        res.download(file);
});
module.exports = router;
var express = require('express');
var router = express.Router();
console.log("inside  notify application");
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(bodyParser.raw());
/* GET home page. */
console.log("inside  notify application 2");
router.post('/', function(req, res, next) {
    
    //res.send(req.body);

    var fs = require('fs');
    var data = JSON.stringify(req.body);
    console.log('Got body:', data);
    fs.writeFile("payload.json", data, (err) => {
        if (err) console.log(err);
        console.log("Successfully written to file.");
    })
    res.sendStatus(200)
  //res.render('index', { title: 'Express' });
});
router.get('/', function(req, res, next) {
    
   console.log("get method");
});

module.exports = router;
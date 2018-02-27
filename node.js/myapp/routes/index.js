var express = require('express');
var router = express.Router();

/* GET home page. */
var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'demo'
});
connection.connect();
router.get('/', function(req, res, next) {
    connection.query('select * from classes', function (error, results, fields) {
        if (error) {
          res.end();
        }else{
            res.render('index', { results:results });
        }
    });
});
router.get("/list/:id",function (req,res) {
  var id = req.params.id;
  console.log(id);
  connection.query('select * from classes where id='+id,function(error,result){
          if(error){
            res.end()
          }else{
            res.render("list",{data:result});
          }
  })
})
module.exports = router;

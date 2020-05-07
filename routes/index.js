var express = require('express');
var router = express.Router();
var conn=require('../config/db.js');
var sqlFormatter=require('sql-formatter');

router.get('/', (req, res)=> {
		res.render('index', { heading: "Check Query" });

});


router.post('/runSql',async function(req, res){
	try{
    let result=await checkQuery(req.body["sql_query"]);
    res.render('index', { heading: "Query is correct and below is formatted query : " ,  title: sqlFormatter.format(req.body["sql_query"]).toString() });
    console.log(sqlFormatter.format(req.body["sql_query"]));
	}
	catch(err){
    res.render('index', { heading: "Check Query",  title: "Syntax is incorrect" });
	}

});
async function checkQuery(qry) {
	return new Promise((resolve, reject) => {
		conn.query(qry, function (error, results, fields) {
			if(error && error["errno"]==1064){
				console.log(error);
				reject(error);

			}
			resolve();

});

		})
}



module.exports = router;



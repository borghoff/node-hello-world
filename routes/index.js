import express from 'express';

var router = express.Router();

router.get('/', function(req, res, next) {

	console.log('GET / index.js');
	
	let content = {layout: 'index', title: 'Home', sections: {}, user :{}, content :{}, iam: 'index', error: ''};
	
	res.render('index', content);	

});

export default router;



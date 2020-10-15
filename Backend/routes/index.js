var express = require('express');
var router = express.Router();

const { Sequelize, Model, DataTypes, Op } = require('sequelize');
const sequelize = new Sequelize('AsiaStarUrgent', 'db', '2rjurrru', {
    host: 'localhost', dialect: 'mysql',
    define: { charset: 'utf8', dialectOptions: { collate: 'utf8_general_ci' }, timestamps: false },
    pool: 1
});
const db_model = require('./db_model.js');
const db = db_model(Sequelize, Model, DataTypes, sequelize);

router.post('/submit_problem', function(req, res) {
	db.question.create(req.body);
	res.send("OK");
});

router.post('/query_car', async function(req, res) {	
	const ans = await db.car.findAll({ where: req.body })
	res.send(ans.toJSON());
});

router.post('/answer_problem', function(req, res, next) {
	db.question.update(
		  req.body.content,
		  { where: { id: req.body.id } }
	)
	res.send("OK");
});

router.post('/solve_problem', function(req, res, next) {
	var content = req.body.content;
	if(!content.solve) content.solve_tag = null;
	db.question.update(
		content,
		{ where: { id: req.body.id } }
	)
	res.send("OK");
});

router.post('/submit_car_excel', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/submit_cargo_excel', function(req, res, next) {
  res.render('index', { title: 'Express' });
});






module.exports = router;

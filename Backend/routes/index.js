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

router.post('/submit_problem', async function(req, res) {
	await db.question.create(req.body);
	res.send("OK");
});

router.post('/query_car', async function(req, res) {	
	const ans = await db.car.findAll({ where: req.body })
	res.send(ans);
});

router.post('/answer_problem', async function(req, res) {
	var param = JSON.parse(req.body.content)
	await db.question.update(
		  param.content,
		  { where: { id: param.id } }
	)
	res.send("OK");
});

router.post('/solve_problem', async function(req, res) {
	var param = JSON.parse(req.body.content);
	if(!param.content.solve) param.content.solve_tag = null;
	console.log(param)
	await db.question.update(
		param.content,
		{ where: { id: param.id } }
	)
	res.send("OK");
});

router.post('/get_questions', async function(req, res) {
	const ans = await db.question.findAll({
		order: [
			['id', 'DESC']
		]
	});
	res.send(ans);
});

router.post('/submit_car_excel', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/submit_cargo_excel', function(req, res, next) {
  res.render('index', { title: 'Express' });
});






module.exports = router;

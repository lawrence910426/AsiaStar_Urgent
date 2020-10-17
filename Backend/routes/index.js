var express = require('express');
var router = express.Router();
const readXlsxFile = require('read-excel-file/node');

const { Sequelize, Model, DataTypes, Op } = require('sequelize');
const sequelize = new Sequelize('AsiaStarUrgent', 'db', '2rjurrru', {
    host: 'localhost', dialect: 'mysql',
    define: { charset: 'utf8', dialectOptions: { collate: 'utf8_general_ci' }, timestamps: false },
    pool: 1
});
const db_model = require('./db_model.js');
const db = db_model(Sequelize, Model, DataTypes, sequelize);
const multer = require('multer');
const { exec } = require('child_process');

var storage = multer.diskStorage({
	destination: function (req, file, callback) {
		callback(null, './uploads');
	},
	filename: function (req, file, callback) {
		callback(null, Date.now() + '-' + Math.round(Math.random() * 1E9));
	}
});

var upload = multer({ storage: storage })


router.post('/submit_problem', async function(req, res) {
	exec(`
curl -v -X POST https://api.line.me/v2/bot/message/broadcast \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer r3jOOBxuDLqlMPpzpWj9xiYsqPldScqLKKbf2UixzA7+oO0ejCEnKYFMYtA+jNj9sPTpthuwNVWMJlQpU++mQjAKqL6c4eCvJc/XmGE+N6vwIg768kAhhK+cTS7Gvc41AV9LbVMp7YXEHVKP7YaA+AdB04t89/1O/w1cDnyilFU=' \
-d '{
	"messages":[
		{
			"type":"text",
			"text":"客戶提出問題了，詳細請見網站 http://104.199.190.200"
		}
	]
}'
	`);
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
		],
		where: req.body
	});
	res.send(ans);
});

router.post('/submit_car_excel', upload.single("car_table"), function(req, res) {
	readXlsxFile(req.file.path).then((rows) => {
		for(var i = 1;i < rows.length;i++) {
			var line = rows[i];
			var param = {
				"car_id": line[0],
				"name": line[1],
				"recipt_id": line[5],
				"product_id": line[9],
				"product_name": line[10]
			}
			db.car.create(param).then()
		}
	})
	res.send("OK");
});

router.post('/submit_cargo_excel', function(req, res, next) {
  res.render('index', { title: 'Express' });
});






module.exports = router;

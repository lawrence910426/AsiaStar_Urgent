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

router.post('/submit_problem', function(req, res, next) {
      
});

router.post('/query_cargo_id', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/query_item_id', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/answer_problem', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/solve_problem', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/submit_car_excel', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/submit_cargo_excel', function(req, res, next) {
  res.render('index', { title: 'Express' });
});






module.exports = router;

var express = require('express');
var router = express.Router();

let ctrl = require('../controllers/controller');

router.get('/scores', ctrl.getScores);

router.post('/addscores', ctrl.addNewScore);

router.get('/playerscores', ctrl.getCurrentPlayerScore);

router.post('/updatescores', ctrl.updateScore);

router.post('/register', ctrl.addNewUser);

router.post('/login', ctrl.loginUser);

module.exports = router
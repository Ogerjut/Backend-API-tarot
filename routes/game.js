const express = require('express');
const router = express.Router();

const gameCtrl = require('../controllers/game');

router.post('/createTable',  gameCtrl.createTable);
router.get('/getTables', gameCtrl.getTables)

router.delete('/deleteTable/:id', gameCtrl.deleteTable)


module.exports = router;
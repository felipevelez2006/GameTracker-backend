const express = require('express');
const router = express.Router();
const juegosCtrl = require('../controllers/juegosController');

router.get('/', juegosCtrl.getAllGames);
router.get('/:id', juegosCtrl.getGameById);
router.post('/', juegosCtrl.createGame);
router.put('/:id', juegosCtrl.updateGame);
router.delete('/:id', juegosCtrl.deleteGame);
router.post('/:id/playlog', juegosCtrl.addPlayLog);

module.exports = router;

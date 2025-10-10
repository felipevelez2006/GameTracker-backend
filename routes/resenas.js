const express = require('express');
const router = express.Router();
const resenasCtrl = require('../controllers/resenasController');

router.get('/', resenasCtrl.getAllReviews);
router.get('/juego/:juegoId', resenasCtrl.getReviewsByGame);
router.post('/', resenasCtrl.createReview);
router.put('/:id', resenasCtrl.updateReview);
router.delete('/:id', resenasCtrl.deleteReview);

module.exports = router;

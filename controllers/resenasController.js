const Review = require('../models/Review');
const Game = require('../models/Game');

// GET /api/reseñas
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate('game', 'title coverUrl');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/reseñas/juego/:juegoId
exports.getReviewsByGame = async (req, res) => {
  try {
    const reviews = await Review.find({ game: req.params.juegoId }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/reseñas
exports.createReview = async (req, res) => {
  try {
    const { game, author, rating, content } = req.body;
    const exists = await Game.findById(game);
    if (!exists) return res.status(404).json({ error: 'Juego no encontrado' });

    const review = new Review({ game, author, rating, content });
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUT /api/reseñas/:id
exports.updateReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!review) return res.status(404).json({ error: 'Reseña no encontrada' });
    res.json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE /api/reseñas/:id
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ error: 'Reseña no encontrada' });
    res.json({ message: 'Reseña eliminada correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

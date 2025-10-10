const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true },
  author: { type: String, default: 'Anónimo' },
  rating: { type: Number, min: 0, max: 10 },
  content: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date
});

reviewSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Review', reviewSchema);

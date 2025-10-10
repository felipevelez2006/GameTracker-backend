const mongoose = require('mongoose');

const playLogSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  hours: { type: Number, required: true }
});

const gameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  developer: { type: String },
  genres: [String],
  platforms: [String],
  coverUrl: String,
  releaseDate: Date,
  completed: { type: Boolean, default: false },
  hoursPlayed: { type: Number, default: 0 },
  playLogs: [playLogSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date
});

// Actualiza fecha cuando se guarda
gameSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Game', gameSchema);

const Game = require('../models/Game');

// GET /api/juegos
exports.getAllGames = async (req, res) => {
  try {
    const { genre, platform, completed, search, sortBy } = req.query;
    const filter = {};

    if (genre) filter.genres = genre;
    if (platform) filter.platforms = platform;
    if (completed !== undefined) filter.completed = completed === 'true';
    if (search) filter.title = new RegExp(search, 'i');

    let query = Game.find(filter);

    if (sortBy === 'hours') query = query.sort({ hoursPlayed: -1 });
    else query = query.sort({ createdAt: -1 });

    const games = await query.exec();
    res.json(games);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/juegos/:id
exports.getGameById = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) return res.status(404).json({ error: 'Juego no encontrado' });
    res.json(game);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/juegos
exports.createGame = async (req, res) => {
  try {
    const game = new Game(req.body);
    await game.save();
    res.status(201).json(game);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUT /api/juegos/:id
exports.updateGame = async (req, res) => {
  try {
    const game = await Game.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!game) return res.status(404).json({ error: 'Juego no encontrado' });
    res.json(game);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE /api/juegos/:id
exports.deleteGame = async (req, res) => {
  try {
    const game = await Game.findByIdAndDelete(req.params.id);
    if (!game) return res.status(404).json({ error: 'Juego no encontrado' });
    res.json({ message: 'Juego eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/juegos/:id/playlog
exports.addPlayLog = async (req, res) => {
  try {
    const { hours, date } = req.body;
    const game = await Game.findById(req.params.id);
    if (!game) return res.status(404).json({ error: 'Juego no encontrado' });

    game.playLogs.push({ hours, date: date || Date.now() });
    game.hoursPlayed += hours;
    await game.save();

    res.json(game);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

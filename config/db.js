const mongoose = require('mongoose');

const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log('✅ MongoDB conectado correctamente');
  } catch (error) {
    console.error('❌ Error al conectar MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;

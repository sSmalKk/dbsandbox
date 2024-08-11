/**
 *startworld.js
 */

// middleware/startworld.js
const Universe = require('../model/Universe');

module.exports = async (req, res, next) => {
  try {
    const Universe = await Universe.findOne({ running: false });

    if (!Universe) {
      return res.status(400).json({
        success: false,
        message: 'O mundo já está rodando ou não pode ser iniciado.' 
      });
    }

    Universe.running = true;
    await Universe.save();

    req.Universe = Universe; // Salvar a instância do mundo no request para uso futuro
    next();
  } catch (error) {
    console.error('Erro ao iniciar o mundo:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro ao iniciar o mundo.',
      error: error.message 
    });
  }
};

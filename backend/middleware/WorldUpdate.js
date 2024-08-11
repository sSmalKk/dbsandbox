/**
 *WorldUpdate.js
 */

// middleware/worldupdate.js
module.exports = async (req, res, next) => {
  try {
    // Verificar se o universo está rodando
    const universe = await UniverseModel.findOne({ running: true });
    if (!universe) {
      return res.status(400).json({
        success: false,
        message: 'O universo não está rodando.' 
      });
    }

    const updatedensity = universe.updatedensity;

    // Puxar todos os ticks do banco de dados
    let ticks = await TickModel.find({ isDeleted: false });

    // Priorizar os ticks main
    const mainTicks = ticks.filter(tick => tick.main);
    const nonMainTicks = ticks.filter(tick => !tick.main);

    // Sistema de atualização de ticks com base na densidade do universo
    let tickQueue = [...mainTicks, ...nonMainTicks];
    let processedTicks = [];

    const processTickBatch = async () => {
      const tickBatch = tickQueue.splice(0, updatedensity);

      for (let tick of tickBatch) {
        const currentTime = Date.now();
        const elapsedTime = currentTime - tick.initialdate;

        // Verificar se o tick deve ser atualizado
        if (elapsedTime >= 1000 / tick.tickrate) {
          tick.number += 1;
          tick.initialdate = currentTime;

          // Atualizar o tick no banco de dados
          await tick.save();
          processedTicks.push(tick._id);
        }
      }

      if (tickQueue.length > 0) {
        setTimeout(processTickBatch, 1000 / tick.tickrate);
      } else {
        // Recarregar a fila de ticks e continuar o processo
        tickQueue = [...mainTicks, ...nonMainTicks];
        processedTicks = [];
        setTimeout(processTickBatch, 1000 / updatedensity);
      }
    };

    // Iniciar o processamento dos ticks
    processTickBatch();

    res.status(200).json({
      success: true,
      message: 'Sistema de atualização de ticks iniciado.'
    });

  } catch (error) {
    console.error('Erro ao atualizar os ticks:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao atualizar os ticks.',
      error: error.message
    });
  }

  return next();
};

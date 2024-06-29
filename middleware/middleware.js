/**
 *middleware.js
 */

module.exports = async (req, res, next) => {
  // start writing your code from here do not remove above code

  try {
    const updatedDoc = await this.model.findOne(this.getQuery()); // Recupera o documento atualizado

    // Verifica se tickUpdate é verdadeiro e se tickRate está presente
    if (updatedDoc.tickUpdate === true && updatedDoc.tickRate) {
      // Calcula o novo valor de tick com base em tickRate
      const newTick = updatedDoc.tick + updatedDoc.tickRate;

      // Atualiza o valor de tick no documento
      updatedDoc.tick = newTick;
      console.log('Tick atualizado para:', newTick);

      // Verifica se há timeout (supondo que você tenha uma lógica para verificar isso)
      const timeoutOccurred = checkTimeout(); // Substitua checkTimeout() pela sua lógica de verificação de timeout

      // Se houver timeout, atualize tickUpdate para false
      if (timeoutOccurred) {
        updatedDoc.tickUpdate = false;
        console.log('Timeout ocorrido. tickUpdate definido como false.');
      }
    }

    // Chama o próximo middleware
    next();
  } catch (error) {
    // Trate qualquer erro ocorrido durante o processo
    console.error('Erro durante a manipulação do documento:', error);
    // Lógica para tratar o erro, se necessário
    next(error);
  }

  return next();
};

/**
 *Coord.js
 */

module.exports = async (req, res, next) => {
  try {
    // Itera sobre os itens no array `map` e cria o valor `p`
    if (req.body.map && Array.isArray(req.body.map)) {
      req.body.map = req.body.map.map(item => {
        // Verifica se os campos x, y, e z existem e são números
        if (typeof item.x === 'number' && typeof item.y === 'number' && typeof item.z === 'number') {
          // Concatena os valores x, y, z em uma string única para `p`
          item.p = `${item.x}_${item.y}_${item.z}`;
        } else {
          // Lança um erro caso os valores x, y, z estejam faltando ou sejam inválidos
          throw new Error('x, y, z devem ser números');
        }
        return item;
      });
    }
    
    return next();
  } catch (error) {
    // Retorna um erro caso ocorra algum problema durante a execução do middleware
    return res.status(400).json({ error: error.message });
  }
};

/**
 *Voxel.js
 */

module.exports = async (req, res, next) => {
  try {
    // Dados necessários para criar o voxel
    const {
      x, y, z, sizeId, biomeId, data 
    } = req.body;

    // Função auxiliar para calcular a coordenada global
    const calculateGlobalCoord = (x, y, z) => `${x}_${y}_${z}`;

    // Lista dos tamanhos em ordem decrescente de importância (menor para maior)
    const sizes = await SizeModel.find().sort({ importancia: 1 });

    // Encontrar o tamanho inicial
    const currentSize = await SizeModel.findById(sizeId);
    let currentIndex = sizes.findIndex(size => size._id.toString() === currentSize._id.toString());

    // Armazenar o voxel pai
    let parentVoxel = null;
    let globalCoord = calculateGlobalCoord(x, y, z);

    // Criar voxels pais se necessário
    while (currentIndex >= 0) {
      const size = sizes[currentIndex];

      // Verificar se o voxel já existe
      let existingVoxel = await VoxelModel.findOne({
        globalcoord: globalCoord,
        size: size._id 
      });

      if (!existingVoxel) {
        // Criar o novo voxel
        const newVoxel = new VoxelModel({
          xyz: [{
            x,
            y,
            z 
          }],
          globalcoord: globalCoord,
          storage: [],
          data: [],
          parent: parentVoxel ? parentVoxel._id : null,
          size: size._id,
          biome: currentIndex === sizes.length - 1 ? biomeId : null, // Apenas o último (menor) terá um bioma associado
          father: parentVoxel ? parentVoxel.globalcoord : null
        });

        existingVoxel = await newVoxel.save();
        tasks.push(`Voxel de tamanho ${size.name} criado em ${globalCoord}.`);
      }

      // Atualizar o voxel pai e a coordenada global
      parentVoxel = existingVoxel;
      globalCoord = calculateGlobalCoord(Math.floor(x / 10), Math.floor(y / 10), Math.floor(z / 10));

      currentIndex--;
    }

    // Finalmente, crie o voxel no tamanho especificado
    const finalVoxel = new VoxelModel({
      xyz: [{
        x,
        y,
        z 
      }],
      globalcoord: globalCoord,
      storage: [],
      data: data || [],
      parent: parentVoxel ? parentVoxel._id : null,
      size: currentSize._id,
      biome: biomeId,
      father: parentVoxel ? parentVoxel.globalcoord : null
    });

    await finalVoxel.save();
    tasks.push(`Voxel final criado em ${globalCoord} com tamanho ${currentSize.name}.`);

    // Criação do tick para o voxel com base na importância do tamanho
    let tick = null;
    if (currentSize.importancia === 1) {
      // Tick igual ao main
      tick = new TickModel({
        number: 0,  // Pode ser definido conforme o tick principal
        initialdate: Date.now(),
        voxel: finalVoxel._id,
        main: true,
        tickrate: 20,  // Densidade temporal padrão para o nível da Terra
        cycle: 2000
      });
    } else if (currentSize.importancia === 2) {
      // Tick normal
      tick = new TickModel({
        number: 0,
        initialdate: Date.now(),
        voxel: finalVoxel._id,
        main: false,
        tickrate: 20,  // Densidade temporal padrão
        cycle: 2000
      });
    }

    if (tick) {
      await tick.save();
      tasks.push(`Tick criado para o voxel com base no tamanho ${currentSize.name}.`);
    }

    // Retornar o sucesso da criação do voxel e do tick
    res.status(200).json({
      success: true,
      message: 'Voxels e ticks criados com sucesso.',
      voxel: finalVoxel,
      tasksCompleted: tasks
    });

  } catch (error) {
    console.error('Erro ao criar os voxels e ticks:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao criar os voxels e ticks.',
      error: error.message
    });
  }

  return next();
};

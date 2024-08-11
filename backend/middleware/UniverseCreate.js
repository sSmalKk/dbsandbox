/**
 *UniverseCreate.js
 */

module.exports = async (req, res, next) => {
  try {
    // Inicialização da lista de tarefas modulares
    const tasks = [];

    // 1. Criar os tamanhos observáveis até o tamanho do planeta
    const observableSizes = [
      {
        name: 'milimetro',
        importancia: 6,
        fakesize: 0.001,
        realsize: 0.001,
        savestructure: false 
      },
      {
        name: 'centimetro',
        importancia: 3,
        fakesize: 0.01,
        realsize: 0.01,
        savestructure: true 
      },
      {
        name: 'decimetro',
        importancia: 1,
        fakesize: 0.1,
        realsize: 0.1,
        savestructure: true 
      },
      {
        name: 'metro',
        importancia: 1,
        fakesize: 1,
        realsize: 1,
        savestructure: true 
      },
      {
        name: 'decametro',
        importancia: 1,
        fakesize: 10,
        realsize: 10,
        savestructure: true 
      },
      {
        name: 'hectometro',
        importancia: 2,
        fakesize: 100,
        realsize: 100,
        savestructure: true 
      },
      {
        name: 'quilometro',
        importancia: 3,
        fakesize: 1000,
        realsize: 1000,
        savestructure: true 
      },
      {
        name: 'planeta',
        importancia: 3,
        fakesize: 10000,
        realsize: 10000,
        savestructure: true 
      }
    ];

    const sizeIds = {};

    for (let size of observableSizes) {
      const newSize = new SizeModel(size);
      const savedSize = await newSize.save();
      sizeIds[size.name] = savedSize._id;
      tasks.push(`Tamanho ${size.name} criado com sucesso.`);
    }

    // 2. Criar tamanhos maiores com importancia maior que 3 (não salvam estrutura)
    const largerSizes = [
      {
        name: 'planetary',
        importancia: 4,
        fakesize: 100000,
        realsize: 100000,
        savestructure: false 
      },
      {
        name: 'solar',
        importancia: 4,
        fakesize: 1000000,
        realsize: 1000000,
        savestructure: false 
      },
      {
        name: 'solarorbital',
        importancia: 4,
        fakesize: 10000000,
        realsize: 10000000,
        savestructure: false 
      },
      {
        name: 'galaxy',
        importancia: 5,
        fakesize: 100000000,
        realsize: 100000000,
        savestructure: false 
      },
      {
        name: 'cluster',
        importancia: 5,
        fakesize: 1000000000,
        realsize: 1000000000,
        savestructure: false 
      },
      {
        name: 'universe',
        importancia: 5,
        fakesize: 10000000000,
        realsize: 10000000000,
        savestructure: false 
      }
    ];

    let universeSize = null;

    for (let size of largerSizes) {
      const newSize = new SizeModel(size);
      const savedSize = await newSize.save();
      sizeIds[size.name] = savedSize._id;
      tasks.push(`Tamanho ${size.name} criado com sucesso.`);

      if (size.name === 'universe') {
        universeSize = savedSize._id;
      }
    }

    // 3. Criar o primeiro voxel observável e vinculá-lo ao tamanho do universo
    const firstVoxel = {
      xyz: [{
        x: '0',
        y: '0',
        z: '0' 
      }],
      globalcoord: '0_0_0',
      storage: [],
      data: [{
        name: 'mediumheat',
        value: 2.725,
        description: 'calor médio do universo observável' 
      }],
      size: universeSize,  // Vincula ao tamanho do universo
      parent: null  // Como é o primeiro, não terá um pai
    };

    const createdVoxel = new VoxelModel(firstVoxel);
    await createdVoxel.save();
    tasks.push(`Primeiro voxel criado com a coordenada global ${firstVoxel.globalcoord} e vinculado ao tamanho do universo.`);

    // 4. Criar a lista inicial de biomas, incluindo a lista de tamanhos aceitos
    const biomes = [
      { 
        name: 'void', 
        description: 'Espaço vazio', 
        data: [], 
        sizes: [sizeIds['universe']]  // Tamanho aceito para void
      },
      { 
        name: 'planetary', 
        description: 'Bioma planetário', 
        data: [], 
        sizes: [sizeIds['planeta'], sizeIds['solar'], sizeIds['solarorbital']] 
      },
      { 
        name: 'solar', 
        description: 'Bioma solar', 
        data: [], 
        sizes: [sizeIds['solar'], sizeIds['solarorbital'], sizeIds['galaxy']] 
      },
      { 
        name: 'solarorbital', 
        description: 'Bioma orbital solar', 
        data: [], 
        sizes: [sizeIds['solarorbital'], sizeIds['galaxy'], sizeIds['cluster']] 
      },
      { 
        name: 'galaxy', 
        description: 'Bioma galáctico', 
        data: [], 
        sizes: [sizeIds['galaxy'], sizeIds['cluster'], sizeIds['universe']] 
      },
      { 
        name: 'cluster', 
        description: 'Bioma de aglomerado estelar', 
        data: [], 
        sizes: [sizeIds['cluster'], sizeIds['universe']] 
      },
      { 
        name: 'universe', 
        description: 'Bioma universal', 
        data: [], 
        sizes: [sizeIds['universe']] 
      },
      { 
        name: 'plains', 
        description: 'Planícies', 
        data: [{
          name: 'height',
          value: 70,
          description: 'Altura média do terreno' 
        }], 
        sizes: [sizeIds['planeta']]  // Tamanho aceito para plains
      }
    ];

    for (let biome of biomes) {
      const newBiome = new BiomeModel(biome);
      await newBiome.save();
      tasks.push(`Bioma ${biome.name} criado com sucesso.`);
    }

    // Retornar a lista de tarefas concluídas
    res.status(200).json({
      success: true,
      message: 'Middleware de criação de universo concluído com sucesso.',
      tasksCompleted: tasks
    });

  } catch (error) {
    console.error('Erro ao executar o middleware de criação de universo:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao executar o middleware de criação de universo.' 
    });
  }

  return next();
};

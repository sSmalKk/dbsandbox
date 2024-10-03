import { postModelData } from "./ExtendedDatabaseActions";

// Lista de constantes com exemplos de dados para os modelos
const baseModelosFileExample = {
  name: "File Model",
  description: "File model description",
  type: 1,
};

const baseModelosModelExample = {
  name: "Model Name",
  type: 2,
  modelmap: {},
  file: "exampleFileId", // Linkar com baseModelosFileExample._id
};

const modelChemistrySubstancesExample = {
  name: "Substance Name",
  description: "Substance description",
  data: [],
  Rules: [], // Linkar com modelChemistryCompoundsExample._id
  Tags: [], // Linkar com modelosTagExample._id
};

const modelChemistryCompoundsExample = {
  name: "Compound Name",
  description: "Compound description",
  data: [],
  Rules: [], // Linkar com modelosRuleExample._id
  Tags: [], // Linkar com modelosTagExample._id
};

const modelChemistryElementExample = {
  name: "Element Name",
  description: "Element description",
  data: [],
  Rules: [], // Linkar com modelosRuleExample._id
  Tags: [], // Linkar com modelosTagExample._id
};

const chatGroupExample = {
  name: "Group Chat Name",
  code: "GRP001",
  admin: "adminId", // Linkar com userExample._id
  member: [], // Linkar com userExample._id
};

const chatMessageExample = {
  message: "This is a test message",
  sender: "senderId", // Linkar com userExample._id
  recipient: "recipientId", // Linkar com userExample._id
  groupId: "groupId", // Linkar com chatGroupExample._id
};

const modelosActionExample = {
  Name: "Action Name",
  Description: "Action Description",
  data: {},
  required: [], // Linkar com modelChemistryCompoundsExample._id
  chemsData: {},
};

const modelosAgeExample = {
  name: "Age Name",
  description: "Age Description",
  relativeto: "relativetoId", // Linkar com modelosStructureExample._id
  year: new Date(),
  Events: [],
};

const modelosBiomesExample = {
  name: "Biome Name",
  description: "Biome Description",
  generation: [],
  structures: [], // Linkar com modelosStructureExample._id
  size: 100,
};

const baseChunkExample = {
  x: 10,
  y: 10,
  z: 10,
  p: 0,
  settings: "settingsId", // Linkar com universeSettingsExample._id
  chunk: "chunkId", // Linkar com baseCubeExample._id
  chat: "chatId", // Linkar com chatGroupExample._id
  size: "sizeId", // Linkar com modelosSizeExample._id
  biome: "biomeId", // Linkar com modelosBiomesExample._id
  op: "opId", // Linkar com userExample._id
};

const baseCubeExample = {
  x: 1,
  y: 1,
  z: 1,
  p: 0,
  universe: "universeId", // Linkar com universeSettingsExample._id
  chunk: "chunkId", // Linkar com baseChunkExample._id
  interface: "interfaceId", // Linkar com universeInterfaceExample._id
  storage: "storageId", // Linkar com universeStorageExample._id
};

const modelosEntityExample = {
  Name: "Entity Name",
  Description: "Entity Description",
  model: "modelId", // Linkar com modelosItemExample._id
  Size: "sizeId", // Linkar com modelosSizeExample._id
  Location: "locationId", // Linkar com universeCubeExample._id
};

const modelosPartExample = {
  name: "Part Name",
  description: "Part Description",
  tag: "Tag1",
  texture: "textureId", // Linkar com baseModelosFileExample._id
  chunk: "chunkId", // Linkar com universeChunkExample._id
};

// cole aqui a lista de constantes

const testAllRoutes = async (devmode = true) => {
  try {
    // Base_Modelos_File
    const fileModel = await postModelData("admin", "Base_Modelos_File", baseModelosFileExample, devmode);
    const fileModelId = fileModel?._id;

    // Base_Modelos_Model
    baseModelosModelExample.file = fileModelId;
    const baseModel = await postModelData("admin", "Base_Modelos_Model", baseModelosModelExample, devmode);
    const baseModelId = baseModel?._id;

    // Model_chemistry_Substances
    const substanceModel = await postModelData("admin", "Model_chemistry_Substances", modelChemistrySubstancesExample, devmode);
    const substanceModelId = substanceModel?._id;

    // Model_chemistry_compounds
    const compoundModel = await postModelData("admin", "Model_chemistry_compounds", modelChemistryCompoundsExample, devmode);
    const compoundModelId = compoundModel?._id;

    // Model_chemistry_element
    const elementModel = await postModelData("admin", "Model_chemistry_element", modelChemistryElementExample, devmode);
    const elementModelId = elementModel?._id;

    // Chat_group
    const chatGroup = await postModelData("admin", "Chat_group", chatGroupExample, devmode);
    const chatGroupId = chatGroup?._id;

    // Chat_message
    chatMessageExample.groupId = chatGroupId;
    const chatMessage = await postModelData("admin", "Chat_message", chatMessageExample, devmode);
    const chatMessageId = chatMessage?._id;

    // Modelos_Action
    const actionModel = await postModelData("admin", "Modelos_Action", modelosActionExample, devmode);
    const actionModelId = actionModel?._id;

    // Modelos_Age
    const ageModel = await postModelData("admin", "Modelos_Age", modelosAgeExample, devmode);
    const ageModelId = ageModel?._id;

    // Modelos_Biomes
    const biomesModel = await postModelData("admin", "Modelos_Biomes", modelosBiomesExample, devmode);
    const biomesModelId = biomesModel?._id;

    // Base_Chunk
    const chunkModel = await postModelData("admin", "Base_Chunk", baseChunkExample, devmode);
    const chunkModelId = chunkModel?._id;

    // Base_Cube
    const cubeModel = await postModelData("admin", "Base_Cube", baseCubeExample, devmode);
    const cubeModelId = cubeModel?._id;

    // Modelos_Entity
    const entityModel = await postModelData("admin", "Modelos_Entity", modelosEntityExample, devmode);
    const entityModelId = entityModel?._id;

    // Modelos_Part
    const partModel = await postModelData("admin", "Modelos_Part", modelosPartExample, devmode);
    const partModelId = partModel?._id;

    console.log("Test completed successfully.");

  } catch (error) {
    console.error("Error in testAllRoutes:", error);
  }
};

export default testAllRoutes;

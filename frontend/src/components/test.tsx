// TestAllRoutes.tsx
import {
    handleModelAction,
  } from "./ExtendedDatabaseActions";
  
  // Lista de tipos de modelos e seus dados de exemplo para testar
  const modelsToTest = [
    { modelType: "Base_Modelos_File", data: { name: "File Model", description: "File model description", type: 1 } },
    { modelType: "Base_Modelos_Model", data: { name: "Base Model", type: 0 } },
    { modelType: "Model_chemistry_Substances", data: { name: "Substance", description: "Substance description", data: ["H2O"] } },
    { modelType: "Model_chemistry_compounds", data: { name: "Compound", description: "Compound description", data: ["C6H12O6"] } },
    { modelType: "Model_chemistry_element", data: { name: "Element", description: "Element description", data: ["Hydrogen"] } },
    { modelType: "Chat_group", data: { name: "Group Chat", code: "ABC123", admin: "Admin User" } },
    { modelType: "Chat_message", data: { message: "Hello!", sender: "User1", recipient: "User2" } },
    { modelType: "Modelos_Action", data: { Name: "Action Name", Description: "Action Description", required: ["some_requirement"] } },
    // Adicione mais modelos aqui
  ];
  
  const devmode = true;
  
  // Função para testar todas as rotas para um modelo específico
  const testRoutesForModel = async (mode, modelType, data) => {
    const log = {};
  
    try {
      // POST (create)
      log.createResult = await handleModelAction("create", mode, modelType, data, null, devmode);
      const createdId = log.createResult?._id;
      log.createdId = createdId;
      if (!createdId) throw new Error(`Failed to create ${modelType}`);
  
      // GET (fetch by ID)
      log.fetchResult = await handleModelAction("fetch", mode, modelType, {}, createdId, devmode);
  
      // PUT (update)
      const updatedData = { ...data, description: "Updated description" };
      log.updateResult = await handleModelAction("update", mode, modelType, updatedData, createdId, devmode);
  
      // Partial PUT (partial update)
      log.partialUpdateResult = await handleModelAction("partialUpdate", mode, modelType, { description: "Partially Updated" }, createdId, devmode);
  
      // DELETE (delete by ID)
      log.deleteResult = await handleModelAction("delete", mode, modelType, {}, createdId, devmode);
  
      // List (GET list of models)
      log.listResult = await handleModelAction("list", mode, modelType, {}, null, devmode);
  
      // Count (POST count)
      log.countResult = await handleModelAction("count", mode, modelType, {}, null, devmode);
  
    } catch (error) {
      log.error = `Error testing ${modelType}: ${error.message}`;
    }
  
    return log;
  };
  
  // Função principal para testar todos os modelos
  const testAllModels = async (mode) => {
    const allLogs = [];
  
    for (const model of modelsToTest) {
      const log = await testRoutesForModel(mode, model.modelType, model.data);
      allLogs.push({ modelType: model.modelType, log });
      console.log(`Log for ${model.modelType}`, log);
    }
  
    console.log("All logs:", allLogs);
    return allLogs;
  };
  
  // Exemplo de chamada da função de teste
  testAllModels("admin");
  
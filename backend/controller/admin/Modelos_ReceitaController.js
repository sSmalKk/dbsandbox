/**
 * Modelos_ReceitaController.js
 * @description : exports action methods for Modelos_Receita.
 */

const Modelos_Receita = require('../../model/Modelos_Receita');
const Modelos_ReceitaSchemaKey = require('../../utils/validation/Modelos_ReceitaValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../utils/common');
   
/**
 * @description : create document of Modelos_Receita in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Modelos_Receita. {status, message, data}
 */ 
const addModelos_Receita = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      Modelos_ReceitaSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate = new Modelos_Receita(dataToCreate);
    let createdModelos_Receita = await dbService.create(Modelos_Receita,dataToCreate);
    return res.success({ data : createdModelos_Receita });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Modelos_Receita in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Modelos_Receitas. {status, message, data}
 */
const bulkInsertModelos_Receita = async (req,res)=>{
  try {
    if (req.body && (!Array.isArray(req.body.data) || req.body.data.length < 1)) {
      return res.badRequest();
    }
    let dataToCreate = [ ...req.body.data ];
    let createdModelos_Receitas = await dbService.create(Modelos_Receita,dataToCreate);
    createdModelos_Receitas = { count: createdModelos_Receitas ? createdModelos_Receitas.length : 0 };
    return res.success({ data:{ count:createdModelos_Receitas.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Modelos_Receita from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Modelos_Receita(s). {status, message, data}
 */
const findAllModelos_Receita = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Modelos_ReceitaSchemaKey.findFilterKeys,
      Modelos_Receita.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Modelos_Receita, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundModelos_Receitas = await dbService.paginate( Modelos_Receita,query,options);
    if (!foundModelos_Receitas || !foundModelos_Receitas.data || !foundModelos_Receitas.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundModelos_Receitas });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Modelos_Receita from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Modelos_Receita. {status, message, data}
 */
const getModelos_Receita = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundModelos_Receita = await dbService.findOne(Modelos_Receita,query, options);
    if (!foundModelos_Receita){
      return res.recordNotFound();
    }
    return res.success({ data :foundModelos_Receita });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Modelos_Receita.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getModelos_ReceitaCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Modelos_ReceitaSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedModelos_Receita = await dbService.count(Modelos_Receita,where);
    return res.success({ data : { count: countedModelos_Receita } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Modelos_Receita with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Modelos_Receita.
 * @return {Object} : updated Modelos_Receita. {status, message, data}
 */
const updateModelos_Receita = async (req,res) => {
  try {
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      Modelos_ReceitaSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedModelos_Receita = await dbService.updateOne(Modelos_Receita,query,dataToUpdate);
    if (!updatedModelos_Receita){
      return res.recordNotFound();
    }
    return res.success({ data :updatedModelos_Receita });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Modelos_Receita with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Modelos_Receitas.
 * @return {Object} : updated Modelos_Receitas. {status, message, data}
 */
const bulkUpdateModelos_Receita = async (req,res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = { ...req.body.data, };
    }
    let updatedModelos_Receita = await dbService.updateMany(Modelos_Receita,filter,dataToUpdate);
    if (!updatedModelos_Receita){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedModelos_Receita } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Modelos_Receita with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Modelos_Receita.
 * @return {obj} : updated Modelos_Receita. {status, message, data}
 */
const partialUpdateModelos_Receita = async (req,res) => {
  try {
    if (!req.params.id){
      res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      Modelos_ReceitaSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedModelos_Receita = await dbService.updateOne(Modelos_Receita, query, dataToUpdate);
    if (!updatedModelos_Receita) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedModelos_Receita });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Modelos_Receita from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Modelos_Receita.
 * @return {Object} : deactivated Modelos_Receita. {status, message, data}
 */
const softDeleteModelos_Receita = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = { isDeleted: true, };
    let updatedModelos_Receita = await dbService.updateOne(Modelos_Receita, query, updateBody);
    if (!updatedModelos_Receita){
      return res.recordNotFound();
    }
    return res.success({ data:updatedModelos_Receita });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Modelos_Receita from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Modelos_Receita. {status, message, data}
 */
const deleteModelos_Receita = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedModelos_Receita = await dbService.deleteOne(Modelos_Receita, query);
    if (!deletedModelos_Receita){
      return res.recordNotFound();
    }
    return res.success({ data :deletedModelos_Receita });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Modelos_Receita in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyModelos_Receita = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedModelos_Receita = await dbService.deleteMany(Modelos_Receita,query);
    if (!deletedModelos_Receita){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedModelos_Receita } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Modelos_Receita from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Modelos_Receita.
 * @return {Object} : number of deactivated documents of Modelos_Receita. {status, message, data}
 */
const softDeleteManyModelos_Receita = async (req,res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const updateBody = { isDeleted: true, };
    let updatedModelos_Receita = await dbService.updateMany(Modelos_Receita,query, updateBody);
    if (!updatedModelos_Receita) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedModelos_Receita } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addModelos_Receita,
  bulkInsertModelos_Receita,
  findAllModelos_Receita,
  getModelos_Receita,
  getModelos_ReceitaCount,
  updateModelos_Receita,
  bulkUpdateModelos_Receita,
  partialUpdateModelos_Receita,
  softDeleteModelos_Receita,
  deleteModelos_Receita,
  deleteManyModelos_Receita,
  softDeleteManyModelos_Receita    
};
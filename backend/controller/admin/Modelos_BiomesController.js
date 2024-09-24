/**
 * Modelos_BiomesController.js
 * @description : exports action methods for Modelos_Biomes.
 */

const Modelos_Biomes = require('../../model/Modelos_Biomes');
const Modelos_BiomesSchemaKey = require('../../utils/validation/Modelos_BiomesValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../utils/common');
   
/**
 * @description : create document of Modelos_Biomes in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Modelos_Biomes. {status, message, data}
 */ 
const addModelos_Biomes = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      Modelos_BiomesSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate = new Modelos_Biomes(dataToCreate);
    let createdModelos_Biomes = await dbService.create(Modelos_Biomes,dataToCreate);
    return res.success({ data : createdModelos_Biomes });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Modelos_Biomes in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Modelos_Biomess. {status, message, data}
 */
const bulkInsertModelos_Biomes = async (req,res)=>{
  try {
    if (req.body && (!Array.isArray(req.body.data) || req.body.data.length < 1)) {
      return res.badRequest();
    }
    let dataToCreate = [ ...req.body.data ];
    let createdModelos_Biomess = await dbService.create(Modelos_Biomes,dataToCreate);
    createdModelos_Biomess = { count: createdModelos_Biomess ? createdModelos_Biomess.length : 0 };
    return res.success({ data:{ count:createdModelos_Biomess.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Modelos_Biomes from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Modelos_Biomes(s). {status, message, data}
 */
const findAllModelos_Biomes = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Modelos_BiomesSchemaKey.findFilterKeys,
      Modelos_Biomes.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Modelos_Biomes, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundModelos_Biomess = await dbService.paginate( Modelos_Biomes,query,options);
    if (!foundModelos_Biomess || !foundModelos_Biomess.data || !foundModelos_Biomess.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundModelos_Biomess });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Modelos_Biomes from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Modelos_Biomes. {status, message, data}
 */
const getModelos_Biomes = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundModelos_Biomes = await dbService.findOne(Modelos_Biomes,query, options);
    if (!foundModelos_Biomes){
      return res.recordNotFound();
    }
    return res.success({ data :foundModelos_Biomes });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Modelos_Biomes.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getModelos_BiomesCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Modelos_BiomesSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedModelos_Biomes = await dbService.count(Modelos_Biomes,where);
    return res.success({ data : { count: countedModelos_Biomes } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Modelos_Biomes with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Modelos_Biomes.
 * @return {Object} : updated Modelos_Biomes. {status, message, data}
 */
const updateModelos_Biomes = async (req,res) => {
  try {
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      Modelos_BiomesSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedModelos_Biomes = await dbService.updateOne(Modelos_Biomes,query,dataToUpdate);
    if (!updatedModelos_Biomes){
      return res.recordNotFound();
    }
    return res.success({ data :updatedModelos_Biomes });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Modelos_Biomes with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Modelos_Biomess.
 * @return {Object} : updated Modelos_Biomess. {status, message, data}
 */
const bulkUpdateModelos_Biomes = async (req,res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = { ...req.body.data, };
    }
    let updatedModelos_Biomes = await dbService.updateMany(Modelos_Biomes,filter,dataToUpdate);
    if (!updatedModelos_Biomes){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedModelos_Biomes } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Modelos_Biomes with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Modelos_Biomes.
 * @return {obj} : updated Modelos_Biomes. {status, message, data}
 */
const partialUpdateModelos_Biomes = async (req,res) => {
  try {
    if (!req.params.id){
      res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      Modelos_BiomesSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedModelos_Biomes = await dbService.updateOne(Modelos_Biomes, query, dataToUpdate);
    if (!updatedModelos_Biomes) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedModelos_Biomes });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Modelos_Biomes from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Modelos_Biomes.
 * @return {Object} : deactivated Modelos_Biomes. {status, message, data}
 */
const softDeleteModelos_Biomes = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = { isDeleted: true, };
    let updatedModelos_Biomes = await dbService.updateOne(Modelos_Biomes, query, updateBody);
    if (!updatedModelos_Biomes){
      return res.recordNotFound();
    }
    return res.success({ data:updatedModelos_Biomes });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Modelos_Biomes from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Modelos_Biomes. {status, message, data}
 */
const deleteModelos_Biomes = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedModelos_Biomes = await dbService.deleteOne(Modelos_Biomes, query);
    if (!deletedModelos_Biomes){
      return res.recordNotFound();
    }
    return res.success({ data :deletedModelos_Biomes });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Modelos_Biomes in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyModelos_Biomes = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedModelos_Biomes = await dbService.deleteMany(Modelos_Biomes,query);
    if (!deletedModelos_Biomes){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedModelos_Biomes } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Modelos_Biomes from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Modelos_Biomes.
 * @return {Object} : number of deactivated documents of Modelos_Biomes. {status, message, data}
 */
const softDeleteManyModelos_Biomes = async (req,res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const updateBody = { isDeleted: true, };
    let updatedModelos_Biomes = await dbService.updateMany(Modelos_Biomes,query, updateBody);
    if (!updatedModelos_Biomes) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedModelos_Biomes } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addModelos_Biomes,
  bulkInsertModelos_Biomes,
  findAllModelos_Biomes,
  getModelos_Biomes,
  getModelos_BiomesCount,
  updateModelos_Biomes,
  bulkUpdateModelos_Biomes,
  partialUpdateModelos_Biomes,
  softDeleteModelos_Biomes,
  deleteModelos_Biomes,
  deleteManyModelos_Biomes,
  softDeleteManyModelos_Biomes    
};
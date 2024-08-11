/**
 * BiomeController.js
 * @description : exports action methods for Biome.
 */

const Biome = require('../../model/Biome');
const BiomeSchemaKey = require('../../utils/validation/BiomeValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const deleteDependentService = require('../../utils/deleteDependent');
const utils = require('../../utils/common');
   
/**
 * @description : create document of Biome in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Biome. {status, message, data}
 */ 
const addBiome = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      BiomeSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate = new Biome(dataToCreate);
    let createdBiome = await dbService.create(Biome,dataToCreate);
    return res.success({ data : createdBiome });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Biome in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Biomes. {status, message, data}
 */
const bulkInsertBiome = async (req,res)=>{
  try {
    if (req.body && (!Array.isArray(req.body.data) || req.body.data.length < 1)) {
      return res.badRequest();
    }
    let dataToCreate = [ ...req.body.data ];
    let createdBiomes = await dbService.create(Biome,dataToCreate);
    createdBiomes = { count: createdBiomes ? createdBiomes.length : 0 };
    return res.success({ data:{ count:createdBiomes.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Biome from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Biome(s). {status, message, data}
 */
const findAllBiome = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      BiomeSchemaKey.findFilterKeys,
      Biome.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Biome, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundBiomes = await dbService.paginate( Biome,query,options);
    if (!foundBiomes || !foundBiomes.data || !foundBiomes.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundBiomes });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Biome from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Biome. {status, message, data}
 */
const getBiome = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundBiome = await dbService.findOne(Biome,query, options);
    if (!foundBiome){
      return res.recordNotFound();
    }
    return res.success({ data :foundBiome });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Biome.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getBiomeCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      BiomeSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedBiome = await dbService.count(Biome,where);
    return res.success({ data : { count: countedBiome } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Biome with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Biome.
 * @return {Object} : updated Biome. {status, message, data}
 */
const updateBiome = async (req,res) => {
  try {
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      BiomeSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedBiome = await dbService.updateOne(Biome,query,dataToUpdate);
    if (!updatedBiome){
      return res.recordNotFound();
    }
    return res.success({ data :updatedBiome });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Biome with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Biomes.
 * @return {Object} : updated Biomes. {status, message, data}
 */
const bulkUpdateBiome = async (req,res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = { ...req.body.data, };
    }
    let updatedBiome = await dbService.updateMany(Biome,filter,dataToUpdate);
    if (!updatedBiome){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedBiome } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Biome with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Biome.
 * @return {obj} : updated Biome. {status, message, data}
 */
const partialUpdateBiome = async (req,res) => {
  try {
    if (!req.params.id){
      res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      BiomeSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedBiome = await dbService.updateOne(Biome, query, dataToUpdate);
    if (!updatedBiome) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedBiome });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : deactivate document of Biome from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Biome.
 * @return {Object} : deactivated Biome. {status, message, data}
 */
const softDeleteBiome = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const updateBody = { isDeleted: true, };
    let updatedBiome = await deleteDependentService.softDeleteBiome(query, updateBody);
    if (!updatedBiome){
      return res.recordNotFound();
    }
    return res.success({ data:updatedBiome });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete document of Biome from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Biome. {status, message, data}
 */
const deleteBiome = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    let deletedBiome;
    if (req.body.isWarning) { 
      deletedBiome = await deleteDependentService.countBiome(query);
    } else {
      deletedBiome = await deleteDependentService.deleteBiome(query);
    }
    if (!deletedBiome){
      return res.recordNotFound();
    }
    return res.success({ data :deletedBiome });
  }
  catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete documents of Biome in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyBiome = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    let deletedBiome;
    if (req.body.isWarning) {
      deletedBiome = await deleteDependentService.countBiome(query);
    }
    else {
      deletedBiome = await deleteDependentService.deleteBiome(query);
    }
    if (!deletedBiome){
      return res.recordNotFound();
    }
    return res.success({ data :deletedBiome });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : deactivate multiple documents of Biome from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Biome.
 * @return {Object} : number of deactivated documents of Biome. {status, message, data}
 */
const softDeleteManyBiome = async (req,res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const updateBody = { isDeleted: true, };
    let updatedBiome = await deleteDependentService.softDeleteBiome(query, updateBody);
    if (!updatedBiome) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedBiome });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addBiome,
  bulkInsertBiome,
  findAllBiome,
  getBiome,
  getBiomeCount,
  updateBiome,
  bulkUpdateBiome,
  partialUpdateBiome,
  softDeleteBiome,
  deleteBiome,
  deleteManyBiome,
  softDeleteManyBiome    
};
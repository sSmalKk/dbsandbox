/**
 * Universe_ChunkController.js
 * @description : exports action methods for Universe_Chunk.
 */

const Universe_Chunk = require('../../model/Universe_Chunk');
const Universe_ChunkSchemaKey = require('../../utils/validation/Universe_ChunkValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const deleteDependentService = require('../../utils/deleteDependent');
const utils = require('../../utils/common');
   
/**
 * @description : create document of Universe_Chunk in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Universe_Chunk. {status, message, data}
 */ 
const addUniverse_Chunk = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      Universe_ChunkSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate = new Universe_Chunk(dataToCreate);
    let createdUniverse_Chunk = await dbService.create(Universe_Chunk,dataToCreate);
    return res.success({ data : createdUniverse_Chunk });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Universe_Chunk in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Universe_Chunks. {status, message, data}
 */
const bulkInsertUniverse_Chunk = async (req,res)=>{
  try {
    if (req.body && (!Array.isArray(req.body.data) || req.body.data.length < 1)) {
      return res.badRequest();
    }
    let dataToCreate = [ ...req.body.data ];
    let createdUniverse_Chunks = await dbService.create(Universe_Chunk,dataToCreate);
    createdUniverse_Chunks = { count: createdUniverse_Chunks ? createdUniverse_Chunks.length : 0 };
    return res.success({ data:{ count:createdUniverse_Chunks.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Universe_Chunk from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Universe_Chunk(s). {status, message, data}
 */
const findAllUniverse_Chunk = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Universe_ChunkSchemaKey.findFilterKeys,
      Universe_Chunk.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Universe_Chunk, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundUniverse_Chunks = await dbService.paginate( Universe_Chunk,query,options);
    if (!foundUniverse_Chunks || !foundUniverse_Chunks.data || !foundUniverse_Chunks.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundUniverse_Chunks });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Universe_Chunk from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Universe_Chunk. {status, message, data}
 */
const getUniverse_Chunk = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundUniverse_Chunk = await dbService.findOne(Universe_Chunk,query, options);
    if (!foundUniverse_Chunk){
      return res.recordNotFound();
    }
    return res.success({ data :foundUniverse_Chunk });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Universe_Chunk.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getUniverse_ChunkCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Universe_ChunkSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedUniverse_Chunk = await dbService.count(Universe_Chunk,where);
    return res.success({ data : { count: countedUniverse_Chunk } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Universe_Chunk with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Universe_Chunk.
 * @return {Object} : updated Universe_Chunk. {status, message, data}
 */
const updateUniverse_Chunk = async (req,res) => {
  try {
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      Universe_ChunkSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedUniverse_Chunk = await dbService.updateOne(Universe_Chunk,query,dataToUpdate);
    if (!updatedUniverse_Chunk){
      return res.recordNotFound();
    }
    return res.success({ data :updatedUniverse_Chunk });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Universe_Chunk with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Universe_Chunks.
 * @return {Object} : updated Universe_Chunks. {status, message, data}
 */
const bulkUpdateUniverse_Chunk = async (req,res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = { ...req.body.data, };
    }
    let updatedUniverse_Chunk = await dbService.updateMany(Universe_Chunk,filter,dataToUpdate);
    if (!updatedUniverse_Chunk){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedUniverse_Chunk } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Universe_Chunk with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Universe_Chunk.
 * @return {obj} : updated Universe_Chunk. {status, message, data}
 */
const partialUpdateUniverse_Chunk = async (req,res) => {
  try {
    if (!req.params.id){
      res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      Universe_ChunkSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedUniverse_Chunk = await dbService.updateOne(Universe_Chunk, query, dataToUpdate);
    if (!updatedUniverse_Chunk) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedUniverse_Chunk });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : deactivate document of Universe_Chunk from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Universe_Chunk.
 * @return {Object} : deactivated Universe_Chunk. {status, message, data}
 */
const softDeleteUniverse_Chunk = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const updateBody = { isDeleted: true, };
    let updatedUniverse_Chunk = await deleteDependentService.softDeleteUniverse_Chunk(query, updateBody);
    if (!updatedUniverse_Chunk){
      return res.recordNotFound();
    }
    return res.success({ data:updatedUniverse_Chunk });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete document of Universe_Chunk from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Universe_Chunk. {status, message, data}
 */
const deleteUniverse_Chunk = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    let deletedUniverse_Chunk;
    if (req.body.isWarning) { 
      deletedUniverse_Chunk = await deleteDependentService.countUniverse_Chunk(query);
    } else {
      deletedUniverse_Chunk = await deleteDependentService.deleteUniverse_Chunk(query);
    }
    if (!deletedUniverse_Chunk){
      return res.recordNotFound();
    }
    return res.success({ data :deletedUniverse_Chunk });
  }
  catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete documents of Universe_Chunk in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyUniverse_Chunk = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    let deletedUniverse_Chunk;
    if (req.body.isWarning) {
      deletedUniverse_Chunk = await deleteDependentService.countUniverse_Chunk(query);
    }
    else {
      deletedUniverse_Chunk = await deleteDependentService.deleteUniverse_Chunk(query);
    }
    if (!deletedUniverse_Chunk){
      return res.recordNotFound();
    }
    return res.success({ data :deletedUniverse_Chunk });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : deactivate multiple documents of Universe_Chunk from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Universe_Chunk.
 * @return {Object} : number of deactivated documents of Universe_Chunk. {status, message, data}
 */
const softDeleteManyUniverse_Chunk = async (req,res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const updateBody = { isDeleted: true, };
    let updatedUniverse_Chunk = await deleteDependentService.softDeleteUniverse_Chunk(query, updateBody);
    if (!updatedUniverse_Chunk) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedUniverse_Chunk });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addUniverse_Chunk,
  bulkInsertUniverse_Chunk,
  findAllUniverse_Chunk,
  getUniverse_Chunk,
  getUniverse_ChunkCount,
  updateUniverse_Chunk,
  bulkUpdateUniverse_Chunk,
  partialUpdateUniverse_Chunk,
  softDeleteUniverse_Chunk,
  deleteUniverse_Chunk,
  deleteManyUniverse_Chunk,
  softDeleteManyUniverse_Chunk    
};
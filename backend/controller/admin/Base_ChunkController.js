/**
 * Base_ChunkController.js
 * @description : exports action methods for Base_Chunk.
 */

const Base_Chunk = require('../../model/Base_Chunk');
const Base_ChunkSchemaKey = require('../../utils/validation/Base_ChunkValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const deleteDependentService = require('../../utils/deleteDependent');
const utils = require('../../utils/common');
   
/**
 * @description : create document of Base_Chunk in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Base_Chunk. {status, message, data}
 */ 
const addBase_Chunk = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      Base_ChunkSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Base_Chunk(dataToCreate);
    let createdBase_Chunk = await dbService.create(Base_Chunk,dataToCreate);
    return res.success({ data : createdBase_Chunk });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Base_Chunk in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Base_Chunks. {status, message, data}
 */
const bulkInsertBase_Chunk = async (req,res)=>{
  try {
    if (req.body && (!Array.isArray(req.body.data) || req.body.data.length < 1)) {
      return res.badRequest();
    }
    let dataToCreate = [ ...req.body.data ];
    for (let i = 0;i < dataToCreate.length;i++){
      dataToCreate[i] = {
        ...dataToCreate[i],
        addedBy: req.user.id
      };
    }
    let createdBase_Chunks = await dbService.create(Base_Chunk,dataToCreate);
    createdBase_Chunks = { count: createdBase_Chunks ? createdBase_Chunks.length : 0 };
    return res.success({ data:{ count:createdBase_Chunks.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Base_Chunk from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Base_Chunk(s). {status, message, data}
 */
const findAllBase_Chunk = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Base_ChunkSchemaKey.findFilterKeys,
      Base_Chunk.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Base_Chunk, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundBase_Chunks = await dbService.paginate( Base_Chunk,query,options);
    if (!foundBase_Chunks || !foundBase_Chunks.data || !foundBase_Chunks.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundBase_Chunks });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Base_Chunk from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Base_Chunk. {status, message, data}
 */
const getBase_Chunk = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundBase_Chunk = await dbService.findOne(Base_Chunk,query, options);
    if (!foundBase_Chunk){
      return res.recordNotFound();
    }
    return res.success({ data :foundBase_Chunk });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Base_Chunk.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getBase_ChunkCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Base_ChunkSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedBase_Chunk = await dbService.count(Base_Chunk,where);
    return res.success({ data : { count: countedBase_Chunk } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Base_Chunk with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Base_Chunk.
 * @return {Object} : updated Base_Chunk. {status, message, data}
 */
const updateBase_Chunk = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      Base_ChunkSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedBase_Chunk = await dbService.updateOne(Base_Chunk,query,dataToUpdate);
    if (!updatedBase_Chunk){
      return res.recordNotFound();
    }
    return res.success({ data :updatedBase_Chunk });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Base_Chunk with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Base_Chunks.
 * @return {Object} : updated Base_Chunks. {status, message, data}
 */
const bulkUpdateBase_Chunk = async (req,res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    delete dataToUpdate['addedBy'];
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = { 
        ...req.body.data,
        updatedBy : req.user.id
      };
    }
    let updatedBase_Chunk = await dbService.updateMany(Base_Chunk,filter,dataToUpdate);
    if (!updatedBase_Chunk){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedBase_Chunk } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Base_Chunk with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Base_Chunk.
 * @return {obj} : updated Base_Chunk. {status, message, data}
 */
const partialUpdateBase_Chunk = async (req,res) => {
  try {
    if (!req.params.id){
      res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    delete req.body['addedBy'];
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      Base_ChunkSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedBase_Chunk = await dbService.updateOne(Base_Chunk, query, dataToUpdate);
    if (!updatedBase_Chunk) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedBase_Chunk });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : deactivate document of Base_Chunk from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Base_Chunk.
 * @return {Object} : deactivated Base_Chunk. {status, message, data}
 */
const softDeleteBase_Chunk = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedBase_Chunk = await deleteDependentService.softDeleteBase_Chunk(query, updateBody);
    if (!updatedBase_Chunk){
      return res.recordNotFound();
    }
    return res.success({ data:updatedBase_Chunk });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete document of Base_Chunk from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Base_Chunk. {status, message, data}
 */
const deleteBase_Chunk = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    let deletedBase_Chunk;
    if (req.body.isWarning) { 
      deletedBase_Chunk = await deleteDependentService.countBase_Chunk(query);
    } else {
      deletedBase_Chunk = await deleteDependentService.deleteBase_Chunk(query);
    }
    if (!deletedBase_Chunk){
      return res.recordNotFound();
    }
    return res.success({ data :deletedBase_Chunk });
  }
  catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete documents of Base_Chunk in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyBase_Chunk = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    let deletedBase_Chunk;
    if (req.body.isWarning) {
      deletedBase_Chunk = await deleteDependentService.countBase_Chunk(query);
    }
    else {
      deletedBase_Chunk = await deleteDependentService.deleteBase_Chunk(query);
    }
    if (!deletedBase_Chunk){
      return res.recordNotFound();
    }
    return res.success({ data :deletedBase_Chunk });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : deactivate multiple documents of Base_Chunk from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Base_Chunk.
 * @return {Object} : number of deactivated documents of Base_Chunk. {status, message, data}
 */
const softDeleteManyBase_Chunk = async (req,res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedBase_Chunk = await deleteDependentService.softDeleteBase_Chunk(query, updateBody);
    if (!updatedBase_Chunk) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedBase_Chunk });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addBase_Chunk,
  bulkInsertBase_Chunk,
  findAllBase_Chunk,
  getBase_Chunk,
  getBase_ChunkCount,
  updateBase_Chunk,
  bulkUpdateBase_Chunk,
  partialUpdateBase_Chunk,
  softDeleteBase_Chunk,
  deleteBase_Chunk,
  deleteManyBase_Chunk,
  softDeleteManyBase_Chunk    
};
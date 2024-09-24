/**
 * Universe_EntityController.js
 * @description : exports action methods for Universe_Entity.
 */

const Universe_Entity = require('../../../model/Universe_Entity');
const Universe_EntitySchemaKey = require('../../../utils/validation/Universe_EntityValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../../utils/common');
   
/**
 * @description : create document of Universe_Entity in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Universe_Entity. {status, message, data}
 */ 
const addUniverse_Entity = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      Universe_EntitySchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate = new Universe_Entity(dataToCreate);
    let createdUniverse_Entity = await dbService.create(Universe_Entity,dataToCreate);
    return res.success({ data : createdUniverse_Entity });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Universe_Entity in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Universe_Entitys. {status, message, data}
 */
const bulkInsertUniverse_Entity = async (req,res)=>{
  try {
    if (req.body && (!Array.isArray(req.body.data) || req.body.data.length < 1)) {
      return res.badRequest();
    }
    let dataToCreate = [ ...req.body.data ];
    let createdUniverse_Entitys = await dbService.create(Universe_Entity,dataToCreate);
    createdUniverse_Entitys = { count: createdUniverse_Entitys ? createdUniverse_Entitys.length : 0 };
    return res.success({ data:{ count:createdUniverse_Entitys.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Universe_Entity from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Universe_Entity(s). {status, message, data}
 */
const findAllUniverse_Entity = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Universe_EntitySchemaKey.findFilterKeys,
      Universe_Entity.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Universe_Entity, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundUniverse_Entitys = await dbService.paginate( Universe_Entity,query,options);
    if (!foundUniverse_Entitys || !foundUniverse_Entitys.data || !foundUniverse_Entitys.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundUniverse_Entitys });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Universe_Entity from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Universe_Entity. {status, message, data}
 */
const getUniverse_Entity = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundUniverse_Entity = await dbService.findOne(Universe_Entity,query, options);
    if (!foundUniverse_Entity){
      return res.recordNotFound();
    }
    return res.success({ data :foundUniverse_Entity });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Universe_Entity.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getUniverse_EntityCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Universe_EntitySchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedUniverse_Entity = await dbService.count(Universe_Entity,where);
    return res.success({ data : { count: countedUniverse_Entity } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Universe_Entity with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Universe_Entity.
 * @return {Object} : updated Universe_Entity. {status, message, data}
 */
const updateUniverse_Entity = async (req,res) => {
  try {
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      Universe_EntitySchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedUniverse_Entity = await dbService.updateOne(Universe_Entity,query,dataToUpdate);
    if (!updatedUniverse_Entity){
      return res.recordNotFound();
    }
    return res.success({ data :updatedUniverse_Entity });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Universe_Entity with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Universe_Entitys.
 * @return {Object} : updated Universe_Entitys. {status, message, data}
 */
const bulkUpdateUniverse_Entity = async (req,res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = { ...req.body.data, };
    }
    let updatedUniverse_Entity = await dbService.updateMany(Universe_Entity,filter,dataToUpdate);
    if (!updatedUniverse_Entity){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedUniverse_Entity } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Universe_Entity with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Universe_Entity.
 * @return {obj} : updated Universe_Entity. {status, message, data}
 */
const partialUpdateUniverse_Entity = async (req,res) => {
  try {
    if (!req.params.id){
      res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      Universe_EntitySchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedUniverse_Entity = await dbService.updateOne(Universe_Entity, query, dataToUpdate);
    if (!updatedUniverse_Entity) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedUniverse_Entity });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Universe_Entity from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Universe_Entity.
 * @return {Object} : deactivated Universe_Entity. {status, message, data}
 */
const softDeleteUniverse_Entity = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = { isDeleted: true, };
    let updatedUniverse_Entity = await dbService.updateOne(Universe_Entity, query, updateBody);
    if (!updatedUniverse_Entity){
      return res.recordNotFound();
    }
    return res.success({ data:updatedUniverse_Entity });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Universe_Entity from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Universe_Entity. {status, message, data}
 */
const deleteUniverse_Entity = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedUniverse_Entity = await dbService.deleteOne(Universe_Entity, query);
    if (!deletedUniverse_Entity){
      return res.recordNotFound();
    }
    return res.success({ data :deletedUniverse_Entity });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Universe_Entity in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyUniverse_Entity = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedUniverse_Entity = await dbService.deleteMany(Universe_Entity,query);
    if (!deletedUniverse_Entity){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedUniverse_Entity } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Universe_Entity from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Universe_Entity.
 * @return {Object} : number of deactivated documents of Universe_Entity. {status, message, data}
 */
const softDeleteManyUniverse_Entity = async (req,res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const updateBody = { isDeleted: true, };
    let updatedUniverse_Entity = await dbService.updateMany(Universe_Entity,query, updateBody);
    if (!updatedUniverse_Entity) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedUniverse_Entity } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addUniverse_Entity,
  bulkInsertUniverse_Entity,
  findAllUniverse_Entity,
  getUniverse_Entity,
  getUniverse_EntityCount,
  updateUniverse_Entity,
  bulkUpdateUniverse_Entity,
  partialUpdateUniverse_Entity,
  softDeleteUniverse_Entity,
  deleteUniverse_Entity,
  deleteManyUniverse_Entity,
  softDeleteManyUniverse_Entity    
};
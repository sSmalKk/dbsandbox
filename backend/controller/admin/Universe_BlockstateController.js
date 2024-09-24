/**
 * Universe_BlockstateController.js
 * @description : exports action methods for Universe_Blockstate.
 */

const Universe_Blockstate = require('../../model/Universe_Blockstate');
const Universe_BlockstateSchemaKey = require('../../utils/validation/Universe_BlockstateValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const deleteDependentService = require('../../utils/deleteDependent');
const utils = require('../../utils/common');
   
/**
 * @description : create document of Universe_Blockstate in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Universe_Blockstate. {status, message, data}
 */ 
const addUniverse_Blockstate = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      Universe_BlockstateSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate = new Universe_Blockstate(dataToCreate);
    let createdUniverse_Blockstate = await dbService.create(Universe_Blockstate,dataToCreate);
    return res.success({ data : createdUniverse_Blockstate });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Universe_Blockstate in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Universe_Blockstates. {status, message, data}
 */
const bulkInsertUniverse_Blockstate = async (req,res)=>{
  try {
    if (req.body && (!Array.isArray(req.body.data) || req.body.data.length < 1)) {
      return res.badRequest();
    }
    let dataToCreate = [ ...req.body.data ];
    let createdUniverse_Blockstates = await dbService.create(Universe_Blockstate,dataToCreate);
    createdUniverse_Blockstates = { count: createdUniverse_Blockstates ? createdUniverse_Blockstates.length : 0 };
    return res.success({ data:{ count:createdUniverse_Blockstates.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Universe_Blockstate from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Universe_Blockstate(s). {status, message, data}
 */
const findAllUniverse_Blockstate = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Universe_BlockstateSchemaKey.findFilterKeys,
      Universe_Blockstate.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Universe_Blockstate, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundUniverse_Blockstates = await dbService.paginate( Universe_Blockstate,query,options);
    if (!foundUniverse_Blockstates || !foundUniverse_Blockstates.data || !foundUniverse_Blockstates.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundUniverse_Blockstates });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Universe_Blockstate from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Universe_Blockstate. {status, message, data}
 */
const getUniverse_Blockstate = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundUniverse_Blockstate = await dbService.findOne(Universe_Blockstate,query, options);
    if (!foundUniverse_Blockstate){
      return res.recordNotFound();
    }
    return res.success({ data :foundUniverse_Blockstate });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Universe_Blockstate.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getUniverse_BlockstateCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Universe_BlockstateSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedUniverse_Blockstate = await dbService.count(Universe_Blockstate,where);
    return res.success({ data : { count: countedUniverse_Blockstate } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Universe_Blockstate with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Universe_Blockstate.
 * @return {Object} : updated Universe_Blockstate. {status, message, data}
 */
const updateUniverse_Blockstate = async (req,res) => {
  try {
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      Universe_BlockstateSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedUniverse_Blockstate = await dbService.updateOne(Universe_Blockstate,query,dataToUpdate);
    if (!updatedUniverse_Blockstate){
      return res.recordNotFound();
    }
    return res.success({ data :updatedUniverse_Blockstate });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Universe_Blockstate with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Universe_Blockstates.
 * @return {Object} : updated Universe_Blockstates. {status, message, data}
 */
const bulkUpdateUniverse_Blockstate = async (req,res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = { ...req.body.data, };
    }
    let updatedUniverse_Blockstate = await dbService.updateMany(Universe_Blockstate,filter,dataToUpdate);
    if (!updatedUniverse_Blockstate){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedUniverse_Blockstate } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Universe_Blockstate with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Universe_Blockstate.
 * @return {obj} : updated Universe_Blockstate. {status, message, data}
 */
const partialUpdateUniverse_Blockstate = async (req,res) => {
  try {
    if (!req.params.id){
      res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      Universe_BlockstateSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedUniverse_Blockstate = await dbService.updateOne(Universe_Blockstate, query, dataToUpdate);
    if (!updatedUniverse_Blockstate) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedUniverse_Blockstate });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : deactivate document of Universe_Blockstate from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Universe_Blockstate.
 * @return {Object} : deactivated Universe_Blockstate. {status, message, data}
 */
const softDeleteUniverse_Blockstate = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const updateBody = { isDeleted: true, };
    let updatedUniverse_Blockstate = await deleteDependentService.softDeleteUniverse_Blockstate(query, updateBody);
    if (!updatedUniverse_Blockstate){
      return res.recordNotFound();
    }
    return res.success({ data:updatedUniverse_Blockstate });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete document of Universe_Blockstate from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Universe_Blockstate. {status, message, data}
 */
const deleteUniverse_Blockstate = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    let deletedUniverse_Blockstate;
    if (req.body.isWarning) { 
      deletedUniverse_Blockstate = await deleteDependentService.countUniverse_Blockstate(query);
    } else {
      deletedUniverse_Blockstate = await deleteDependentService.deleteUniverse_Blockstate(query);
    }
    if (!deletedUniverse_Blockstate){
      return res.recordNotFound();
    }
    return res.success({ data :deletedUniverse_Blockstate });
  }
  catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete documents of Universe_Blockstate in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyUniverse_Blockstate = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    let deletedUniverse_Blockstate;
    if (req.body.isWarning) {
      deletedUniverse_Blockstate = await deleteDependentService.countUniverse_Blockstate(query);
    }
    else {
      deletedUniverse_Blockstate = await deleteDependentService.deleteUniverse_Blockstate(query);
    }
    if (!deletedUniverse_Blockstate){
      return res.recordNotFound();
    }
    return res.success({ data :deletedUniverse_Blockstate });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : deactivate multiple documents of Universe_Blockstate from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Universe_Blockstate.
 * @return {Object} : number of deactivated documents of Universe_Blockstate. {status, message, data}
 */
const softDeleteManyUniverse_Blockstate = async (req,res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const updateBody = { isDeleted: true, };
    let updatedUniverse_Blockstate = await deleteDependentService.softDeleteUniverse_Blockstate(query, updateBody);
    if (!updatedUniverse_Blockstate) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedUniverse_Blockstate });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addUniverse_Blockstate,
  bulkInsertUniverse_Blockstate,
  findAllUniverse_Blockstate,
  getUniverse_Blockstate,
  getUniverse_BlockstateCount,
  updateUniverse_Blockstate,
  bulkUpdateUniverse_Blockstate,
  partialUpdateUniverse_Blockstate,
  softDeleteUniverse_Blockstate,
  deleteUniverse_Blockstate,
  deleteManyUniverse_Blockstate,
  softDeleteManyUniverse_Blockstate    
};
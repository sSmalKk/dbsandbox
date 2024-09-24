/**
 * Universe_SlotController.js
 * @description : exports action methods for Universe_Slot.
 */

const Universe_Slot = require('../../../model/Universe_Slot');
const Universe_SlotSchemaKey = require('../../../utils/validation/Universe_SlotValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const deleteDependentService = require('../../../utils/deleteDependent');
const utils = require('../../../utils/common');
   
/**
 * @description : create document of Universe_Slot in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Universe_Slot. {status, message, data}
 */ 
const addUniverse_Slot = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      Universe_SlotSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate = new Universe_Slot(dataToCreate);
    let createdUniverse_Slot = await dbService.create(Universe_Slot,dataToCreate);
    return res.success({ data : createdUniverse_Slot });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Universe_Slot in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Universe_Slots. {status, message, data}
 */
const bulkInsertUniverse_Slot = async (req,res)=>{
  try {
    if (req.body && (!Array.isArray(req.body.data) || req.body.data.length < 1)) {
      return res.badRequest();
    }
    let dataToCreate = [ ...req.body.data ];
    let createdUniverse_Slots = await dbService.create(Universe_Slot,dataToCreate);
    createdUniverse_Slots = { count: createdUniverse_Slots ? createdUniverse_Slots.length : 0 };
    return res.success({ data:{ count:createdUniverse_Slots.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Universe_Slot from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Universe_Slot(s). {status, message, data}
 */
const findAllUniverse_Slot = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Universe_SlotSchemaKey.findFilterKeys,
      Universe_Slot.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Universe_Slot, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundUniverse_Slots = await dbService.paginate( Universe_Slot,query,options);
    if (!foundUniverse_Slots || !foundUniverse_Slots.data || !foundUniverse_Slots.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundUniverse_Slots });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Universe_Slot from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Universe_Slot. {status, message, data}
 */
const getUniverse_Slot = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundUniverse_Slot = await dbService.findOne(Universe_Slot,query, options);
    if (!foundUniverse_Slot){
      return res.recordNotFound();
    }
    return res.success({ data :foundUniverse_Slot });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Universe_Slot.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getUniverse_SlotCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Universe_SlotSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedUniverse_Slot = await dbService.count(Universe_Slot,where);
    return res.success({ data : { count: countedUniverse_Slot } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Universe_Slot with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Universe_Slot.
 * @return {Object} : updated Universe_Slot. {status, message, data}
 */
const updateUniverse_Slot = async (req,res) => {
  try {
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      Universe_SlotSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedUniverse_Slot = await dbService.updateOne(Universe_Slot,query,dataToUpdate);
    if (!updatedUniverse_Slot){
      return res.recordNotFound();
    }
    return res.success({ data :updatedUniverse_Slot });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Universe_Slot with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Universe_Slots.
 * @return {Object} : updated Universe_Slots. {status, message, data}
 */
const bulkUpdateUniverse_Slot = async (req,res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = { ...req.body.data, };
    }
    let updatedUniverse_Slot = await dbService.updateMany(Universe_Slot,filter,dataToUpdate);
    if (!updatedUniverse_Slot){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedUniverse_Slot } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Universe_Slot with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Universe_Slot.
 * @return {obj} : updated Universe_Slot. {status, message, data}
 */
const partialUpdateUniverse_Slot = async (req,res) => {
  try {
    if (!req.params.id){
      res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      Universe_SlotSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedUniverse_Slot = await dbService.updateOne(Universe_Slot, query, dataToUpdate);
    if (!updatedUniverse_Slot) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedUniverse_Slot });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : deactivate document of Universe_Slot from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Universe_Slot.
 * @return {Object} : deactivated Universe_Slot. {status, message, data}
 */
const softDeleteUniverse_Slot = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const updateBody = { isDeleted: true, };
    let updatedUniverse_Slot = await deleteDependentService.softDeleteUniverse_Slot(query, updateBody);
    if (!updatedUniverse_Slot){
      return res.recordNotFound();
    }
    return res.success({ data:updatedUniverse_Slot });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete document of Universe_Slot from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Universe_Slot. {status, message, data}
 */
const deleteUniverse_Slot = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    let deletedUniverse_Slot;
    if (req.body.isWarning) { 
      deletedUniverse_Slot = await deleteDependentService.countUniverse_Slot(query);
    } else {
      deletedUniverse_Slot = await deleteDependentService.deleteUniverse_Slot(query);
    }
    if (!deletedUniverse_Slot){
      return res.recordNotFound();
    }
    return res.success({ data :deletedUniverse_Slot });
  }
  catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete documents of Universe_Slot in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyUniverse_Slot = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    let deletedUniverse_Slot;
    if (req.body.isWarning) {
      deletedUniverse_Slot = await deleteDependentService.countUniverse_Slot(query);
    }
    else {
      deletedUniverse_Slot = await deleteDependentService.deleteUniverse_Slot(query);
    }
    if (!deletedUniverse_Slot){
      return res.recordNotFound();
    }
    return res.success({ data :deletedUniverse_Slot });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : deactivate multiple documents of Universe_Slot from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Universe_Slot.
 * @return {Object} : number of deactivated documents of Universe_Slot. {status, message, data}
 */
const softDeleteManyUniverse_Slot = async (req,res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const updateBody = { isDeleted: true, };
    let updatedUniverse_Slot = await deleteDependentService.softDeleteUniverse_Slot(query, updateBody);
    if (!updatedUniverse_Slot) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedUniverse_Slot });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addUniverse_Slot,
  bulkInsertUniverse_Slot,
  findAllUniverse_Slot,
  getUniverse_Slot,
  getUniverse_SlotCount,
  updateUniverse_Slot,
  bulkUpdateUniverse_Slot,
  partialUpdateUniverse_Slot,
  softDeleteUniverse_Slot,
  deleteUniverse_Slot,
  deleteManyUniverse_Slot,
  softDeleteManyUniverse_Slot    
};
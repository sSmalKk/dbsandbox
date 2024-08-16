/**
 * roomtemplateController.js
 * @description : exports action methods for roomtemplate.
 */

const Roomtemplate = require('../../../model/roomtemplate');
const roomtemplateSchemaKey = require('../../../utils/validation/roomtemplateValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../../utils/common');
   
/**
 * @description : create document of Roomtemplate in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Roomtemplate. {status, message, data}
 */ 
const addRoomtemplate = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      roomtemplateSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate = new Roomtemplate(dataToCreate);
    let createdRoomtemplate = await dbService.create(Roomtemplate,dataToCreate);
    return res.success({ data : createdRoomtemplate });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Roomtemplate in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Roomtemplates. {status, message, data}
 */
const bulkInsertRoomtemplate = async (req,res)=>{
  try {
    if (req.body && (!Array.isArray(req.body.data) || req.body.data.length < 1)) {
      return res.badRequest();
    }
    let dataToCreate = [ ...req.body.data ];
    let createdRoomtemplates = await dbService.create(Roomtemplate,dataToCreate);
    createdRoomtemplates = { count: createdRoomtemplates ? createdRoomtemplates.length : 0 };
    return res.success({ data:{ count:createdRoomtemplates.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Roomtemplate from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Roomtemplate(s). {status, message, data}
 */
const findAllRoomtemplate = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      roomtemplateSchemaKey.findFilterKeys,
      Roomtemplate.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Roomtemplate, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundRoomtemplates = await dbService.paginate( Roomtemplate,query,options);
    if (!foundRoomtemplates || !foundRoomtemplates.data || !foundRoomtemplates.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundRoomtemplates });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Roomtemplate from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Roomtemplate. {status, message, data}
 */
const getRoomtemplate = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundRoomtemplate = await dbService.findOne(Roomtemplate,query, options);
    if (!foundRoomtemplate){
      return res.recordNotFound();
    }
    return res.success({ data :foundRoomtemplate });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Roomtemplate.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getRoomtemplateCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      roomtemplateSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedRoomtemplate = await dbService.count(Roomtemplate,where);
    return res.success({ data : { count: countedRoomtemplate } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Roomtemplate with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Roomtemplate.
 * @return {Object} : updated Roomtemplate. {status, message, data}
 */
const updateRoomtemplate = async (req,res) => {
  try {
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      roomtemplateSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedRoomtemplate = await dbService.updateOne(Roomtemplate,query,dataToUpdate);
    if (!updatedRoomtemplate){
      return res.recordNotFound();
    }
    return res.success({ data :updatedRoomtemplate });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Roomtemplate with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Roomtemplates.
 * @return {Object} : updated Roomtemplates. {status, message, data}
 */
const bulkUpdateRoomtemplate = async (req,res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = { ...req.body.data, };
    }
    let updatedRoomtemplate = await dbService.updateMany(Roomtemplate,filter,dataToUpdate);
    if (!updatedRoomtemplate){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedRoomtemplate } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Roomtemplate with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Roomtemplate.
 * @return {obj} : updated Roomtemplate. {status, message, data}
 */
const partialUpdateRoomtemplate = async (req,res) => {
  try {
    if (!req.params.id){
      res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      roomtemplateSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedRoomtemplate = await dbService.updateOne(Roomtemplate, query, dataToUpdate);
    if (!updatedRoomtemplate) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedRoomtemplate });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Roomtemplate from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Roomtemplate.
 * @return {Object} : deactivated Roomtemplate. {status, message, data}
 */
const softDeleteRoomtemplate = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = { isDeleted: true, };
    let updatedRoomtemplate = await dbService.updateOne(Roomtemplate, query, updateBody);
    if (!updatedRoomtemplate){
      return res.recordNotFound();
    }
    return res.success({ data:updatedRoomtemplate });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Roomtemplate from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Roomtemplate. {status, message, data}
 */
const deleteRoomtemplate = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedRoomtemplate = await dbService.deleteOne(Roomtemplate, query);
    if (!deletedRoomtemplate){
      return res.recordNotFound();
    }
    return res.success({ data :deletedRoomtemplate });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Roomtemplate in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyRoomtemplate = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedRoomtemplate = await dbService.deleteMany(Roomtemplate,query);
    if (!deletedRoomtemplate){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedRoomtemplate } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Roomtemplate from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Roomtemplate.
 * @return {Object} : number of deactivated documents of Roomtemplate. {status, message, data}
 */
const softDeleteManyRoomtemplate = async (req,res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const updateBody = { isDeleted: true, };
    let updatedRoomtemplate = await dbService.updateMany(Roomtemplate,query, updateBody);
    if (!updatedRoomtemplate) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedRoomtemplate } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addRoomtemplate,
  bulkInsertRoomtemplate,
  findAllRoomtemplate,
  getRoomtemplate,
  getRoomtemplateCount,
  updateRoomtemplate,
  bulkUpdateRoomtemplate,
  partialUpdateRoomtemplate,
  softDeleteRoomtemplate,
  deleteRoomtemplate,
  deleteManyRoomtemplate,
  softDeleteManyRoomtemplate    
};
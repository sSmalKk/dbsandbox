/**
 * Universe_InterfaceController.js
 * @description : exports action methods for Universe_Interface.
 */

const Universe_Interface = require('../../model/Universe_Interface');
const Universe_InterfaceSchemaKey = require('../../utils/validation/Universe_InterfaceValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const deleteDependentService = require('../../utils/deleteDependent');
const utils = require('../../utils/common');
   
/**
 * @description : create document of Universe_Interface in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Universe_Interface. {status, message, data}
 */ 
const addUniverse_Interface = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      Universe_InterfaceSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate = new Universe_Interface(dataToCreate);
    let createdUniverse_Interface = await dbService.create(Universe_Interface,dataToCreate);
    return res.success({ data : createdUniverse_Interface });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Universe_Interface in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Universe_Interfaces. {status, message, data}
 */
const bulkInsertUniverse_Interface = async (req,res)=>{
  try {
    if (req.body && (!Array.isArray(req.body.data) || req.body.data.length < 1)) {
      return res.badRequest();
    }
    let dataToCreate = [ ...req.body.data ];
    let createdUniverse_Interfaces = await dbService.create(Universe_Interface,dataToCreate);
    createdUniverse_Interfaces = { count: createdUniverse_Interfaces ? createdUniverse_Interfaces.length : 0 };
    return res.success({ data:{ count:createdUniverse_Interfaces.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Universe_Interface from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Universe_Interface(s). {status, message, data}
 */
const findAllUniverse_Interface = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Universe_InterfaceSchemaKey.findFilterKeys,
      Universe_Interface.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Universe_Interface, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundUniverse_Interfaces = await dbService.paginate( Universe_Interface,query,options);
    if (!foundUniverse_Interfaces || !foundUniverse_Interfaces.data || !foundUniverse_Interfaces.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundUniverse_Interfaces });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Universe_Interface from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Universe_Interface. {status, message, data}
 */
const getUniverse_Interface = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundUniverse_Interface = await dbService.findOne(Universe_Interface,query, options);
    if (!foundUniverse_Interface){
      return res.recordNotFound();
    }
    return res.success({ data :foundUniverse_Interface });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Universe_Interface.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getUniverse_InterfaceCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Universe_InterfaceSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedUniverse_Interface = await dbService.count(Universe_Interface,where);
    return res.success({ data : { count: countedUniverse_Interface } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Universe_Interface with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Universe_Interface.
 * @return {Object} : updated Universe_Interface. {status, message, data}
 */
const updateUniverse_Interface = async (req,res) => {
  try {
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      Universe_InterfaceSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedUniverse_Interface = await dbService.updateOne(Universe_Interface,query,dataToUpdate);
    if (!updatedUniverse_Interface){
      return res.recordNotFound();
    }
    return res.success({ data :updatedUniverse_Interface });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Universe_Interface with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Universe_Interfaces.
 * @return {Object} : updated Universe_Interfaces. {status, message, data}
 */
const bulkUpdateUniverse_Interface = async (req,res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = { ...req.body.data, };
    }
    let updatedUniverse_Interface = await dbService.updateMany(Universe_Interface,filter,dataToUpdate);
    if (!updatedUniverse_Interface){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedUniverse_Interface } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Universe_Interface with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Universe_Interface.
 * @return {obj} : updated Universe_Interface. {status, message, data}
 */
const partialUpdateUniverse_Interface = async (req,res) => {
  try {
    if (!req.params.id){
      res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      Universe_InterfaceSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedUniverse_Interface = await dbService.updateOne(Universe_Interface, query, dataToUpdate);
    if (!updatedUniverse_Interface) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedUniverse_Interface });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : deactivate document of Universe_Interface from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Universe_Interface.
 * @return {Object} : deactivated Universe_Interface. {status, message, data}
 */
const softDeleteUniverse_Interface = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const updateBody = { isDeleted: true, };
    let updatedUniverse_Interface = await deleteDependentService.softDeleteUniverse_Interface(query, updateBody);
    if (!updatedUniverse_Interface){
      return res.recordNotFound();
    }
    return res.success({ data:updatedUniverse_Interface });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete document of Universe_Interface from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Universe_Interface. {status, message, data}
 */
const deleteUniverse_Interface = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    let deletedUniverse_Interface;
    if (req.body.isWarning) { 
      deletedUniverse_Interface = await deleteDependentService.countUniverse_Interface(query);
    } else {
      deletedUniverse_Interface = await deleteDependentService.deleteUniverse_Interface(query);
    }
    if (!deletedUniverse_Interface){
      return res.recordNotFound();
    }
    return res.success({ data :deletedUniverse_Interface });
  }
  catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete documents of Universe_Interface in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyUniverse_Interface = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    let deletedUniverse_Interface;
    if (req.body.isWarning) {
      deletedUniverse_Interface = await deleteDependentService.countUniverse_Interface(query);
    }
    else {
      deletedUniverse_Interface = await deleteDependentService.deleteUniverse_Interface(query);
    }
    if (!deletedUniverse_Interface){
      return res.recordNotFound();
    }
    return res.success({ data :deletedUniverse_Interface });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : deactivate multiple documents of Universe_Interface from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Universe_Interface.
 * @return {Object} : number of deactivated documents of Universe_Interface. {status, message, data}
 */
const softDeleteManyUniverse_Interface = async (req,res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const updateBody = { isDeleted: true, };
    let updatedUniverse_Interface = await deleteDependentService.softDeleteUniverse_Interface(query, updateBody);
    if (!updatedUniverse_Interface) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedUniverse_Interface });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addUniverse_Interface,
  bulkInsertUniverse_Interface,
  findAllUniverse_Interface,
  getUniverse_Interface,
  getUniverse_InterfaceCount,
  updateUniverse_Interface,
  bulkUpdateUniverse_Interface,
  partialUpdateUniverse_Interface,
  softDeleteUniverse_Interface,
  deleteUniverse_Interface,
  deleteManyUniverse_Interface,
  softDeleteManyUniverse_Interface    
};
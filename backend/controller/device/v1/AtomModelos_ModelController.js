/**
 * AtomModelos_ModelController.js
 * @description : exports action methods for AtomModelos_Model.
 */

const AtomModelos_Model = require('../../../model/AtomModelos_Model');
const AtomModelos_ModelSchemaKey = require('../../../utils/validation/AtomModelos_ModelValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const deleteDependentService = require('../../../utils/deleteDependent');
const utils = require('../../../utils/common');
   
/**
 * @description : create document of AtomModelos_Model in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created AtomModelos_Model. {status, message, data}
 */ 
const addAtomModelos_Model = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      AtomModelos_ModelSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate = new AtomModelos_Model(dataToCreate);
    let createdAtomModelos_Model = await dbService.create(AtomModelos_Model,dataToCreate);
    return res.success({ data : createdAtomModelos_Model });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of AtomModelos_Model in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created AtomModelos_Models. {status, message, data}
 */
const bulkInsertAtomModelos_Model = async (req,res)=>{
  try {
    if (req.body && (!Array.isArray(req.body.data) || req.body.data.length < 1)) {
      return res.badRequest();
    }
    let dataToCreate = [ ...req.body.data ];
    let createdAtomModelos_Models = await dbService.create(AtomModelos_Model,dataToCreate);
    createdAtomModelos_Models = { count: createdAtomModelos_Models ? createdAtomModelos_Models.length : 0 };
    return res.success({ data:{ count:createdAtomModelos_Models.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of AtomModelos_Model from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found AtomModelos_Model(s). {status, message, data}
 */
const findAllAtomModelos_Model = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      AtomModelos_ModelSchemaKey.findFilterKeys,
      AtomModelos_Model.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(AtomModelos_Model, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundAtomModelos_Models = await dbService.paginate( AtomModelos_Model,query,options);
    if (!foundAtomModelos_Models || !foundAtomModelos_Models.data || !foundAtomModelos_Models.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundAtomModelos_Models });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of AtomModelos_Model from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found AtomModelos_Model. {status, message, data}
 */
const getAtomModelos_Model = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundAtomModelos_Model = await dbService.findOne(AtomModelos_Model,query, options);
    if (!foundAtomModelos_Model){
      return res.recordNotFound();
    }
    return res.success({ data :foundAtomModelos_Model });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of AtomModelos_Model.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getAtomModelos_ModelCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      AtomModelos_ModelSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedAtomModelos_Model = await dbService.count(AtomModelos_Model,where);
    return res.success({ data : { count: countedAtomModelos_Model } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of AtomModelos_Model with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated AtomModelos_Model.
 * @return {Object} : updated AtomModelos_Model. {status, message, data}
 */
const updateAtomModelos_Model = async (req,res) => {
  try {
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      AtomModelos_ModelSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedAtomModelos_Model = await dbService.updateOne(AtomModelos_Model,query,dataToUpdate);
    if (!updatedAtomModelos_Model){
      return res.recordNotFound();
    }
    return res.success({ data :updatedAtomModelos_Model });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of AtomModelos_Model with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated AtomModelos_Models.
 * @return {Object} : updated AtomModelos_Models. {status, message, data}
 */
const bulkUpdateAtomModelos_Model = async (req,res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = { ...req.body.data, };
    }
    let updatedAtomModelos_Model = await dbService.updateMany(AtomModelos_Model,filter,dataToUpdate);
    if (!updatedAtomModelos_Model){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedAtomModelos_Model } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of AtomModelos_Model with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated AtomModelos_Model.
 * @return {obj} : updated AtomModelos_Model. {status, message, data}
 */
const partialUpdateAtomModelos_Model = async (req,res) => {
  try {
    if (!req.params.id){
      res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      AtomModelos_ModelSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedAtomModelos_Model = await dbService.updateOne(AtomModelos_Model, query, dataToUpdate);
    if (!updatedAtomModelos_Model) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedAtomModelos_Model });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : deactivate document of AtomModelos_Model from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of AtomModelos_Model.
 * @return {Object} : deactivated AtomModelos_Model. {status, message, data}
 */
const softDeleteAtomModelos_Model = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const updateBody = { isDeleted: true, };
    let updatedAtomModelos_Model = await deleteDependentService.softDeleteAtomModelos_Model(query, updateBody);
    if (!updatedAtomModelos_Model){
      return res.recordNotFound();
    }
    return res.success({ data:updatedAtomModelos_Model });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete document of AtomModelos_Model from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted AtomModelos_Model. {status, message, data}
 */
const deleteAtomModelos_Model = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    let deletedAtomModelos_Model;
    if (req.body.isWarning) { 
      deletedAtomModelos_Model = await deleteDependentService.countAtomModelos_Model(query);
    } else {
      deletedAtomModelos_Model = await deleteDependentService.deleteAtomModelos_Model(query);
    }
    if (!deletedAtomModelos_Model){
      return res.recordNotFound();
    }
    return res.success({ data :deletedAtomModelos_Model });
  }
  catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete documents of AtomModelos_Model in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyAtomModelos_Model = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    let deletedAtomModelos_Model;
    if (req.body.isWarning) {
      deletedAtomModelos_Model = await deleteDependentService.countAtomModelos_Model(query);
    }
    else {
      deletedAtomModelos_Model = await deleteDependentService.deleteAtomModelos_Model(query);
    }
    if (!deletedAtomModelos_Model){
      return res.recordNotFound();
    }
    return res.success({ data :deletedAtomModelos_Model });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : deactivate multiple documents of AtomModelos_Model from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of AtomModelos_Model.
 * @return {Object} : number of deactivated documents of AtomModelos_Model. {status, message, data}
 */
const softDeleteManyAtomModelos_Model = async (req,res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const updateBody = { isDeleted: true, };
    let updatedAtomModelos_Model = await deleteDependentService.softDeleteAtomModelos_Model(query, updateBody);
    if (!updatedAtomModelos_Model) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedAtomModelos_Model });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addAtomModelos_Model,
  bulkInsertAtomModelos_Model,
  findAllAtomModelos_Model,
  getAtomModelos_Model,
  getAtomModelos_ModelCount,
  updateAtomModelos_Model,
  bulkUpdateAtomModelos_Model,
  partialUpdateAtomModelos_Model,
  softDeleteAtomModelos_Model,
  deleteAtomModelos_Model,
  deleteManyAtomModelos_Model,
  softDeleteManyAtomModelos_Model    
};
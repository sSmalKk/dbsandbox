/**
 * Universe_StorageController.js
 * @description : exports action methods for Universe_Storage.
 */

const Universe_Storage = require('../../../model/Universe_Storage');
const Universe_StorageSchemaKey = require('../../../utils/validation/Universe_StorageValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const deleteDependentService = require('../../../utils/deleteDependent');
const utils = require('../../../utils/common');
   
/**
 * @description : create document of Universe_Storage in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Universe_Storage. {status, message, data}
 */ 
const addUniverse_Storage = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      Universe_StorageSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Universe_Storage(dataToCreate);
    let createdUniverse_Storage = await dbService.create(Universe_Storage,dataToCreate);
    return res.success({ data : createdUniverse_Storage });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Universe_Storage in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Universe_Storages. {status, message, data}
 */
const bulkInsertUniverse_Storage = async (req,res)=>{
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
    let createdUniverse_Storages = await dbService.create(Universe_Storage,dataToCreate);
    createdUniverse_Storages = { count: createdUniverse_Storages ? createdUniverse_Storages.length : 0 };
    return res.success({ data:{ count:createdUniverse_Storages.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Universe_Storage from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Universe_Storage(s). {status, message, data}
 */
const findAllUniverse_Storage = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Universe_StorageSchemaKey.findFilterKeys,
      Universe_Storage.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Universe_Storage, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundUniverse_Storages = await dbService.paginate( Universe_Storage,query,options);
    if (!foundUniverse_Storages || !foundUniverse_Storages.data || !foundUniverse_Storages.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundUniverse_Storages });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Universe_Storage from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Universe_Storage. {status, message, data}
 */
const getUniverse_Storage = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundUniverse_Storage = await dbService.findOne(Universe_Storage,query, options);
    if (!foundUniverse_Storage){
      return res.recordNotFound();
    }
    return res.success({ data :foundUniverse_Storage });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Universe_Storage.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getUniverse_StorageCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Universe_StorageSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedUniverse_Storage = await dbService.count(Universe_Storage,where);
    return res.success({ data : { count: countedUniverse_Storage } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Universe_Storage with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Universe_Storage.
 * @return {Object} : updated Universe_Storage. {status, message, data}
 */
const updateUniverse_Storage = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      Universe_StorageSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedUniverse_Storage = await dbService.updateOne(Universe_Storage,query,dataToUpdate);
    if (!updatedUniverse_Storage){
      return res.recordNotFound();
    }
    return res.success({ data :updatedUniverse_Storage });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Universe_Storage with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Universe_Storages.
 * @return {Object} : updated Universe_Storages. {status, message, data}
 */
const bulkUpdateUniverse_Storage = async (req,res)=>{
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
    let updatedUniverse_Storage = await dbService.updateMany(Universe_Storage,filter,dataToUpdate);
    if (!updatedUniverse_Storage){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedUniverse_Storage } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Universe_Storage with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Universe_Storage.
 * @return {obj} : updated Universe_Storage. {status, message, data}
 */
const partialUpdateUniverse_Storage = async (req,res) => {
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
      Universe_StorageSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedUniverse_Storage = await dbService.updateOne(Universe_Storage, query, dataToUpdate);
    if (!updatedUniverse_Storage) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedUniverse_Storage });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : deactivate document of Universe_Storage from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Universe_Storage.
 * @return {Object} : deactivated Universe_Storage. {status, message, data}
 */
const softDeleteUniverse_Storage = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedUniverse_Storage = await deleteDependentService.softDeleteUniverse_Storage(query, updateBody);
    if (!updatedUniverse_Storage){
      return res.recordNotFound();
    }
    return res.success({ data:updatedUniverse_Storage });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete document of Universe_Storage from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Universe_Storage. {status, message, data}
 */
const deleteUniverse_Storage = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    let deletedUniverse_Storage;
    if (req.body.isWarning) { 
      deletedUniverse_Storage = await deleteDependentService.countUniverse_Storage(query);
    } else {
      deletedUniverse_Storage = await deleteDependentService.deleteUniverse_Storage(query);
    }
    if (!deletedUniverse_Storage){
      return res.recordNotFound();
    }
    return res.success({ data :deletedUniverse_Storage });
  }
  catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete documents of Universe_Storage in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyUniverse_Storage = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    let deletedUniverse_Storage;
    if (req.body.isWarning) {
      deletedUniverse_Storage = await deleteDependentService.countUniverse_Storage(query);
    }
    else {
      deletedUniverse_Storage = await deleteDependentService.deleteUniverse_Storage(query);
    }
    if (!deletedUniverse_Storage){
      return res.recordNotFound();
    }
    return res.success({ data :deletedUniverse_Storage });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : deactivate multiple documents of Universe_Storage from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Universe_Storage.
 * @return {Object} : number of deactivated documents of Universe_Storage. {status, message, data}
 */
const softDeleteManyUniverse_Storage = async (req,res) => {
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
    let updatedUniverse_Storage = await deleteDependentService.softDeleteUniverse_Storage(query, updateBody);
    if (!updatedUniverse_Storage) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedUniverse_Storage });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addUniverse_Storage,
  bulkInsertUniverse_Storage,
  findAllUniverse_Storage,
  getUniverse_Storage,
  getUniverse_StorageCount,
  updateUniverse_Storage,
  bulkUpdateUniverse_Storage,
  partialUpdateUniverse_Storage,
  softDeleteUniverse_Storage,
  deleteUniverse_Storage,
  deleteManyUniverse_Storage,
  softDeleteManyUniverse_Storage    
};
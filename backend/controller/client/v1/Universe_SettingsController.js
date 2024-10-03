/**
 * Universe_SettingsController.js
 * @description : exports action methods for Universe_Settings.
 */

const Universe_Settings = require('../../../model/Universe_Settings');
const Universe_SettingsSchemaKey = require('../../../utils/validation/Universe_SettingsValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const deleteDependentService = require('../../../utils/deleteDependent');
const utils = require('../../../utils/common');
   
/**
 * @description : create document of Universe_Settings in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Universe_Settings. {status, message, data}
 */ 
const addUniverse_Settings = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      Universe_SettingsSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Universe_Settings(dataToCreate);
    let createdUniverse_Settings = await dbService.create(Universe_Settings,dataToCreate);
    return res.success({ data : createdUniverse_Settings });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Universe_Settings in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Universe_Settingss. {status, message, data}
 */
const bulkInsertUniverse_Settings = async (req,res)=>{
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
    let createdUniverse_Settingss = await dbService.create(Universe_Settings,dataToCreate);
    createdUniverse_Settingss = { count: createdUniverse_Settingss ? createdUniverse_Settingss.length : 0 };
    return res.success({ data:{ count:createdUniverse_Settingss.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Universe_Settings from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Universe_Settings(s). {status, message, data}
 */
const findAllUniverse_Settings = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Universe_SettingsSchemaKey.findFilterKeys,
      Universe_Settings.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Universe_Settings, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundUniverse_Settingss = await dbService.paginate( Universe_Settings,query,options);
    if (!foundUniverse_Settingss || !foundUniverse_Settingss.data || !foundUniverse_Settingss.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundUniverse_Settingss });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Universe_Settings from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Universe_Settings. {status, message, data}
 */
const getUniverse_Settings = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundUniverse_Settings = await dbService.findOne(Universe_Settings,query, options);
    if (!foundUniverse_Settings){
      return res.recordNotFound();
    }
    return res.success({ data :foundUniverse_Settings });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Universe_Settings.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getUniverse_SettingsCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Universe_SettingsSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedUniverse_Settings = await dbService.count(Universe_Settings,where);
    return res.success({ data : { count: countedUniverse_Settings } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Universe_Settings with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Universe_Settings.
 * @return {Object} : updated Universe_Settings. {status, message, data}
 */
const updateUniverse_Settings = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      Universe_SettingsSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedUniverse_Settings = await dbService.updateOne(Universe_Settings,query,dataToUpdate);
    if (!updatedUniverse_Settings){
      return res.recordNotFound();
    }
    return res.success({ data :updatedUniverse_Settings });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Universe_Settings with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Universe_Settingss.
 * @return {Object} : updated Universe_Settingss. {status, message, data}
 */
const bulkUpdateUniverse_Settings = async (req,res)=>{
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
    let updatedUniverse_Settings = await dbService.updateMany(Universe_Settings,filter,dataToUpdate);
    if (!updatedUniverse_Settings){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedUniverse_Settings } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Universe_Settings with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Universe_Settings.
 * @return {obj} : updated Universe_Settings. {status, message, data}
 */
const partialUpdateUniverse_Settings = async (req,res) => {
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
      Universe_SettingsSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedUniverse_Settings = await dbService.updateOne(Universe_Settings, query, dataToUpdate);
    if (!updatedUniverse_Settings) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedUniverse_Settings });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : deactivate document of Universe_Settings from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Universe_Settings.
 * @return {Object} : deactivated Universe_Settings. {status, message, data}
 */
const softDeleteUniverse_Settings = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedUniverse_Settings = await deleteDependentService.softDeleteUniverse_Settings(query, updateBody);
    if (!updatedUniverse_Settings){
      return res.recordNotFound();
    }
    return res.success({ data:updatedUniverse_Settings });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete document of Universe_Settings from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Universe_Settings. {status, message, data}
 */
const deleteUniverse_Settings = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    let deletedUniverse_Settings;
    if (req.body.isWarning) { 
      deletedUniverse_Settings = await deleteDependentService.countUniverse_Settings(query);
    } else {
      deletedUniverse_Settings = await deleteDependentService.deleteUniverse_Settings(query);
    }
    if (!deletedUniverse_Settings){
      return res.recordNotFound();
    }
    return res.success({ data :deletedUniverse_Settings });
  }
  catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete documents of Universe_Settings in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyUniverse_Settings = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    let deletedUniverse_Settings;
    if (req.body.isWarning) {
      deletedUniverse_Settings = await deleteDependentService.countUniverse_Settings(query);
    }
    else {
      deletedUniverse_Settings = await deleteDependentService.deleteUniverse_Settings(query);
    }
    if (!deletedUniverse_Settings){
      return res.recordNotFound();
    }
    return res.success({ data :deletedUniverse_Settings });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : deactivate multiple documents of Universe_Settings from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Universe_Settings.
 * @return {Object} : number of deactivated documents of Universe_Settings. {status, message, data}
 */
const softDeleteManyUniverse_Settings = async (req,res) => {
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
    let updatedUniverse_Settings = await deleteDependentService.softDeleteUniverse_Settings(query, updateBody);
    if (!updatedUniverse_Settings) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedUniverse_Settings });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addUniverse_Settings,
  bulkInsertUniverse_Settings,
  findAllUniverse_Settings,
  getUniverse_Settings,
  getUniverse_SettingsCount,
  updateUniverse_Settings,
  bulkUpdateUniverse_Settings,
  partialUpdateUniverse_Settings,
  softDeleteUniverse_Settings,
  deleteUniverse_Settings,
  deleteManyUniverse_Settings,
  softDeleteManyUniverse_Settings    
};
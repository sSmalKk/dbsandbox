/**
 * Modelos_modelController.js
 * @description : exports action methods for Modelos_model.
 */

const Modelos_model = require('../../model/Modelos_model');
const Modelos_modelSchemaKey = require('../../utils/validation/Modelos_modelValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const deleteDependentService = require('../../utils/deleteDependent');
const utils = require('../../utils/common');
   
/**
 * @description : create document of Modelos_model in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Modelos_model. {status, message, data}
 */ 
const addModelos_model = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      Modelos_modelSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Modelos_model(dataToCreate);
    let createdModelos_model = await dbService.create(Modelos_model,dataToCreate);
    return res.success({ data : createdModelos_model });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Modelos_model in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Modelos_models. {status, message, data}
 */
const bulkInsertModelos_model = async (req,res)=>{
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
    let createdModelos_models = await dbService.create(Modelos_model,dataToCreate);
    createdModelos_models = { count: createdModelos_models ? createdModelos_models.length : 0 };
    return res.success({ data:{ count:createdModelos_models.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Modelos_model from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Modelos_model(s). {status, message, data}
 */
const findAllModelos_model = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Modelos_modelSchemaKey.findFilterKeys,
      Modelos_model.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Modelos_model, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundModelos_models = await dbService.paginate( Modelos_model,query,options);
    if (!foundModelos_models || !foundModelos_models.data || !foundModelos_models.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundModelos_models });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Modelos_model from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Modelos_model. {status, message, data}
 */
const getModelos_model = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundModelos_model = await dbService.findOne(Modelos_model,query, options);
    if (!foundModelos_model){
      return res.recordNotFound();
    }
    return res.success({ data :foundModelos_model });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Modelos_model.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getModelos_modelCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Modelos_modelSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedModelos_model = await dbService.count(Modelos_model,where);
    return res.success({ data : { count: countedModelos_model } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Modelos_model with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Modelos_model.
 * @return {Object} : updated Modelos_model. {status, message, data}
 */
const updateModelos_model = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      Modelos_modelSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedModelos_model = await dbService.updateOne(Modelos_model,query,dataToUpdate);
    if (!updatedModelos_model){
      return res.recordNotFound();
    }
    return res.success({ data :updatedModelos_model });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Modelos_model with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Modelos_models.
 * @return {Object} : updated Modelos_models. {status, message, data}
 */
const bulkUpdateModelos_model = async (req,res)=>{
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
    let updatedModelos_model = await dbService.updateMany(Modelos_model,filter,dataToUpdate);
    if (!updatedModelos_model){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedModelos_model } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Modelos_model with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Modelos_model.
 * @return {obj} : updated Modelos_model. {status, message, data}
 */
const partialUpdateModelos_model = async (req,res) => {
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
      Modelos_modelSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedModelos_model = await dbService.updateOne(Modelos_model, query, dataToUpdate);
    if (!updatedModelos_model) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedModelos_model });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : deactivate document of Modelos_model from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Modelos_model.
 * @return {Object} : deactivated Modelos_model. {status, message, data}
 */
const softDeleteModelos_model = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedModelos_model = await deleteDependentService.softDeleteModelos_model(query, updateBody);
    if (!updatedModelos_model){
      return res.recordNotFound();
    }
    return res.success({ data:updatedModelos_model });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete document of Modelos_model from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Modelos_model. {status, message, data}
 */
const deleteModelos_model = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    let deletedModelos_model;
    if (req.body.isWarning) { 
      deletedModelos_model = await deleteDependentService.countModelos_model(query);
    } else {
      deletedModelos_model = await deleteDependentService.deleteModelos_model(query);
    }
    if (!deletedModelos_model){
      return res.recordNotFound();
    }
    return res.success({ data :deletedModelos_model });
  }
  catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete documents of Modelos_model in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyModelos_model = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    let deletedModelos_model;
    if (req.body.isWarning) {
      deletedModelos_model = await deleteDependentService.countModelos_model(query);
    }
    else {
      deletedModelos_model = await deleteDependentService.deleteModelos_model(query);
    }
    if (!deletedModelos_model){
      return res.recordNotFound();
    }
    return res.success({ data :deletedModelos_model });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : deactivate multiple documents of Modelos_model from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Modelos_model.
 * @return {Object} : number of deactivated documents of Modelos_model. {status, message, data}
 */
const softDeleteManyModelos_model = async (req,res) => {
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
    let updatedModelos_model = await deleteDependentService.softDeleteModelos_model(query, updateBody);
    if (!updatedModelos_model) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedModelos_model });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addModelos_model,
  bulkInsertModelos_model,
  findAllModelos_model,
  getModelos_model,
  getModelos_modelCount,
  updateModelos_model,
  bulkUpdateModelos_model,
  partialUpdateModelos_model,
  softDeleteModelos_model,
  deleteModelos_model,
  deleteManyModelos_model,
  softDeleteManyModelos_model    
};
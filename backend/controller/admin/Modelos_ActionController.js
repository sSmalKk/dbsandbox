/**
 * Modelos_ActionController.js
 * @description : exports action methods for Modelos_Action.
 */

const Modelos_Action = require('../../model/Modelos_Action');
const Modelos_ActionSchemaKey = require('../../utils/validation/Modelos_ActionValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const deleteDependentService = require('../../utils/deleteDependent');
const utils = require('../../utils/common');
   
/**
 * @description : create document of Modelos_Action in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Modelos_Action. {status, message, data}
 */ 
const addModelos_Action = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      Modelos_ActionSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Modelos_Action(dataToCreate);
    let createdModelos_Action = await dbService.create(Modelos_Action,dataToCreate);
    return res.success({ data : createdModelos_Action });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Modelos_Action in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Modelos_Actions. {status, message, data}
 */
const bulkInsertModelos_Action = async (req,res)=>{
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
    let createdModelos_Actions = await dbService.create(Modelos_Action,dataToCreate);
    createdModelos_Actions = { count: createdModelos_Actions ? createdModelos_Actions.length : 0 };
    return res.success({ data:{ count:createdModelos_Actions.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Modelos_Action from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Modelos_Action(s). {status, message, data}
 */
const findAllModelos_Action = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Modelos_ActionSchemaKey.findFilterKeys,
      Modelos_Action.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Modelos_Action, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundModelos_Actions = await dbService.paginate( Modelos_Action,query,options);
    if (!foundModelos_Actions || !foundModelos_Actions.data || !foundModelos_Actions.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundModelos_Actions });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Modelos_Action from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Modelos_Action. {status, message, data}
 */
const getModelos_Action = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundModelos_Action = await dbService.findOne(Modelos_Action,query, options);
    if (!foundModelos_Action){
      return res.recordNotFound();
    }
    return res.success({ data :foundModelos_Action });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Modelos_Action.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getModelos_ActionCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Modelos_ActionSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedModelos_Action = await dbService.count(Modelos_Action,where);
    return res.success({ data : { count: countedModelos_Action } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Modelos_Action with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Modelos_Action.
 * @return {Object} : updated Modelos_Action. {status, message, data}
 */
const updateModelos_Action = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      Modelos_ActionSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedModelos_Action = await dbService.updateOne(Modelos_Action,query,dataToUpdate);
    if (!updatedModelos_Action){
      return res.recordNotFound();
    }
    return res.success({ data :updatedModelos_Action });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Modelos_Action with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Modelos_Actions.
 * @return {Object} : updated Modelos_Actions. {status, message, data}
 */
const bulkUpdateModelos_Action = async (req,res)=>{
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
    let updatedModelos_Action = await dbService.updateMany(Modelos_Action,filter,dataToUpdate);
    if (!updatedModelos_Action){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedModelos_Action } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Modelos_Action with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Modelos_Action.
 * @return {obj} : updated Modelos_Action. {status, message, data}
 */
const partialUpdateModelos_Action = async (req,res) => {
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
      Modelos_ActionSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedModelos_Action = await dbService.updateOne(Modelos_Action, query, dataToUpdate);
    if (!updatedModelos_Action) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedModelos_Action });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : deactivate document of Modelos_Action from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Modelos_Action.
 * @return {Object} : deactivated Modelos_Action. {status, message, data}
 */
const softDeleteModelos_Action = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedModelos_Action = await deleteDependentService.softDeleteModelos_Action(query, updateBody);
    if (!updatedModelos_Action){
      return res.recordNotFound();
    }
    return res.success({ data:updatedModelos_Action });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete document of Modelos_Action from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Modelos_Action. {status, message, data}
 */
const deleteModelos_Action = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    let deletedModelos_Action;
    if (req.body.isWarning) { 
      deletedModelos_Action = await deleteDependentService.countModelos_Action(query);
    } else {
      deletedModelos_Action = await deleteDependentService.deleteModelos_Action(query);
    }
    if (!deletedModelos_Action){
      return res.recordNotFound();
    }
    return res.success({ data :deletedModelos_Action });
  }
  catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete documents of Modelos_Action in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyModelos_Action = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    let deletedModelos_Action;
    if (req.body.isWarning) {
      deletedModelos_Action = await deleteDependentService.countModelos_Action(query);
    }
    else {
      deletedModelos_Action = await deleteDependentService.deleteModelos_Action(query);
    }
    if (!deletedModelos_Action){
      return res.recordNotFound();
    }
    return res.success({ data :deletedModelos_Action });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : deactivate multiple documents of Modelos_Action from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Modelos_Action.
 * @return {Object} : number of deactivated documents of Modelos_Action. {status, message, data}
 */
const softDeleteManyModelos_Action = async (req,res) => {
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
    let updatedModelos_Action = await deleteDependentService.softDeleteModelos_Action(query, updateBody);
    if (!updatedModelos_Action) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedModelos_Action });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addModelos_Action,
  bulkInsertModelos_Action,
  findAllModelos_Action,
  getModelos_Action,
  getModelos_ActionCount,
  updateModelos_Action,
  bulkUpdateModelos_Action,
  partialUpdateModelos_Action,
  softDeleteModelos_Action,
  deleteModelos_Action,
  deleteManyModelos_Action,
  softDeleteManyModelos_Action    
};
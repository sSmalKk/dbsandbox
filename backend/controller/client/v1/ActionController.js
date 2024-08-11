/**
 * ActionController.js
 * @description : exports action methods for Action.
 */

const Action = require('../../../model/Action');
const ActionSchemaKey = require('../../../utils/validation/ActionValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../../utils/common');
   
/**
 * @description : create document of Action in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Action. {status, message, data}
 */ 
const addAction = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      ActionSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate = new Action(dataToCreate);
    let createdAction = await dbService.create(Action,dataToCreate);
    return res.success({ data : createdAction });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Action in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Actions. {status, message, data}
 */
const bulkInsertAction = async (req,res)=>{
  try {
    if (req.body && (!Array.isArray(req.body.data) || req.body.data.length < 1)) {
      return res.badRequest();
    }
    let dataToCreate = [ ...req.body.data ];
    let createdActions = await dbService.create(Action,dataToCreate);
    createdActions = { count: createdActions ? createdActions.length : 0 };
    return res.success({ data:{ count:createdActions.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Action from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Action(s). {status, message, data}
 */
const findAllAction = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      ActionSchemaKey.findFilterKeys,
      Action.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Action, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundActions = await dbService.paginate( Action,query,options);
    if (!foundActions || !foundActions.data || !foundActions.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundActions });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Action from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Action. {status, message, data}
 */
const getAction = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundAction = await dbService.findOne(Action,query, options);
    if (!foundAction){
      return res.recordNotFound();
    }
    return res.success({ data :foundAction });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Action.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getActionCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      ActionSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedAction = await dbService.count(Action,where);
    return res.success({ data : { count: countedAction } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Action with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Action.
 * @return {Object} : updated Action. {status, message, data}
 */
const updateAction = async (req,res) => {
  try {
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      ActionSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedAction = await dbService.updateOne(Action,query,dataToUpdate);
    if (!updatedAction){
      return res.recordNotFound();
    }
    return res.success({ data :updatedAction });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Action with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Actions.
 * @return {Object} : updated Actions. {status, message, data}
 */
const bulkUpdateAction = async (req,res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = { ...req.body.data, };
    }
    let updatedAction = await dbService.updateMany(Action,filter,dataToUpdate);
    if (!updatedAction){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedAction } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Action with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Action.
 * @return {obj} : updated Action. {status, message, data}
 */
const partialUpdateAction = async (req,res) => {
  try {
    if (!req.params.id){
      res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      ActionSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedAction = await dbService.updateOne(Action, query, dataToUpdate);
    if (!updatedAction) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedAction });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Action from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Action.
 * @return {Object} : deactivated Action. {status, message, data}
 */
const softDeleteAction = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = { isDeleted: true, };
    let updatedAction = await dbService.updateOne(Action, query, updateBody);
    if (!updatedAction){
      return res.recordNotFound();
    }
    return res.success({ data:updatedAction });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Action from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Action. {status, message, data}
 */
const deleteAction = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedAction = await dbService.deleteOne(Action, query);
    if (!deletedAction){
      return res.recordNotFound();
    }
    return res.success({ data :deletedAction });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Action in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyAction = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedAction = await dbService.deleteMany(Action,query);
    if (!deletedAction){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedAction } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Action from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Action.
 * @return {Object} : number of deactivated documents of Action. {status, message, data}
 */
const softDeleteManyAction = async (req,res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const updateBody = { isDeleted: true, };
    let updatedAction = await dbService.updateMany(Action,query, updateBody);
    if (!updatedAction) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedAction } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addAction,
  bulkInsertAction,
  findAllAction,
  getAction,
  getActionCount,
  updateAction,
  bulkUpdateAction,
  partialUpdateAction,
  softDeleteAction,
  deleteAction,
  deleteManyAction,
  softDeleteManyAction    
};
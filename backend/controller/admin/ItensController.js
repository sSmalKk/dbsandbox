/**
 * ItensController.js
 * @description : exports action methods for Itens.
 */

const Itens = require('../../model/Itens');
const ItensSchemaKey = require('../../utils/validation/ItensValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const deleteDependentService = require('../../utils/deleteDependent');
const utils = require('../../utils/common');
   
/**
 * @description : create document of Itens in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Itens. {status, message, data}
 */ 
const addItens = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      ItensSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate = new Itens(dataToCreate);
    let createdItens = await dbService.create(Itens,dataToCreate);
    return res.success({ data : createdItens });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Itens in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Itenss. {status, message, data}
 */
const bulkInsertItens = async (req,res)=>{
  try {
    if (req.body && (!Array.isArray(req.body.data) || req.body.data.length < 1)) {
      return res.badRequest();
    }
    let dataToCreate = [ ...req.body.data ];
    let createdItenss = await dbService.create(Itens,dataToCreate);
    createdItenss = { count: createdItenss ? createdItenss.length : 0 };
    return res.success({ data:{ count:createdItenss.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Itens from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Itens(s). {status, message, data}
 */
const findAllItens = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      ItensSchemaKey.findFilterKeys,
      Itens.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Itens, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundItenss = await dbService.paginate( Itens,query,options);
    if (!foundItenss || !foundItenss.data || !foundItenss.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundItenss });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Itens from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Itens. {status, message, data}
 */
const getItens = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundItens = await dbService.findOne(Itens,query, options);
    if (!foundItens){
      return res.recordNotFound();
    }
    return res.success({ data :foundItens });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Itens.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getItensCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      ItensSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedItens = await dbService.count(Itens,where);
    return res.success({ data : { count: countedItens } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Itens with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Itens.
 * @return {Object} : updated Itens. {status, message, data}
 */
const updateItens = async (req,res) => {
  try {
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      ItensSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedItens = await dbService.updateOne(Itens,query,dataToUpdate);
    if (!updatedItens){
      return res.recordNotFound();
    }
    return res.success({ data :updatedItens });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Itens with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Itenss.
 * @return {Object} : updated Itenss. {status, message, data}
 */
const bulkUpdateItens = async (req,res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = { ...req.body.data, };
    }
    let updatedItens = await dbService.updateMany(Itens,filter,dataToUpdate);
    if (!updatedItens){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedItens } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Itens with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Itens.
 * @return {obj} : updated Itens. {status, message, data}
 */
const partialUpdateItens = async (req,res) => {
  try {
    if (!req.params.id){
      res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      ItensSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedItens = await dbService.updateOne(Itens, query, dataToUpdate);
    if (!updatedItens) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedItens });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : deactivate document of Itens from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Itens.
 * @return {Object} : deactivated Itens. {status, message, data}
 */
const softDeleteItens = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const updateBody = { isDeleted: true, };
    let updatedItens = await deleteDependentService.softDeleteItens(query, updateBody);
    if (!updatedItens){
      return res.recordNotFound();
    }
    return res.success({ data:updatedItens });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete document of Itens from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Itens. {status, message, data}
 */
const deleteItens = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    let deletedItens;
    if (req.body.isWarning) { 
      deletedItens = await deleteDependentService.countItens(query);
    } else {
      deletedItens = await deleteDependentService.deleteItens(query);
    }
    if (!deletedItens){
      return res.recordNotFound();
    }
    return res.success({ data :deletedItens });
  }
  catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete documents of Itens in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyItens = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    let deletedItens;
    if (req.body.isWarning) {
      deletedItens = await deleteDependentService.countItens(query);
    }
    else {
      deletedItens = await deleteDependentService.deleteItens(query);
    }
    if (!deletedItens){
      return res.recordNotFound();
    }
    return res.success({ data :deletedItens });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : deactivate multiple documents of Itens from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Itens.
 * @return {Object} : number of deactivated documents of Itens. {status, message, data}
 */
const softDeleteManyItens = async (req,res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const updateBody = { isDeleted: true, };
    let updatedItens = await deleteDependentService.softDeleteItens(query, updateBody);
    if (!updatedItens) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedItens });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addItens,
  bulkInsertItens,
  findAllItens,
  getItens,
  getItensCount,
  updateItens,
  bulkUpdateItens,
  partialUpdateItens,
  softDeleteItens,
  deleteItens,
  deleteManyItens,
  softDeleteManyItens    
};
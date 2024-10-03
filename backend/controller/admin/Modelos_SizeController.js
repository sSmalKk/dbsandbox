/**
 * Modelos_SizeController.js
 * @description : exports action methods for Modelos_Size.
 */

const Modelos_Size = require('../../model/Modelos_Size');
const Modelos_SizeSchemaKey = require('../../utils/validation/Modelos_SizeValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const deleteDependentService = require('../../utils/deleteDependent');
const utils = require('../../utils/common');
   
/**
 * @description : create document of Modelos_Size in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Modelos_Size. {status, message, data}
 */ 
const addModelos_Size = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      Modelos_SizeSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate = new Modelos_Size(dataToCreate);
    let createdModelos_Size = await dbService.create(Modelos_Size,dataToCreate);
    return res.success({ data : createdModelos_Size });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Modelos_Size in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Modelos_Sizes. {status, message, data}
 */
const bulkInsertModelos_Size = async (req,res)=>{
  try {
    if (req.body && (!Array.isArray(req.body.data) || req.body.data.length < 1)) {
      return res.badRequest();
    }
    let dataToCreate = [ ...req.body.data ];
    let createdModelos_Sizes = await dbService.create(Modelos_Size,dataToCreate);
    createdModelos_Sizes = { count: createdModelos_Sizes ? createdModelos_Sizes.length : 0 };
    return res.success({ data:{ count:createdModelos_Sizes.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Modelos_Size from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Modelos_Size(s). {status, message, data}
 */
const findAllModelos_Size = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Modelos_SizeSchemaKey.findFilterKeys,
      Modelos_Size.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Modelos_Size, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundModelos_Sizes = await dbService.paginate( Modelos_Size,query,options);
    if (!foundModelos_Sizes || !foundModelos_Sizes.data || !foundModelos_Sizes.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundModelos_Sizes });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Modelos_Size from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Modelos_Size. {status, message, data}
 */
const getModelos_Size = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundModelos_Size = await dbService.findOne(Modelos_Size,query, options);
    if (!foundModelos_Size){
      return res.recordNotFound();
    }
    return res.success({ data :foundModelos_Size });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Modelos_Size.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getModelos_SizeCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Modelos_SizeSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedModelos_Size = await dbService.count(Modelos_Size,where);
    return res.success({ data : { count: countedModelos_Size } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Modelos_Size with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Modelos_Size.
 * @return {Object} : updated Modelos_Size. {status, message, data}
 */
const updateModelos_Size = async (req,res) => {
  try {
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      Modelos_SizeSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedModelos_Size = await dbService.updateOne(Modelos_Size,query,dataToUpdate);
    if (!updatedModelos_Size){
      return res.recordNotFound();
    }
    return res.success({ data :updatedModelos_Size });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Modelos_Size with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Modelos_Sizes.
 * @return {Object} : updated Modelos_Sizes. {status, message, data}
 */
const bulkUpdateModelos_Size = async (req,res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = { ...req.body.data, };
    }
    let updatedModelos_Size = await dbService.updateMany(Modelos_Size,filter,dataToUpdate);
    if (!updatedModelos_Size){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedModelos_Size } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Modelos_Size with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Modelos_Size.
 * @return {obj} : updated Modelos_Size. {status, message, data}
 */
const partialUpdateModelos_Size = async (req,res) => {
  try {
    if (!req.params.id){
      res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      Modelos_SizeSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedModelos_Size = await dbService.updateOne(Modelos_Size, query, dataToUpdate);
    if (!updatedModelos_Size) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedModelos_Size });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : deactivate document of Modelos_Size from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Modelos_Size.
 * @return {Object} : deactivated Modelos_Size. {status, message, data}
 */
const softDeleteModelos_Size = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const updateBody = { isDeleted: true, };
    let updatedModelos_Size = await deleteDependentService.softDeleteModelos_Size(query, updateBody);
    if (!updatedModelos_Size){
      return res.recordNotFound();
    }
    return res.success({ data:updatedModelos_Size });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete document of Modelos_Size from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Modelos_Size. {status, message, data}
 */
const deleteModelos_Size = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    let deletedModelos_Size;
    if (req.body.isWarning) { 
      deletedModelos_Size = await deleteDependentService.countModelos_Size(query);
    } else {
      deletedModelos_Size = await deleteDependentService.deleteModelos_Size(query);
    }
    if (!deletedModelos_Size){
      return res.recordNotFound();
    }
    return res.success({ data :deletedModelos_Size });
  }
  catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete documents of Modelos_Size in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyModelos_Size = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    let deletedModelos_Size;
    if (req.body.isWarning) {
      deletedModelos_Size = await deleteDependentService.countModelos_Size(query);
    }
    else {
      deletedModelos_Size = await deleteDependentService.deleteModelos_Size(query);
    }
    if (!deletedModelos_Size){
      return res.recordNotFound();
    }
    return res.success({ data :deletedModelos_Size });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : deactivate multiple documents of Modelos_Size from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Modelos_Size.
 * @return {Object} : number of deactivated documents of Modelos_Size. {status, message, data}
 */
const softDeleteManyModelos_Size = async (req,res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const updateBody = { isDeleted: true, };
    let updatedModelos_Size = await deleteDependentService.softDeleteModelos_Size(query, updateBody);
    if (!updatedModelos_Size) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedModelos_Size });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addModelos_Size,
  bulkInsertModelos_Size,
  findAllModelos_Size,
  getModelos_Size,
  getModelos_SizeCount,
  updateModelos_Size,
  bulkUpdateModelos_Size,
  partialUpdateModelos_Size,
  softDeleteModelos_Size,
  deleteModelos_Size,
  deleteManyModelos_Size,
  softDeleteManyModelos_Size    
};
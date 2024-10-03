/**
 * Modelos_AgeController.js
 * @description : exports action methods for Modelos_Age.
 */

const Modelos_Age = require('../../model/Modelos_Age');
const Modelos_AgeSchemaKey = require('../../utils/validation/Modelos_AgeValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../utils/common');
   
/**
 * @description : create document of Modelos_Age in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Modelos_Age. {status, message, data}
 */ 
const addModelos_Age = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      Modelos_AgeSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate = new Modelos_Age(dataToCreate);
    let createdModelos_Age = await dbService.create(Modelos_Age,dataToCreate);
    return res.success({ data : createdModelos_Age });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Modelos_Age in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Modelos_Ages. {status, message, data}
 */
const bulkInsertModelos_Age = async (req,res)=>{
  try {
    if (req.body && (!Array.isArray(req.body.data) || req.body.data.length < 1)) {
      return res.badRequest();
    }
    let dataToCreate = [ ...req.body.data ];
    let createdModelos_Ages = await dbService.create(Modelos_Age,dataToCreate);
    createdModelos_Ages = { count: createdModelos_Ages ? createdModelos_Ages.length : 0 };
    return res.success({ data:{ count:createdModelos_Ages.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Modelos_Age from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Modelos_Age(s). {status, message, data}
 */
const findAllModelos_Age = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Modelos_AgeSchemaKey.findFilterKeys,
      Modelos_Age.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Modelos_Age, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundModelos_Ages = await dbService.paginate( Modelos_Age,query,options);
    if (!foundModelos_Ages || !foundModelos_Ages.data || !foundModelos_Ages.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundModelos_Ages });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Modelos_Age from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Modelos_Age. {status, message, data}
 */
const getModelos_Age = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundModelos_Age = await dbService.findOne(Modelos_Age,query, options);
    if (!foundModelos_Age){
      return res.recordNotFound();
    }
    return res.success({ data :foundModelos_Age });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Modelos_Age.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getModelos_AgeCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Modelos_AgeSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedModelos_Age = await dbService.count(Modelos_Age,where);
    return res.success({ data : { count: countedModelos_Age } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Modelos_Age with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Modelos_Age.
 * @return {Object} : updated Modelos_Age. {status, message, data}
 */
const updateModelos_Age = async (req,res) => {
  try {
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      Modelos_AgeSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedModelos_Age = await dbService.updateOne(Modelos_Age,query,dataToUpdate);
    if (!updatedModelos_Age){
      return res.recordNotFound();
    }
    return res.success({ data :updatedModelos_Age });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Modelos_Age with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Modelos_Ages.
 * @return {Object} : updated Modelos_Ages. {status, message, data}
 */
const bulkUpdateModelos_Age = async (req,res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = { ...req.body.data, };
    }
    let updatedModelos_Age = await dbService.updateMany(Modelos_Age,filter,dataToUpdate);
    if (!updatedModelos_Age){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedModelos_Age } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Modelos_Age with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Modelos_Age.
 * @return {obj} : updated Modelos_Age. {status, message, data}
 */
const partialUpdateModelos_Age = async (req,res) => {
  try {
    if (!req.params.id){
      res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      Modelos_AgeSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedModelos_Age = await dbService.updateOne(Modelos_Age, query, dataToUpdate);
    if (!updatedModelos_Age) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedModelos_Age });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Modelos_Age from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Modelos_Age.
 * @return {Object} : deactivated Modelos_Age. {status, message, data}
 */
const softDeleteModelos_Age = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = { isDeleted: true, };
    let updatedModelos_Age = await dbService.updateOne(Modelos_Age, query, updateBody);
    if (!updatedModelos_Age){
      return res.recordNotFound();
    }
    return res.success({ data:updatedModelos_Age });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Modelos_Age from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Modelos_Age. {status, message, data}
 */
const deleteModelos_Age = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedModelos_Age = await dbService.deleteOne(Modelos_Age, query);
    if (!deletedModelos_Age){
      return res.recordNotFound();
    }
    return res.success({ data :deletedModelos_Age });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Modelos_Age in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyModelos_Age = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedModelos_Age = await dbService.deleteMany(Modelos_Age,query);
    if (!deletedModelos_Age){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedModelos_Age } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Modelos_Age from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Modelos_Age.
 * @return {Object} : number of deactivated documents of Modelos_Age. {status, message, data}
 */
const softDeleteManyModelos_Age = async (req,res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const updateBody = { isDeleted: true, };
    let updatedModelos_Age = await dbService.updateMany(Modelos_Age,query, updateBody);
    if (!updatedModelos_Age) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedModelos_Age } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addModelos_Age,
  bulkInsertModelos_Age,
  findAllModelos_Age,
  getModelos_Age,
  getModelos_AgeCount,
  updateModelos_Age,
  bulkUpdateModelos_Age,
  partialUpdateModelos_Age,
  softDeleteModelos_Age,
  deleteModelos_Age,
  deleteManyModelos_Age,
  softDeleteManyModelos_Age    
};
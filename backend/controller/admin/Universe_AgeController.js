/**
 * Universe_AgeController.js
 * @description : exports action methods for Universe_Age.
 */

const Universe_Age = require('../../model/Universe_Age');
const Universe_AgeSchemaKey = require('../../utils/validation/Universe_AgeValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../utils/common');
   
/**
 * @description : create document of Universe_Age in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Universe_Age. {status, message, data}
 */ 
const addUniverse_Age = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      Universe_AgeSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate = new Universe_Age(dataToCreate);
    let createdUniverse_Age = await dbService.create(Universe_Age,dataToCreate);
    return res.success({ data : createdUniverse_Age });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Universe_Age in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Universe_Ages. {status, message, data}
 */
const bulkInsertUniverse_Age = async (req,res)=>{
  try {
    if (req.body && (!Array.isArray(req.body.data) || req.body.data.length < 1)) {
      return res.badRequest();
    }
    let dataToCreate = [ ...req.body.data ];
    let createdUniverse_Ages = await dbService.create(Universe_Age,dataToCreate);
    createdUniverse_Ages = { count: createdUniverse_Ages ? createdUniverse_Ages.length : 0 };
    return res.success({ data:{ count:createdUniverse_Ages.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Universe_Age from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Universe_Age(s). {status, message, data}
 */
const findAllUniverse_Age = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Universe_AgeSchemaKey.findFilterKeys,
      Universe_Age.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Universe_Age, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundUniverse_Ages = await dbService.paginate( Universe_Age,query,options);
    if (!foundUniverse_Ages || !foundUniverse_Ages.data || !foundUniverse_Ages.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundUniverse_Ages });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Universe_Age from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Universe_Age. {status, message, data}
 */
const getUniverse_Age = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundUniverse_Age = await dbService.findOne(Universe_Age,query, options);
    if (!foundUniverse_Age){
      return res.recordNotFound();
    }
    return res.success({ data :foundUniverse_Age });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Universe_Age.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getUniverse_AgeCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Universe_AgeSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedUniverse_Age = await dbService.count(Universe_Age,where);
    return res.success({ data : { count: countedUniverse_Age } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Universe_Age with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Universe_Age.
 * @return {Object} : updated Universe_Age. {status, message, data}
 */
const updateUniverse_Age = async (req,res) => {
  try {
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      Universe_AgeSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedUniverse_Age = await dbService.updateOne(Universe_Age,query,dataToUpdate);
    if (!updatedUniverse_Age){
      return res.recordNotFound();
    }
    return res.success({ data :updatedUniverse_Age });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Universe_Age with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Universe_Ages.
 * @return {Object} : updated Universe_Ages. {status, message, data}
 */
const bulkUpdateUniverse_Age = async (req,res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = { ...req.body.data, };
    }
    let updatedUniverse_Age = await dbService.updateMany(Universe_Age,filter,dataToUpdate);
    if (!updatedUniverse_Age){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedUniverse_Age } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Universe_Age with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Universe_Age.
 * @return {obj} : updated Universe_Age. {status, message, data}
 */
const partialUpdateUniverse_Age = async (req,res) => {
  try {
    if (!req.params.id){
      res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      Universe_AgeSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedUniverse_Age = await dbService.updateOne(Universe_Age, query, dataToUpdate);
    if (!updatedUniverse_Age) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedUniverse_Age });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Universe_Age from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Universe_Age.
 * @return {Object} : deactivated Universe_Age. {status, message, data}
 */
const softDeleteUniverse_Age = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = { isDeleted: true, };
    let updatedUniverse_Age = await dbService.updateOne(Universe_Age, query, updateBody);
    if (!updatedUniverse_Age){
      return res.recordNotFound();
    }
    return res.success({ data:updatedUniverse_Age });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Universe_Age from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Universe_Age. {status, message, data}
 */
const deleteUniverse_Age = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedUniverse_Age = await dbService.deleteOne(Universe_Age, query);
    if (!deletedUniverse_Age){
      return res.recordNotFound();
    }
    return res.success({ data :deletedUniverse_Age });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Universe_Age in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyUniverse_Age = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedUniverse_Age = await dbService.deleteMany(Universe_Age,query);
    if (!deletedUniverse_Age){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedUniverse_Age } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Universe_Age from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Universe_Age.
 * @return {Object} : number of deactivated documents of Universe_Age. {status, message, data}
 */
const softDeleteManyUniverse_Age = async (req,res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const updateBody = { isDeleted: true, };
    let updatedUniverse_Age = await dbService.updateMany(Universe_Age,query, updateBody);
    if (!updatedUniverse_Age) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedUniverse_Age } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addUniverse_Age,
  bulkInsertUniverse_Age,
  findAllUniverse_Age,
  getUniverse_Age,
  getUniverse_AgeCount,
  updateUniverse_Age,
  bulkUpdateUniverse_Age,
  partialUpdateUniverse_Age,
  softDeleteUniverse_Age,
  deleteUniverse_Age,
  deleteManyUniverse_Age,
  softDeleteManyUniverse_Age    
};
/**
 * PatternController.js
 * @description : exports action methods for Pattern.
 */

const Pattern = require('../../model/Pattern');
const PatternSchemaKey = require('../../utils/validation/PatternValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const deleteDependentService = require('../../utils/deleteDependent');
const utils = require('../../utils/common');
   
/**
 * @description : create document of Pattern in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Pattern. {status, message, data}
 */ 
const addPattern = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      PatternSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Pattern(dataToCreate);
    let createdPattern = await dbService.create(Pattern,dataToCreate);
    return res.success({ data : createdPattern });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Pattern in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Patterns. {status, message, data}
 */
const bulkInsertPattern = async (req,res)=>{
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
    let createdPatterns = await dbService.create(Pattern,dataToCreate);
    createdPatterns = { count: createdPatterns ? createdPatterns.length : 0 };
    return res.success({ data:{ count:createdPatterns.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Pattern from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Pattern(s). {status, message, data}
 */
const findAllPattern = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      PatternSchemaKey.findFilterKeys,
      Pattern.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Pattern, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundPatterns = await dbService.paginate( Pattern,query,options);
    if (!foundPatterns || !foundPatterns.data || !foundPatterns.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundPatterns });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Pattern from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Pattern. {status, message, data}
 */
const getPattern = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundPattern = await dbService.findOne(Pattern,query, options);
    if (!foundPattern){
      return res.recordNotFound();
    }
    return res.success({ data :foundPattern });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Pattern.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getPatternCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      PatternSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedPattern = await dbService.count(Pattern,where);
    return res.success({ data : { count: countedPattern } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Pattern with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Pattern.
 * @return {Object} : updated Pattern. {status, message, data}
 */
const updatePattern = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      PatternSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedPattern = await dbService.updateOne(Pattern,query,dataToUpdate);
    if (!updatedPattern){
      return res.recordNotFound();
    }
    return res.success({ data :updatedPattern });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Pattern with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Patterns.
 * @return {Object} : updated Patterns. {status, message, data}
 */
const bulkUpdatePattern = async (req,res)=>{
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
    let updatedPattern = await dbService.updateMany(Pattern,filter,dataToUpdate);
    if (!updatedPattern){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedPattern } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Pattern with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Pattern.
 * @return {obj} : updated Pattern. {status, message, data}
 */
const partialUpdatePattern = async (req,res) => {
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
      PatternSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedPattern = await dbService.updateOne(Pattern, query, dataToUpdate);
    if (!updatedPattern) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedPattern });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : deactivate document of Pattern from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Pattern.
 * @return {Object} : deactivated Pattern. {status, message, data}
 */
const softDeletePattern = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedPattern = await deleteDependentService.softDeletePattern(query, updateBody);
    if (!updatedPattern){
      return res.recordNotFound();
    }
    return res.success({ data:updatedPattern });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete document of Pattern from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Pattern. {status, message, data}
 */
const deletePattern = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    let deletedPattern;
    if (req.body.isWarning) { 
      deletedPattern = await deleteDependentService.countPattern(query);
    } else {
      deletedPattern = await deleteDependentService.deletePattern(query);
    }
    if (!deletedPattern){
      return res.recordNotFound();
    }
    return res.success({ data :deletedPattern });
  }
  catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete documents of Pattern in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyPattern = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    let deletedPattern;
    if (req.body.isWarning) {
      deletedPattern = await deleteDependentService.countPattern(query);
    }
    else {
      deletedPattern = await deleteDependentService.deletePattern(query);
    }
    if (!deletedPattern){
      return res.recordNotFound();
    }
    return res.success({ data :deletedPattern });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : deactivate multiple documents of Pattern from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Pattern.
 * @return {Object} : number of deactivated documents of Pattern. {status, message, data}
 */
const softDeleteManyPattern = async (req,res) => {
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
    let updatedPattern = await deleteDependentService.softDeletePattern(query, updateBody);
    if (!updatedPattern) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedPattern });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addPattern,
  bulkInsertPattern,
  findAllPattern,
  getPattern,
  getPatternCount,
  updatePattern,
  bulkUpdatePattern,
  partialUpdatePattern,
  softDeletePattern,
  deletePattern,
  deleteManyPattern,
  softDeleteManyPattern    
};
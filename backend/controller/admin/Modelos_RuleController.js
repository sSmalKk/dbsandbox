/**
 * Modelos_RuleController.js
 * @description : exports action methods for Modelos_Rule.
 */

const Modelos_Rule = require('../../model/Modelos_Rule');
const Modelos_RuleSchemaKey = require('../../utils/validation/Modelos_RuleValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../utils/common');
   
/**
 * @description : create document of Modelos_Rule in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Modelos_Rule. {status, message, data}
 */ 
const addModelos_Rule = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      Modelos_RuleSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Modelos_Rule(dataToCreate);
    let createdModelos_Rule = await dbService.create(Modelos_Rule,dataToCreate);
    return res.success({ data : createdModelos_Rule });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Modelos_Rule in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Modelos_Rules. {status, message, data}
 */
const bulkInsertModelos_Rule = async (req,res)=>{
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
    let createdModelos_Rules = await dbService.create(Modelos_Rule,dataToCreate);
    createdModelos_Rules = { count: createdModelos_Rules ? createdModelos_Rules.length : 0 };
    return res.success({ data:{ count:createdModelos_Rules.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Modelos_Rule from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Modelos_Rule(s). {status, message, data}
 */
const findAllModelos_Rule = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Modelos_RuleSchemaKey.findFilterKeys,
      Modelos_Rule.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Modelos_Rule, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundModelos_Rules = await dbService.paginate( Modelos_Rule,query,options);
    if (!foundModelos_Rules || !foundModelos_Rules.data || !foundModelos_Rules.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundModelos_Rules });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Modelos_Rule from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Modelos_Rule. {status, message, data}
 */
const getModelos_Rule = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundModelos_Rule = await dbService.findOne(Modelos_Rule,query, options);
    if (!foundModelos_Rule){
      return res.recordNotFound();
    }
    return res.success({ data :foundModelos_Rule });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Modelos_Rule.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getModelos_RuleCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Modelos_RuleSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedModelos_Rule = await dbService.count(Modelos_Rule,where);
    return res.success({ data : { count: countedModelos_Rule } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Modelos_Rule with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Modelos_Rule.
 * @return {Object} : updated Modelos_Rule. {status, message, data}
 */
const updateModelos_Rule = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      Modelos_RuleSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedModelos_Rule = await dbService.updateOne(Modelos_Rule,query,dataToUpdate);
    if (!updatedModelos_Rule){
      return res.recordNotFound();
    }
    return res.success({ data :updatedModelos_Rule });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Modelos_Rule with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Modelos_Rules.
 * @return {Object} : updated Modelos_Rules. {status, message, data}
 */
const bulkUpdateModelos_Rule = async (req,res)=>{
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
    let updatedModelos_Rule = await dbService.updateMany(Modelos_Rule,filter,dataToUpdate);
    if (!updatedModelos_Rule){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedModelos_Rule } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Modelos_Rule with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Modelos_Rule.
 * @return {obj} : updated Modelos_Rule. {status, message, data}
 */
const partialUpdateModelos_Rule = async (req,res) => {
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
      Modelos_RuleSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedModelos_Rule = await dbService.updateOne(Modelos_Rule, query, dataToUpdate);
    if (!updatedModelos_Rule) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedModelos_Rule });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Modelos_Rule from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Modelos_Rule.
 * @return {Object} : deactivated Modelos_Rule. {status, message, data}
 */
const softDeleteModelos_Rule = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedModelos_Rule = await dbService.updateOne(Modelos_Rule, query, updateBody);
    if (!updatedModelos_Rule){
      return res.recordNotFound();
    }
    return res.success({ data:updatedModelos_Rule });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Modelos_Rule from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Modelos_Rule. {status, message, data}
 */
const deleteModelos_Rule = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedModelos_Rule = await dbService.deleteOne(Modelos_Rule, query);
    if (!deletedModelos_Rule){
      return res.recordNotFound();
    }
    return res.success({ data :deletedModelos_Rule });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Modelos_Rule in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyModelos_Rule = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedModelos_Rule = await dbService.deleteMany(Modelos_Rule,query);
    if (!deletedModelos_Rule){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedModelos_Rule } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Modelos_Rule from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Modelos_Rule.
 * @return {Object} : number of deactivated documents of Modelos_Rule. {status, message, data}
 */
const softDeleteManyModelos_Rule = async (req,res) => {
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
    let updatedModelos_Rule = await dbService.updateMany(Modelos_Rule,query, updateBody);
    if (!updatedModelos_Rule) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedModelos_Rule } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addModelos_Rule,
  bulkInsertModelos_Rule,
  findAllModelos_Rule,
  getModelos_Rule,
  getModelos_RuleCount,
  updateModelos_Rule,
  bulkUpdateModelos_Rule,
  partialUpdateModelos_Rule,
  softDeleteModelos_Rule,
  deleteModelos_Rule,
  deleteManyModelos_Rule,
  softDeleteManyModelos_Rule    
};
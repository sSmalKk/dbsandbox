/**
 * Modelos_EntityController.js
 * @description : exports action methods for Modelos_Entity.
 */

const Modelos_Entity = require('../../../model/Modelos_Entity');
const Modelos_EntitySchemaKey = require('../../../utils/validation/Modelos_EntityValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const deleteDependentService = require('../../../utils/deleteDependent');
const utils = require('../../../utils/common');
   
/**
 * @description : create document of Modelos_Entity in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Modelos_Entity. {status, message, data}
 */ 
const addModelos_Entity = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      Modelos_EntitySchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Modelos_Entity(dataToCreate);
    let createdModelos_Entity = await dbService.create(Modelos_Entity,dataToCreate);
    return res.success({ data : createdModelos_Entity });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Modelos_Entity in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Modelos_Entitys. {status, message, data}
 */
const bulkInsertModelos_Entity = async (req,res)=>{
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
    let createdModelos_Entitys = await dbService.create(Modelos_Entity,dataToCreate);
    createdModelos_Entitys = { count: createdModelos_Entitys ? createdModelos_Entitys.length : 0 };
    return res.success({ data:{ count:createdModelos_Entitys.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Modelos_Entity from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Modelos_Entity(s). {status, message, data}
 */
const findAllModelos_Entity = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Modelos_EntitySchemaKey.findFilterKeys,
      Modelos_Entity.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Modelos_Entity, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundModelos_Entitys = await dbService.paginate( Modelos_Entity,query,options);
    if (!foundModelos_Entitys || !foundModelos_Entitys.data || !foundModelos_Entitys.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundModelos_Entitys });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Modelos_Entity from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Modelos_Entity. {status, message, data}
 */
const getModelos_Entity = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundModelos_Entity = await dbService.findOne(Modelos_Entity,query, options);
    if (!foundModelos_Entity){
      return res.recordNotFound();
    }
    return res.success({ data :foundModelos_Entity });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Modelos_Entity.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getModelos_EntityCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Modelos_EntitySchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedModelos_Entity = await dbService.count(Modelos_Entity,where);
    return res.success({ data : { count: countedModelos_Entity } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Modelos_Entity with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Modelos_Entity.
 * @return {Object} : updated Modelos_Entity. {status, message, data}
 */
const updateModelos_Entity = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      Modelos_EntitySchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedModelos_Entity = await dbService.updateOne(Modelos_Entity,query,dataToUpdate);
    if (!updatedModelos_Entity){
      return res.recordNotFound();
    }
    return res.success({ data :updatedModelos_Entity });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Modelos_Entity with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Modelos_Entitys.
 * @return {Object} : updated Modelos_Entitys. {status, message, data}
 */
const bulkUpdateModelos_Entity = async (req,res)=>{
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
    let updatedModelos_Entity = await dbService.updateMany(Modelos_Entity,filter,dataToUpdate);
    if (!updatedModelos_Entity){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedModelos_Entity } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Modelos_Entity with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Modelos_Entity.
 * @return {obj} : updated Modelos_Entity. {status, message, data}
 */
const partialUpdateModelos_Entity = async (req,res) => {
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
      Modelos_EntitySchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedModelos_Entity = await dbService.updateOne(Modelos_Entity, query, dataToUpdate);
    if (!updatedModelos_Entity) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedModelos_Entity });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : deactivate document of Modelos_Entity from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Modelos_Entity.
 * @return {Object} : deactivated Modelos_Entity. {status, message, data}
 */
const softDeleteModelos_Entity = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedModelos_Entity = await deleteDependentService.softDeleteModelos_Entity(query, updateBody);
    if (!updatedModelos_Entity){
      return res.recordNotFound();
    }
    return res.success({ data:updatedModelos_Entity });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete document of Modelos_Entity from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Modelos_Entity. {status, message, data}
 */
const deleteModelos_Entity = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    let deletedModelos_Entity;
    if (req.body.isWarning) { 
      deletedModelos_Entity = await deleteDependentService.countModelos_Entity(query);
    } else {
      deletedModelos_Entity = await deleteDependentService.deleteModelos_Entity(query);
    }
    if (!deletedModelos_Entity){
      return res.recordNotFound();
    }
    return res.success({ data :deletedModelos_Entity });
  }
  catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete documents of Modelos_Entity in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyModelos_Entity = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    let deletedModelos_Entity;
    if (req.body.isWarning) {
      deletedModelos_Entity = await deleteDependentService.countModelos_Entity(query);
    }
    else {
      deletedModelos_Entity = await deleteDependentService.deleteModelos_Entity(query);
    }
    if (!deletedModelos_Entity){
      return res.recordNotFound();
    }
    return res.success({ data :deletedModelos_Entity });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : deactivate multiple documents of Modelos_Entity from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Modelos_Entity.
 * @return {Object} : number of deactivated documents of Modelos_Entity. {status, message, data}
 */
const softDeleteManyModelos_Entity = async (req,res) => {
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
    let updatedModelos_Entity = await deleteDependentService.softDeleteModelos_Entity(query, updateBody);
    if (!updatedModelos_Entity) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedModelos_Entity });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addModelos_Entity,
  bulkInsertModelos_Entity,
  findAllModelos_Entity,
  getModelos_Entity,
  getModelos_EntityCount,
  updateModelos_Entity,
  bulkUpdateModelos_Entity,
  partialUpdateModelos_Entity,
  softDeleteModelos_Entity,
  deleteModelos_Entity,
  deleteManyModelos_Entity,
  softDeleteManyModelos_Entity    
};
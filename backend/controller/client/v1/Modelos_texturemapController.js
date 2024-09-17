/**
 * Modelos_texturemapController.js
 * @description : exports action methods for Modelos_texturemap.
 */

const Modelos_texturemap = require('../../../model/Modelos_texturemap');
const Modelos_texturemapSchemaKey = require('../../../utils/validation/Modelos_texturemapValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const deleteDependentService = require('../../../utils/deleteDependent');
const utils = require('../../../utils/common');
   
/**
 * @description : create document of Modelos_texturemap in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Modelos_texturemap. {status, message, data}
 */ 
const addModelos_texturemap = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      Modelos_texturemapSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Modelos_texturemap(dataToCreate);
    let createdModelos_texturemap = await dbService.create(Modelos_texturemap,dataToCreate);
    return res.success({ data : createdModelos_texturemap });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Modelos_texturemap in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Modelos_texturemaps. {status, message, data}
 */
const bulkInsertModelos_texturemap = async (req,res)=>{
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
    let createdModelos_texturemaps = await dbService.create(Modelos_texturemap,dataToCreate);
    createdModelos_texturemaps = { count: createdModelos_texturemaps ? createdModelos_texturemaps.length : 0 };
    return res.success({ data:{ count:createdModelos_texturemaps.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Modelos_texturemap from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Modelos_texturemap(s). {status, message, data}
 */
const findAllModelos_texturemap = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Modelos_texturemapSchemaKey.findFilterKeys,
      Modelos_texturemap.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Modelos_texturemap, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundModelos_texturemaps = await dbService.paginate( Modelos_texturemap,query,options);
    if (!foundModelos_texturemaps || !foundModelos_texturemaps.data || !foundModelos_texturemaps.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundModelos_texturemaps });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Modelos_texturemap from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Modelos_texturemap. {status, message, data}
 */
const getModelos_texturemap = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundModelos_texturemap = await dbService.findOne(Modelos_texturemap,query, options);
    if (!foundModelos_texturemap){
      return res.recordNotFound();
    }
    return res.success({ data :foundModelos_texturemap });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Modelos_texturemap.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getModelos_texturemapCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Modelos_texturemapSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedModelos_texturemap = await dbService.count(Modelos_texturemap,where);
    return res.success({ data : { count: countedModelos_texturemap } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Modelos_texturemap with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Modelos_texturemap.
 * @return {Object} : updated Modelos_texturemap. {status, message, data}
 */
const updateModelos_texturemap = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      Modelos_texturemapSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedModelos_texturemap = await dbService.updateOne(Modelos_texturemap,query,dataToUpdate);
    if (!updatedModelos_texturemap){
      return res.recordNotFound();
    }
    return res.success({ data :updatedModelos_texturemap });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Modelos_texturemap with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Modelos_texturemaps.
 * @return {Object} : updated Modelos_texturemaps. {status, message, data}
 */
const bulkUpdateModelos_texturemap = async (req,res)=>{
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
    let updatedModelos_texturemap = await dbService.updateMany(Modelos_texturemap,filter,dataToUpdate);
    if (!updatedModelos_texturemap){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedModelos_texturemap } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Modelos_texturemap with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Modelos_texturemap.
 * @return {obj} : updated Modelos_texturemap. {status, message, data}
 */
const partialUpdateModelos_texturemap = async (req,res) => {
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
      Modelos_texturemapSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedModelos_texturemap = await dbService.updateOne(Modelos_texturemap, query, dataToUpdate);
    if (!updatedModelos_texturemap) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedModelos_texturemap });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : deactivate document of Modelos_texturemap from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Modelos_texturemap.
 * @return {Object} : deactivated Modelos_texturemap. {status, message, data}
 */
const softDeleteModelos_texturemap = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedModelos_texturemap = await deleteDependentService.softDeleteModelos_texturemap(query, updateBody);
    if (!updatedModelos_texturemap){
      return res.recordNotFound();
    }
    return res.success({ data:updatedModelos_texturemap });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete document of Modelos_texturemap from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Modelos_texturemap. {status, message, data}
 */
const deleteModelos_texturemap = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    let deletedModelos_texturemap;
    if (req.body.isWarning) { 
      deletedModelos_texturemap = await deleteDependentService.countModelos_texturemap(query);
    } else {
      deletedModelos_texturemap = await deleteDependentService.deleteModelos_texturemap(query);
    }
    if (!deletedModelos_texturemap){
      return res.recordNotFound();
    }
    return res.success({ data :deletedModelos_texturemap });
  }
  catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete documents of Modelos_texturemap in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyModelos_texturemap = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    let deletedModelos_texturemap;
    if (req.body.isWarning) {
      deletedModelos_texturemap = await deleteDependentService.countModelos_texturemap(query);
    }
    else {
      deletedModelos_texturemap = await deleteDependentService.deleteModelos_texturemap(query);
    }
    if (!deletedModelos_texturemap){
      return res.recordNotFound();
    }
    return res.success({ data :deletedModelos_texturemap });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : deactivate multiple documents of Modelos_texturemap from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Modelos_texturemap.
 * @return {Object} : number of deactivated documents of Modelos_texturemap. {status, message, data}
 */
const softDeleteManyModelos_texturemap = async (req,res) => {
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
    let updatedModelos_texturemap = await deleteDependentService.softDeleteModelos_texturemap(query, updateBody);
    if (!updatedModelos_texturemap) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedModelos_texturemap });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addModelos_texturemap,
  bulkInsertModelos_texturemap,
  findAllModelos_texturemap,
  getModelos_texturemap,
  getModelos_texturemapCount,
  updateModelos_texturemap,
  bulkUpdateModelos_texturemap,
  partialUpdateModelos_texturemap,
  softDeleteModelos_texturemap,
  deleteModelos_texturemap,
  deleteManyModelos_texturemap,
  softDeleteManyModelos_texturemap    
};
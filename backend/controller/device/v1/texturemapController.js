/**
 * texturemapController.js
 * @description : exports action methods for texturemap.
 */

const Texturemap = require('../../../model/texturemap');
const texturemapSchemaKey = require('../../../utils/validation/texturemapValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const deleteDependentService = require('../../../utils/deleteDependent');
const utils = require('../../../utils/common');
   
/**
 * @description : create document of Texturemap in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Texturemap. {status, message, data}
 */ 
const addTexturemap = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      texturemapSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Texturemap(dataToCreate);
    let createdTexturemap = await dbService.create(Texturemap,dataToCreate);
    return res.success({ data : createdTexturemap });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Texturemap in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Texturemaps. {status, message, data}
 */
const bulkInsertTexturemap = async (req,res)=>{
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
    let createdTexturemaps = await dbService.create(Texturemap,dataToCreate);
    createdTexturemaps = { count: createdTexturemaps ? createdTexturemaps.length : 0 };
    return res.success({ data:{ count:createdTexturemaps.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Texturemap from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Texturemap(s). {status, message, data}
 */
const findAllTexturemap = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      texturemapSchemaKey.findFilterKeys,
      Texturemap.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Texturemap, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundTexturemaps = await dbService.paginate( Texturemap,query,options);
    if (!foundTexturemaps || !foundTexturemaps.data || !foundTexturemaps.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundTexturemaps });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Texturemap from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Texturemap. {status, message, data}
 */
const getTexturemap = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundTexturemap = await dbService.findOne(Texturemap,query, options);
    if (!foundTexturemap){
      return res.recordNotFound();
    }
    return res.success({ data :foundTexturemap });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Texturemap.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getTexturemapCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      texturemapSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedTexturemap = await dbService.count(Texturemap,where);
    return res.success({ data : { count: countedTexturemap } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Texturemap with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Texturemap.
 * @return {Object} : updated Texturemap. {status, message, data}
 */
const updateTexturemap = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      texturemapSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedTexturemap = await dbService.updateOne(Texturemap,query,dataToUpdate);
    if (!updatedTexturemap){
      return res.recordNotFound();
    }
    return res.success({ data :updatedTexturemap });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Texturemap with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Texturemaps.
 * @return {Object} : updated Texturemaps. {status, message, data}
 */
const bulkUpdateTexturemap = async (req,res)=>{
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
    let updatedTexturemap = await dbService.updateMany(Texturemap,filter,dataToUpdate);
    if (!updatedTexturemap){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedTexturemap } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Texturemap with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Texturemap.
 * @return {obj} : updated Texturemap. {status, message, data}
 */
const partialUpdateTexturemap = async (req,res) => {
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
      texturemapSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedTexturemap = await dbService.updateOne(Texturemap, query, dataToUpdate);
    if (!updatedTexturemap) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedTexturemap });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : deactivate document of Texturemap from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Texturemap.
 * @return {Object} : deactivated Texturemap. {status, message, data}
 */
const softDeleteTexturemap = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedTexturemap = await deleteDependentService.softDeleteTexturemap(query, updateBody);
    if (!updatedTexturemap){
      return res.recordNotFound();
    }
    return res.success({ data:updatedTexturemap });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete document of Texturemap from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Texturemap. {status, message, data}
 */
const deleteTexturemap = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    let deletedTexturemap;
    if (req.body.isWarning) { 
      deletedTexturemap = await deleteDependentService.countTexturemap(query);
    } else {
      deletedTexturemap = await deleteDependentService.deleteTexturemap(query);
    }
    if (!deletedTexturemap){
      return res.recordNotFound();
    }
    return res.success({ data :deletedTexturemap });
  }
  catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete documents of Texturemap in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyTexturemap = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    let deletedTexturemap;
    if (req.body.isWarning) {
      deletedTexturemap = await deleteDependentService.countTexturemap(query);
    }
    else {
      deletedTexturemap = await deleteDependentService.deleteTexturemap(query);
    }
    if (!deletedTexturemap){
      return res.recordNotFound();
    }
    return res.success({ data :deletedTexturemap });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : deactivate multiple documents of Texturemap from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Texturemap.
 * @return {Object} : number of deactivated documents of Texturemap. {status, message, data}
 */
const softDeleteManyTexturemap = async (req,res) => {
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
    let updatedTexturemap = await deleteDependentService.softDeleteTexturemap(query, updateBody);
    if (!updatedTexturemap) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedTexturemap });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addTexturemap,
  bulkInsertTexturemap,
  findAllTexturemap,
  getTexturemap,
  getTexturemapCount,
  updateTexturemap,
  bulkUpdateTexturemap,
  partialUpdateTexturemap,
  softDeleteTexturemap,
  deleteTexturemap,
  deleteManyTexturemap,
  softDeleteManyTexturemap    
};
/**
 * Modelos_TextureMapController.js
 * @description : exports action methods for Modelos_TextureMap.
 */

const Modelos_TextureMap = require('../../../model/Modelos_TextureMap');
const Modelos_TextureMapSchemaKey = require('../../../utils/validation/Modelos_TextureMapValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const deleteDependentService = require('../../../utils/deleteDependent');
const utils = require('../../../utils/common');
   
/**
 * @description : create document of Modelos_TextureMap in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Modelos_TextureMap. {status, message, data}
 */ 
const addModelos_TextureMap = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      Modelos_TextureMapSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Modelos_TextureMap(dataToCreate);
    let createdModelos_TextureMap = await dbService.create(Modelos_TextureMap,dataToCreate);
    return res.success({ data : createdModelos_TextureMap });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Modelos_TextureMap in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Modelos_TextureMaps. {status, message, data}
 */
const bulkInsertModelos_TextureMap = async (req,res)=>{
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
    let createdModelos_TextureMaps = await dbService.create(Modelos_TextureMap,dataToCreate);
    createdModelos_TextureMaps = { count: createdModelos_TextureMaps ? createdModelos_TextureMaps.length : 0 };
    return res.success({ data:{ count:createdModelos_TextureMaps.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Modelos_TextureMap from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Modelos_TextureMap(s). {status, message, data}
 */
const findAllModelos_TextureMap = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Modelos_TextureMapSchemaKey.findFilterKeys,
      Modelos_TextureMap.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Modelos_TextureMap, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundModelos_TextureMaps = await dbService.paginate( Modelos_TextureMap,query,options);
    if (!foundModelos_TextureMaps || !foundModelos_TextureMaps.data || !foundModelos_TextureMaps.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundModelos_TextureMaps });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Modelos_TextureMap from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Modelos_TextureMap. {status, message, data}
 */
const getModelos_TextureMap = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundModelos_TextureMap = await dbService.findOne(Modelos_TextureMap,query, options);
    if (!foundModelos_TextureMap){
      return res.recordNotFound();
    }
    return res.success({ data :foundModelos_TextureMap });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Modelos_TextureMap.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getModelos_TextureMapCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Modelos_TextureMapSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedModelos_TextureMap = await dbService.count(Modelos_TextureMap,where);
    return res.success({ data : { count: countedModelos_TextureMap } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Modelos_TextureMap with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Modelos_TextureMap.
 * @return {Object} : updated Modelos_TextureMap. {status, message, data}
 */
const updateModelos_TextureMap = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      Modelos_TextureMapSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedModelos_TextureMap = await dbService.updateOne(Modelos_TextureMap,query,dataToUpdate);
    if (!updatedModelos_TextureMap){
      return res.recordNotFound();
    }
    return res.success({ data :updatedModelos_TextureMap });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Modelos_TextureMap with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Modelos_TextureMaps.
 * @return {Object} : updated Modelos_TextureMaps. {status, message, data}
 */
const bulkUpdateModelos_TextureMap = async (req,res)=>{
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
    let updatedModelos_TextureMap = await dbService.updateMany(Modelos_TextureMap,filter,dataToUpdate);
    if (!updatedModelos_TextureMap){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedModelos_TextureMap } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Modelos_TextureMap with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Modelos_TextureMap.
 * @return {obj} : updated Modelos_TextureMap. {status, message, data}
 */
const partialUpdateModelos_TextureMap = async (req,res) => {
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
      Modelos_TextureMapSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedModelos_TextureMap = await dbService.updateOne(Modelos_TextureMap, query, dataToUpdate);
    if (!updatedModelos_TextureMap) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedModelos_TextureMap });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : deactivate document of Modelos_TextureMap from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Modelos_TextureMap.
 * @return {Object} : deactivated Modelos_TextureMap. {status, message, data}
 */
const softDeleteModelos_TextureMap = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedModelos_TextureMap = await deleteDependentService.softDeleteModelos_TextureMap(query, updateBody);
    if (!updatedModelos_TextureMap){
      return res.recordNotFound();
    }
    return res.success({ data:updatedModelos_TextureMap });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete document of Modelos_TextureMap from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Modelos_TextureMap. {status, message, data}
 */
const deleteModelos_TextureMap = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    let deletedModelos_TextureMap;
    if (req.body.isWarning) { 
      deletedModelos_TextureMap = await deleteDependentService.countModelos_TextureMap(query);
    } else {
      deletedModelos_TextureMap = await deleteDependentService.deleteModelos_TextureMap(query);
    }
    if (!deletedModelos_TextureMap){
      return res.recordNotFound();
    }
    return res.success({ data :deletedModelos_TextureMap });
  }
  catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete documents of Modelos_TextureMap in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyModelos_TextureMap = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    let deletedModelos_TextureMap;
    if (req.body.isWarning) {
      deletedModelos_TextureMap = await deleteDependentService.countModelos_TextureMap(query);
    }
    else {
      deletedModelos_TextureMap = await deleteDependentService.deleteModelos_TextureMap(query);
    }
    if (!deletedModelos_TextureMap){
      return res.recordNotFound();
    }
    return res.success({ data :deletedModelos_TextureMap });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : deactivate multiple documents of Modelos_TextureMap from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Modelos_TextureMap.
 * @return {Object} : number of deactivated documents of Modelos_TextureMap. {status, message, data}
 */
const softDeleteManyModelos_TextureMap = async (req,res) => {
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
    let updatedModelos_TextureMap = await deleteDependentService.softDeleteModelos_TextureMap(query, updateBody);
    if (!updatedModelos_TextureMap) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedModelos_TextureMap });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addModelos_TextureMap,
  bulkInsertModelos_TextureMap,
  findAllModelos_TextureMap,
  getModelos_TextureMap,
  getModelos_TextureMapCount,
  updateModelos_TextureMap,
  bulkUpdateModelos_TextureMap,
  partialUpdateModelos_TextureMap,
  softDeleteModelos_TextureMap,
  deleteModelos_TextureMap,
  deleteManyModelos_TextureMap,
  softDeleteManyModelos_TextureMap    
};
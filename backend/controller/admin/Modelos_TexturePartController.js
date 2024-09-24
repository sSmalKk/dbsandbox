/**
 * Modelos_TexturePartController.js
 * @description : exports action methods for Modelos_TexturePart.
 */

const Modelos_TexturePart = require('../../model/Modelos_TexturePart');
const Modelos_TexturePartSchemaKey = require('../../utils/validation/Modelos_TexturePartValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../utils/common');
   
/**
 * @description : create document of Modelos_TexturePart in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Modelos_TexturePart. {status, message, data}
 */ 
const addModelos_TexturePart = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      Modelos_TexturePartSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate = new Modelos_TexturePart(dataToCreate);
    let createdModelos_TexturePart = await dbService.create(Modelos_TexturePart,dataToCreate);
    return res.success({ data : createdModelos_TexturePart });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Modelos_TexturePart in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Modelos_TextureParts. {status, message, data}
 */
const bulkInsertModelos_TexturePart = async (req,res)=>{
  try {
    if (req.body && (!Array.isArray(req.body.data) || req.body.data.length < 1)) {
      return res.badRequest();
    }
    let dataToCreate = [ ...req.body.data ];
    let createdModelos_TextureParts = await dbService.create(Modelos_TexturePart,dataToCreate);
    createdModelos_TextureParts = { count: createdModelos_TextureParts ? createdModelos_TextureParts.length : 0 };
    return res.success({ data:{ count:createdModelos_TextureParts.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Modelos_TexturePart from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Modelos_TexturePart(s). {status, message, data}
 */
const findAllModelos_TexturePart = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Modelos_TexturePartSchemaKey.findFilterKeys,
      Modelos_TexturePart.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Modelos_TexturePart, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundModelos_TextureParts = await dbService.paginate( Modelos_TexturePart,query,options);
    if (!foundModelos_TextureParts || !foundModelos_TextureParts.data || !foundModelos_TextureParts.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundModelos_TextureParts });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Modelos_TexturePart from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Modelos_TexturePart. {status, message, data}
 */
const getModelos_TexturePart = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundModelos_TexturePart = await dbService.findOne(Modelos_TexturePart,query, options);
    if (!foundModelos_TexturePart){
      return res.recordNotFound();
    }
    return res.success({ data :foundModelos_TexturePart });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Modelos_TexturePart.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getModelos_TexturePartCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Modelos_TexturePartSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedModelos_TexturePart = await dbService.count(Modelos_TexturePart,where);
    return res.success({ data : { count: countedModelos_TexturePart } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Modelos_TexturePart with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Modelos_TexturePart.
 * @return {Object} : updated Modelos_TexturePart. {status, message, data}
 */
const updateModelos_TexturePart = async (req,res) => {
  try {
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      Modelos_TexturePartSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedModelos_TexturePart = await dbService.updateOne(Modelos_TexturePart,query,dataToUpdate);
    if (!updatedModelos_TexturePart){
      return res.recordNotFound();
    }
    return res.success({ data :updatedModelos_TexturePart });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Modelos_TexturePart with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Modelos_TextureParts.
 * @return {Object} : updated Modelos_TextureParts. {status, message, data}
 */
const bulkUpdateModelos_TexturePart = async (req,res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = { ...req.body.data, };
    }
    let updatedModelos_TexturePart = await dbService.updateMany(Modelos_TexturePart,filter,dataToUpdate);
    if (!updatedModelos_TexturePart){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedModelos_TexturePart } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Modelos_TexturePart with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Modelos_TexturePart.
 * @return {obj} : updated Modelos_TexturePart. {status, message, data}
 */
const partialUpdateModelos_TexturePart = async (req,res) => {
  try {
    if (!req.params.id){
      res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      Modelos_TexturePartSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedModelos_TexturePart = await dbService.updateOne(Modelos_TexturePart, query, dataToUpdate);
    if (!updatedModelos_TexturePart) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedModelos_TexturePart });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Modelos_TexturePart from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Modelos_TexturePart.
 * @return {Object} : deactivated Modelos_TexturePart. {status, message, data}
 */
const softDeleteModelos_TexturePart = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = { isDeleted: true, };
    let updatedModelos_TexturePart = await dbService.updateOne(Modelos_TexturePart, query, updateBody);
    if (!updatedModelos_TexturePart){
      return res.recordNotFound();
    }
    return res.success({ data:updatedModelos_TexturePart });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Modelos_TexturePart from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Modelos_TexturePart. {status, message, data}
 */
const deleteModelos_TexturePart = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedModelos_TexturePart = await dbService.deleteOne(Modelos_TexturePart, query);
    if (!deletedModelos_TexturePart){
      return res.recordNotFound();
    }
    return res.success({ data :deletedModelos_TexturePart });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Modelos_TexturePart in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyModelos_TexturePart = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedModelos_TexturePart = await dbService.deleteMany(Modelos_TexturePart,query);
    if (!deletedModelos_TexturePart){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedModelos_TexturePart } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Modelos_TexturePart from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Modelos_TexturePart.
 * @return {Object} : number of deactivated documents of Modelos_TexturePart. {status, message, data}
 */
const softDeleteManyModelos_TexturePart = async (req,res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const updateBody = { isDeleted: true, };
    let updatedModelos_TexturePart = await dbService.updateMany(Modelos_TexturePart,query, updateBody);
    if (!updatedModelos_TexturePart) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedModelos_TexturePart } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addModelos_TexturePart,
  bulkInsertModelos_TexturePart,
  findAllModelos_TexturePart,
  getModelos_TexturePart,
  getModelos_TexturePartCount,
  updateModelos_TexturePart,
  bulkUpdateModelos_TexturePart,
  partialUpdateModelos_TexturePart,
  softDeleteModelos_TexturePart,
  deleteModelos_TexturePart,
  deleteManyModelos_TexturePart,
  softDeleteManyModelos_TexturePart    
};
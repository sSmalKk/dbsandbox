/**
 * Modelos_TextureController.js
 * @description : exports action methods for Modelos_Texture.
 */

const Modelos_Texture = require('../../model/Modelos_Texture');
const Modelos_TextureSchemaKey = require('../../utils/validation/Modelos_TextureValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../utils/common');
   
/**
 * @description : create document of Modelos_Texture in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Modelos_Texture. {status, message, data}
 */ 
const addModelos_Texture = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      Modelos_TextureSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Modelos_Texture(dataToCreate);
    let createdModelos_Texture = await dbService.create(Modelos_Texture,dataToCreate);
    return res.success({ data : createdModelos_Texture });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Modelos_Texture in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Modelos_Textures. {status, message, data}
 */
const bulkInsertModelos_Texture = async (req,res)=>{
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
    let createdModelos_Textures = await dbService.create(Modelos_Texture,dataToCreate);
    createdModelos_Textures = { count: createdModelos_Textures ? createdModelos_Textures.length : 0 };
    return res.success({ data:{ count:createdModelos_Textures.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Modelos_Texture from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Modelos_Texture(s). {status, message, data}
 */
const findAllModelos_Texture = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Modelos_TextureSchemaKey.findFilterKeys,
      Modelos_Texture.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Modelos_Texture, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundModelos_Textures = await dbService.paginate( Modelos_Texture,query,options);
    if (!foundModelos_Textures || !foundModelos_Textures.data || !foundModelos_Textures.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundModelos_Textures });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Modelos_Texture from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Modelos_Texture. {status, message, data}
 */
const getModelos_Texture = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundModelos_Texture = await dbService.findOne(Modelos_Texture,query, options);
    if (!foundModelos_Texture){
      return res.recordNotFound();
    }
    return res.success({ data :foundModelos_Texture });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Modelos_Texture.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getModelos_TextureCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Modelos_TextureSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedModelos_Texture = await dbService.count(Modelos_Texture,where);
    return res.success({ data : { count: countedModelos_Texture } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Modelos_Texture with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Modelos_Texture.
 * @return {Object} : updated Modelos_Texture. {status, message, data}
 */
const updateModelos_Texture = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      Modelos_TextureSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedModelos_Texture = await dbService.updateOne(Modelos_Texture,query,dataToUpdate);
    if (!updatedModelos_Texture){
      return res.recordNotFound();
    }
    return res.success({ data :updatedModelos_Texture });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Modelos_Texture with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Modelos_Textures.
 * @return {Object} : updated Modelos_Textures. {status, message, data}
 */
const bulkUpdateModelos_Texture = async (req,res)=>{
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
    let updatedModelos_Texture = await dbService.updateMany(Modelos_Texture,filter,dataToUpdate);
    if (!updatedModelos_Texture){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedModelos_Texture } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Modelos_Texture with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Modelos_Texture.
 * @return {obj} : updated Modelos_Texture. {status, message, data}
 */
const partialUpdateModelos_Texture = async (req,res) => {
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
      Modelos_TextureSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedModelos_Texture = await dbService.updateOne(Modelos_Texture, query, dataToUpdate);
    if (!updatedModelos_Texture) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedModelos_Texture });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Modelos_Texture from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Modelos_Texture.
 * @return {Object} : deactivated Modelos_Texture. {status, message, data}
 */
const softDeleteModelos_Texture = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedModelos_Texture = await dbService.updateOne(Modelos_Texture, query, updateBody);
    if (!updatedModelos_Texture){
      return res.recordNotFound();
    }
    return res.success({ data:updatedModelos_Texture });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Modelos_Texture from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Modelos_Texture. {status, message, data}
 */
const deleteModelos_Texture = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedModelos_Texture = await dbService.deleteOne(Modelos_Texture, query);
    if (!deletedModelos_Texture){
      return res.recordNotFound();
    }
    return res.success({ data :deletedModelos_Texture });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Modelos_Texture in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyModelos_Texture = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedModelos_Texture = await dbService.deleteMany(Modelos_Texture,query);
    if (!deletedModelos_Texture){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedModelos_Texture } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Modelos_Texture from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Modelos_Texture.
 * @return {Object} : number of deactivated documents of Modelos_Texture. {status, message, data}
 */
const softDeleteManyModelos_Texture = async (req,res) => {
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
    let updatedModelos_Texture = await dbService.updateMany(Modelos_Texture,query, updateBody);
    if (!updatedModelos_Texture) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedModelos_Texture } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addModelos_Texture,
  bulkInsertModelos_Texture,
  findAllModelos_Texture,
  getModelos_Texture,
  getModelos_TextureCount,
  updateModelos_Texture,
  bulkUpdateModelos_Texture,
  partialUpdateModelos_Texture,
  softDeleteModelos_Texture,
  deleteModelos_Texture,
  deleteManyModelos_Texture,
  softDeleteManyModelos_Texture    
};
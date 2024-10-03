/**
 * Modelos_TagController.js
 * @description : exports action methods for Modelos_Tag.
 */

const Modelos_Tag = require('../../../model/Modelos_Tag');
const Modelos_TagSchemaKey = require('../../../utils/validation/Modelos_TagValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../../utils/common');
   
/**
 * @description : create document of Modelos_Tag in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Modelos_Tag. {status, message, data}
 */ 
const addModelos_Tag = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      Modelos_TagSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Modelos_Tag(dataToCreate);
    let createdModelos_Tag = await dbService.create(Modelos_Tag,dataToCreate);
    return res.success({ data : createdModelos_Tag });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Modelos_Tag in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Modelos_Tags. {status, message, data}
 */
const bulkInsertModelos_Tag = async (req,res)=>{
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
    let createdModelos_Tags = await dbService.create(Modelos_Tag,dataToCreate);
    createdModelos_Tags = { count: createdModelos_Tags ? createdModelos_Tags.length : 0 };
    return res.success({ data:{ count:createdModelos_Tags.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Modelos_Tag from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Modelos_Tag(s). {status, message, data}
 */
const findAllModelos_Tag = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Modelos_TagSchemaKey.findFilterKeys,
      Modelos_Tag.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Modelos_Tag, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundModelos_Tags = await dbService.paginate( Modelos_Tag,query,options);
    if (!foundModelos_Tags || !foundModelos_Tags.data || !foundModelos_Tags.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundModelos_Tags });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Modelos_Tag from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Modelos_Tag. {status, message, data}
 */
const getModelos_Tag = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundModelos_Tag = await dbService.findOne(Modelos_Tag,query, options);
    if (!foundModelos_Tag){
      return res.recordNotFound();
    }
    return res.success({ data :foundModelos_Tag });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Modelos_Tag.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getModelos_TagCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Modelos_TagSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedModelos_Tag = await dbService.count(Modelos_Tag,where);
    return res.success({ data : { count: countedModelos_Tag } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Modelos_Tag with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Modelos_Tag.
 * @return {Object} : updated Modelos_Tag. {status, message, data}
 */
const updateModelos_Tag = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      Modelos_TagSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedModelos_Tag = await dbService.updateOne(Modelos_Tag,query,dataToUpdate);
    if (!updatedModelos_Tag){
      return res.recordNotFound();
    }
    return res.success({ data :updatedModelos_Tag });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Modelos_Tag with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Modelos_Tags.
 * @return {Object} : updated Modelos_Tags. {status, message, data}
 */
const bulkUpdateModelos_Tag = async (req,res)=>{
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
    let updatedModelos_Tag = await dbService.updateMany(Modelos_Tag,filter,dataToUpdate);
    if (!updatedModelos_Tag){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedModelos_Tag } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Modelos_Tag with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Modelos_Tag.
 * @return {obj} : updated Modelos_Tag. {status, message, data}
 */
const partialUpdateModelos_Tag = async (req,res) => {
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
      Modelos_TagSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedModelos_Tag = await dbService.updateOne(Modelos_Tag, query, dataToUpdate);
    if (!updatedModelos_Tag) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedModelos_Tag });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Modelos_Tag from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Modelos_Tag.
 * @return {Object} : deactivated Modelos_Tag. {status, message, data}
 */
const softDeleteModelos_Tag = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedModelos_Tag = await dbService.updateOne(Modelos_Tag, query, updateBody);
    if (!updatedModelos_Tag){
      return res.recordNotFound();
    }
    return res.success({ data:updatedModelos_Tag });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Modelos_Tag from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Modelos_Tag. {status, message, data}
 */
const deleteModelos_Tag = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedModelos_Tag = await dbService.deleteOne(Modelos_Tag, query);
    if (!deletedModelos_Tag){
      return res.recordNotFound();
    }
    return res.success({ data :deletedModelos_Tag });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Modelos_Tag in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyModelos_Tag = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedModelos_Tag = await dbService.deleteMany(Modelos_Tag,query);
    if (!deletedModelos_Tag){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedModelos_Tag } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Modelos_Tag from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Modelos_Tag.
 * @return {Object} : number of deactivated documents of Modelos_Tag. {status, message, data}
 */
const softDeleteManyModelos_Tag = async (req,res) => {
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
    let updatedModelos_Tag = await dbService.updateMany(Modelos_Tag,query, updateBody);
    if (!updatedModelos_Tag) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedModelos_Tag } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addModelos_Tag,
  bulkInsertModelos_Tag,
  findAllModelos_Tag,
  getModelos_Tag,
  getModelos_TagCount,
  updateModelos_Tag,
  bulkUpdateModelos_Tag,
  partialUpdateModelos_Tag,
  softDeleteModelos_Tag,
  deleteModelos_Tag,
  deleteManyModelos_Tag,
  softDeleteManyModelos_Tag    
};
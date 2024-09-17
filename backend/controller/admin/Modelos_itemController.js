/**
 * Modelos_itemController.js
 * @description : exports action methods for Modelos_item.
 */

const Modelos_item = require('../../model/Modelos_item');
const Modelos_itemSchemaKey = require('../../utils/validation/Modelos_itemValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../utils/common');
   
/**
 * @description : create document of Modelos_item in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Modelos_item. {status, message, data}
 */ 
const addModelos_item = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      Modelos_itemSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Modelos_item(dataToCreate);
    let createdModelos_item = await dbService.create(Modelos_item,dataToCreate);
    return res.success({ data : createdModelos_item });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Modelos_item in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Modelos_items. {status, message, data}
 */
const bulkInsertModelos_item = async (req,res)=>{
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
    let createdModelos_items = await dbService.create(Modelos_item,dataToCreate);
    createdModelos_items = { count: createdModelos_items ? createdModelos_items.length : 0 };
    return res.success({ data:{ count:createdModelos_items.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Modelos_item from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Modelos_item(s). {status, message, data}
 */
const findAllModelos_item = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Modelos_itemSchemaKey.findFilterKeys,
      Modelos_item.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Modelos_item, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundModelos_items = await dbService.paginate( Modelos_item,query,options);
    if (!foundModelos_items || !foundModelos_items.data || !foundModelos_items.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundModelos_items });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Modelos_item from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Modelos_item. {status, message, data}
 */
const getModelos_item = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundModelos_item = await dbService.findOne(Modelos_item,query, options);
    if (!foundModelos_item){
      return res.recordNotFound();
    }
    return res.success({ data :foundModelos_item });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Modelos_item.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getModelos_itemCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Modelos_itemSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedModelos_item = await dbService.count(Modelos_item,where);
    return res.success({ data : { count: countedModelos_item } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Modelos_item with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Modelos_item.
 * @return {Object} : updated Modelos_item. {status, message, data}
 */
const updateModelos_item = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      Modelos_itemSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedModelos_item = await dbService.updateOne(Modelos_item,query,dataToUpdate);
    if (!updatedModelos_item){
      return res.recordNotFound();
    }
    return res.success({ data :updatedModelos_item });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Modelos_item with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Modelos_items.
 * @return {Object} : updated Modelos_items. {status, message, data}
 */
const bulkUpdateModelos_item = async (req,res)=>{
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
    let updatedModelos_item = await dbService.updateMany(Modelos_item,filter,dataToUpdate);
    if (!updatedModelos_item){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedModelos_item } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Modelos_item with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Modelos_item.
 * @return {obj} : updated Modelos_item. {status, message, data}
 */
const partialUpdateModelos_item = async (req,res) => {
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
      Modelos_itemSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedModelos_item = await dbService.updateOne(Modelos_item, query, dataToUpdate);
    if (!updatedModelos_item) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedModelos_item });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Modelos_item from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Modelos_item.
 * @return {Object} : deactivated Modelos_item. {status, message, data}
 */
const softDeleteModelos_item = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedModelos_item = await dbService.updateOne(Modelos_item, query, updateBody);
    if (!updatedModelos_item){
      return res.recordNotFound();
    }
    return res.success({ data:updatedModelos_item });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Modelos_item from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Modelos_item. {status, message, data}
 */
const deleteModelos_item = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedModelos_item = await dbService.deleteOne(Modelos_item, query);
    if (!deletedModelos_item){
      return res.recordNotFound();
    }
    return res.success({ data :deletedModelos_item });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Modelos_item in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyModelos_item = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedModelos_item = await dbService.deleteMany(Modelos_item,query);
    if (!deletedModelos_item){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedModelos_item } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Modelos_item from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Modelos_item.
 * @return {Object} : number of deactivated documents of Modelos_item. {status, message, data}
 */
const softDeleteManyModelos_item = async (req,res) => {
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
    let updatedModelos_item = await dbService.updateMany(Modelos_item,query, updateBody);
    if (!updatedModelos_item) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedModelos_item } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addModelos_item,
  bulkInsertModelos_item,
  findAllModelos_item,
  getModelos_item,
  getModelos_itemCount,
  updateModelos_item,
  bulkUpdateModelos_item,
  partialUpdateModelos_item,
  softDeleteModelos_item,
  deleteModelos_item,
  deleteManyModelos_item,
  softDeleteManyModelos_item    
};
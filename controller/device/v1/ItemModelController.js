/**
 * ItemModelController.js
 * @description : exports action methods for ItemModel.
 */

const ItemModel = require('../../../model/ItemModel');
const ItemModelSchemaKey = require('../../../utils/validation/ItemModelValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../../utils/common');
   
/**
 * @description : create document of ItemModel in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created ItemModel. {status, message, data}
 */ 
const addItemModel = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      ItemModelSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new ItemModel(dataToCreate);
    let createdItemModel = await dbService.create(ItemModel,dataToCreate);
    return res.success({ data : createdItemModel });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of ItemModel in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created ItemModels. {status, message, data}
 */
const bulkInsertItemModel = async (req,res)=>{
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
    let createdItemModels = await dbService.create(ItemModel,dataToCreate);
    createdItemModels = { count: createdItemModels ? createdItemModels.length : 0 };
    return res.success({ data:{ count:createdItemModels.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of ItemModel from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found ItemModel(s). {status, message, data}
 */
const findAllItemModel = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      ItemModelSchemaKey.findFilterKeys,
      ItemModel.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(ItemModel, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundItemModels = await dbService.paginate( ItemModel,query,options);
    if (!foundItemModels || !foundItemModels.data || !foundItemModels.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundItemModels });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of ItemModel from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found ItemModel. {status, message, data}
 */
const getItemModel = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundItemModel = await dbService.findOne(ItemModel,query, options);
    if (!foundItemModel){
      return res.recordNotFound();
    }
    return res.success({ data :foundItemModel });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of ItemModel.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getItemModelCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      ItemModelSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedItemModel = await dbService.count(ItemModel,where);
    return res.success({ data : { count: countedItemModel } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of ItemModel with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated ItemModel.
 * @return {Object} : updated ItemModel. {status, message, data}
 */
const updateItemModel = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      ItemModelSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedItemModel = await dbService.updateOne(ItemModel,query,dataToUpdate);
    if (!updatedItemModel){
      return res.recordNotFound();
    }
    return res.success({ data :updatedItemModel });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of ItemModel with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated ItemModels.
 * @return {Object} : updated ItemModels. {status, message, data}
 */
const bulkUpdateItemModel = async (req,res)=>{
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
    let updatedItemModel = await dbService.updateMany(ItemModel,filter,dataToUpdate);
    if (!updatedItemModel){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedItemModel } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of ItemModel with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated ItemModel.
 * @return {obj} : updated ItemModel. {status, message, data}
 */
const partialUpdateItemModel = async (req,res) => {
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
      ItemModelSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedItemModel = await dbService.updateOne(ItemModel, query, dataToUpdate);
    if (!updatedItemModel) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedItemModel });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of ItemModel from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of ItemModel.
 * @return {Object} : deactivated ItemModel. {status, message, data}
 */
const softDeleteItemModel = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedItemModel = await dbService.updateOne(ItemModel, query, updateBody);
    if (!updatedItemModel){
      return res.recordNotFound();
    }
    return res.success({ data:updatedItemModel });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of ItemModel from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted ItemModel. {status, message, data}
 */
const deleteItemModel = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedItemModel = await dbService.deleteOne(ItemModel, query);
    if (!deletedItemModel){
      return res.recordNotFound();
    }
    return res.success({ data :deletedItemModel });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of ItemModel in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyItemModel = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedItemModel = await dbService.deleteMany(ItemModel,query);
    if (!deletedItemModel){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedItemModel } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of ItemModel from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of ItemModel.
 * @return {Object} : number of deactivated documents of ItemModel. {status, message, data}
 */
const softDeleteManyItemModel = async (req,res) => {
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
    let updatedItemModel = await dbService.updateMany(ItemModel,query, updateBody);
    if (!updatedItemModel) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedItemModel } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addItemModel,
  bulkInsertItemModel,
  findAllItemModel,
  getItemModel,
  getItemModelCount,
  updateItemModel,
  bulkUpdateItemModel,
  partialUpdateItemModel,
  softDeleteItemModel,
  deleteItemModel,
  deleteManyItemModel,
  softDeleteManyItemModel    
};
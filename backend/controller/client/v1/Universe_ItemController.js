/**
 * Universe_ItemController.js
 * @description : exports action methods for Universe_Item.
 */

const Universe_Item = require('../../../model/Universe_Item');
const Universe_ItemSchemaKey = require('../../../utils/validation/Universe_ItemValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../../utils/common');
   
/**
 * @description : create document of Universe_Item in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Universe_Item. {status, message, data}
 */ 
const addUniverse_Item = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      Universe_ItemSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Universe_Item(dataToCreate);
    let createdUniverse_Item = await dbService.create(Universe_Item,dataToCreate);
    return res.success({ data : createdUniverse_Item });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Universe_Item in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Universe_Items. {status, message, data}
 */
const bulkInsertUniverse_Item = async (req,res)=>{
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
    let createdUniverse_Items = await dbService.create(Universe_Item,dataToCreate);
    createdUniverse_Items = { count: createdUniverse_Items ? createdUniverse_Items.length : 0 };
    return res.success({ data:{ count:createdUniverse_Items.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Universe_Item from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Universe_Item(s). {status, message, data}
 */
const findAllUniverse_Item = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Universe_ItemSchemaKey.findFilterKeys,
      Universe_Item.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Universe_Item, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundUniverse_Items = await dbService.paginate( Universe_Item,query,options);
    if (!foundUniverse_Items || !foundUniverse_Items.data || !foundUniverse_Items.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundUniverse_Items });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Universe_Item from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Universe_Item. {status, message, data}
 */
const getUniverse_Item = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundUniverse_Item = await dbService.findOne(Universe_Item,query, options);
    if (!foundUniverse_Item){
      return res.recordNotFound();
    }
    return res.success({ data :foundUniverse_Item });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Universe_Item.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getUniverse_ItemCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Universe_ItemSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedUniverse_Item = await dbService.count(Universe_Item,where);
    return res.success({ data : { count: countedUniverse_Item } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Universe_Item with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Universe_Item.
 * @return {Object} : updated Universe_Item. {status, message, data}
 */
const updateUniverse_Item = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      Universe_ItemSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedUniverse_Item = await dbService.updateOne(Universe_Item,query,dataToUpdate);
    if (!updatedUniverse_Item){
      return res.recordNotFound();
    }
    return res.success({ data :updatedUniverse_Item });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Universe_Item with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Universe_Items.
 * @return {Object} : updated Universe_Items. {status, message, data}
 */
const bulkUpdateUniverse_Item = async (req,res)=>{
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
    let updatedUniverse_Item = await dbService.updateMany(Universe_Item,filter,dataToUpdate);
    if (!updatedUniverse_Item){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedUniverse_Item } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Universe_Item with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Universe_Item.
 * @return {obj} : updated Universe_Item. {status, message, data}
 */
const partialUpdateUniverse_Item = async (req,res) => {
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
      Universe_ItemSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedUniverse_Item = await dbService.updateOne(Universe_Item, query, dataToUpdate);
    if (!updatedUniverse_Item) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedUniverse_Item });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Universe_Item from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Universe_Item.
 * @return {Object} : deactivated Universe_Item. {status, message, data}
 */
const softDeleteUniverse_Item = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedUniverse_Item = await dbService.updateOne(Universe_Item, query, updateBody);
    if (!updatedUniverse_Item){
      return res.recordNotFound();
    }
    return res.success({ data:updatedUniverse_Item });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Universe_Item from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Universe_Item. {status, message, data}
 */
const deleteUniverse_Item = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedUniverse_Item = await dbService.deleteOne(Universe_Item, query);
    if (!deletedUniverse_Item){
      return res.recordNotFound();
    }
    return res.success({ data :deletedUniverse_Item });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Universe_Item in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyUniverse_Item = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedUniverse_Item = await dbService.deleteMany(Universe_Item,query);
    if (!deletedUniverse_Item){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedUniverse_Item } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Universe_Item from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Universe_Item.
 * @return {Object} : number of deactivated documents of Universe_Item. {status, message, data}
 */
const softDeleteManyUniverse_Item = async (req,res) => {
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
    let updatedUniverse_Item = await dbService.updateMany(Universe_Item,query, updateBody);
    if (!updatedUniverse_Item) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedUniverse_Item } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addUniverse_Item,
  bulkInsertUniverse_Item,
  findAllUniverse_Item,
  getUniverse_Item,
  getUniverse_ItemCount,
  updateUniverse_Item,
  bulkUpdateUniverse_Item,
  partialUpdateUniverse_Item,
  softDeleteUniverse_Item,
  deleteUniverse_Item,
  deleteManyUniverse_Item,
  softDeleteManyUniverse_Item    
};
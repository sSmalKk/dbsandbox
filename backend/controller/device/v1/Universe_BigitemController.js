/**
 * Universe_BigitemController.js
 * @description : exports action methods for Universe_Bigitem.
 */

const Universe_Bigitem = require('../../../model/Universe_Bigitem');
const Universe_BigitemSchemaKey = require('../../../utils/validation/Universe_BigitemValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../../utils/common');
   
/**
 * @description : create document of Universe_Bigitem in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Universe_Bigitem. {status, message, data}
 */ 
const addUniverse_Bigitem = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      Universe_BigitemSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate = new Universe_Bigitem(dataToCreate);
    let createdUniverse_Bigitem = await dbService.create(Universe_Bigitem,dataToCreate);
    return res.success({ data : createdUniverse_Bigitem });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Universe_Bigitem in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Universe_Bigitems. {status, message, data}
 */
const bulkInsertUniverse_Bigitem = async (req,res)=>{
  try {
    if (req.body && (!Array.isArray(req.body.data) || req.body.data.length < 1)) {
      return res.badRequest();
    }
    let dataToCreate = [ ...req.body.data ];
    let createdUniverse_Bigitems = await dbService.create(Universe_Bigitem,dataToCreate);
    createdUniverse_Bigitems = { count: createdUniverse_Bigitems ? createdUniverse_Bigitems.length : 0 };
    return res.success({ data:{ count:createdUniverse_Bigitems.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Universe_Bigitem from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Universe_Bigitem(s). {status, message, data}
 */
const findAllUniverse_Bigitem = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Universe_BigitemSchemaKey.findFilterKeys,
      Universe_Bigitem.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Universe_Bigitem, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundUniverse_Bigitems = await dbService.paginate( Universe_Bigitem,query,options);
    if (!foundUniverse_Bigitems || !foundUniverse_Bigitems.data || !foundUniverse_Bigitems.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundUniverse_Bigitems });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Universe_Bigitem from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Universe_Bigitem. {status, message, data}
 */
const getUniverse_Bigitem = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundUniverse_Bigitem = await dbService.findOne(Universe_Bigitem,query, options);
    if (!foundUniverse_Bigitem){
      return res.recordNotFound();
    }
    return res.success({ data :foundUniverse_Bigitem });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Universe_Bigitem.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getUniverse_BigitemCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Universe_BigitemSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedUniverse_Bigitem = await dbService.count(Universe_Bigitem,where);
    return res.success({ data : { count: countedUniverse_Bigitem } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Universe_Bigitem with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Universe_Bigitem.
 * @return {Object} : updated Universe_Bigitem. {status, message, data}
 */
const updateUniverse_Bigitem = async (req,res) => {
  try {
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      Universe_BigitemSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedUniverse_Bigitem = await dbService.updateOne(Universe_Bigitem,query,dataToUpdate);
    if (!updatedUniverse_Bigitem){
      return res.recordNotFound();
    }
    return res.success({ data :updatedUniverse_Bigitem });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Universe_Bigitem with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Universe_Bigitems.
 * @return {Object} : updated Universe_Bigitems. {status, message, data}
 */
const bulkUpdateUniverse_Bigitem = async (req,res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = { ...req.body.data, };
    }
    let updatedUniverse_Bigitem = await dbService.updateMany(Universe_Bigitem,filter,dataToUpdate);
    if (!updatedUniverse_Bigitem){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedUniverse_Bigitem } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Universe_Bigitem with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Universe_Bigitem.
 * @return {obj} : updated Universe_Bigitem. {status, message, data}
 */
const partialUpdateUniverse_Bigitem = async (req,res) => {
  try {
    if (!req.params.id){
      res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      Universe_BigitemSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedUniverse_Bigitem = await dbService.updateOne(Universe_Bigitem, query, dataToUpdate);
    if (!updatedUniverse_Bigitem) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedUniverse_Bigitem });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Universe_Bigitem from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Universe_Bigitem.
 * @return {Object} : deactivated Universe_Bigitem. {status, message, data}
 */
const softDeleteUniverse_Bigitem = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = { isDeleted: true, };
    let updatedUniverse_Bigitem = await dbService.updateOne(Universe_Bigitem, query, updateBody);
    if (!updatedUniverse_Bigitem){
      return res.recordNotFound();
    }
    return res.success({ data:updatedUniverse_Bigitem });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Universe_Bigitem from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Universe_Bigitem. {status, message, data}
 */
const deleteUniverse_Bigitem = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedUniverse_Bigitem = await dbService.deleteOne(Universe_Bigitem, query);
    if (!deletedUniverse_Bigitem){
      return res.recordNotFound();
    }
    return res.success({ data :deletedUniverse_Bigitem });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Universe_Bigitem in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyUniverse_Bigitem = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedUniverse_Bigitem = await dbService.deleteMany(Universe_Bigitem,query);
    if (!deletedUniverse_Bigitem){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedUniverse_Bigitem } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Universe_Bigitem from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Universe_Bigitem.
 * @return {Object} : number of deactivated documents of Universe_Bigitem. {status, message, data}
 */
const softDeleteManyUniverse_Bigitem = async (req,res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const updateBody = { isDeleted: true, };
    let updatedUniverse_Bigitem = await dbService.updateMany(Universe_Bigitem,query, updateBody);
    if (!updatedUniverse_Bigitem) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedUniverse_Bigitem } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addUniverse_Bigitem,
  bulkInsertUniverse_Bigitem,
  findAllUniverse_Bigitem,
  getUniverse_Bigitem,
  getUniverse_BigitemCount,
  updateUniverse_Bigitem,
  bulkUpdateUniverse_Bigitem,
  partialUpdateUniverse_Bigitem,
  softDeleteUniverse_Bigitem,
  deleteUniverse_Bigitem,
  deleteManyUniverse_Bigitem,
  softDeleteManyUniverse_Bigitem    
};
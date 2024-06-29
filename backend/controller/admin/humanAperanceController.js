/**
 * humanAperanceController.js
 * @description : exports action methods for humanAperance.
 */

const HumanAperance = require('../../model/humanAperance');
const humanAperanceSchemaKey = require('../../utils/validation/humanAperanceValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../utils/common');
   
/**
 * @description : create document of HumanAperance in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created HumanAperance. {status, message, data}
 */ 
const addHumanAperance = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      humanAperanceSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new HumanAperance(dataToCreate);
    let createdHumanAperance = await dbService.create(HumanAperance,dataToCreate);
    return res.success({ data : createdHumanAperance });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of HumanAperance in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created HumanAperances. {status, message, data}
 */
const bulkInsertHumanAperance = async (req,res)=>{
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
    let createdHumanAperances = await dbService.create(HumanAperance,dataToCreate);
    createdHumanAperances = { count: createdHumanAperances ? createdHumanAperances.length : 0 };
    return res.success({ data:{ count:createdHumanAperances.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of HumanAperance from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found HumanAperance(s). {status, message, data}
 */
const findAllHumanAperance = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      humanAperanceSchemaKey.findFilterKeys,
      HumanAperance.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(HumanAperance, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundHumanAperances = await dbService.paginate( HumanAperance,query,options);
    if (!foundHumanAperances || !foundHumanAperances.data || !foundHumanAperances.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundHumanAperances });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of HumanAperance from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found HumanAperance. {status, message, data}
 */
const getHumanAperance = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundHumanAperance = await dbService.findOne(HumanAperance,query, options);
    if (!foundHumanAperance){
      return res.recordNotFound();
    }
    return res.success({ data :foundHumanAperance });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of HumanAperance.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getHumanAperanceCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      humanAperanceSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedHumanAperance = await dbService.count(HumanAperance,where);
    return res.success({ data : { count: countedHumanAperance } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of HumanAperance with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated HumanAperance.
 * @return {Object} : updated HumanAperance. {status, message, data}
 */
const updateHumanAperance = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      humanAperanceSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedHumanAperance = await dbService.updateOne(HumanAperance,query,dataToUpdate);
    if (!updatedHumanAperance){
      return res.recordNotFound();
    }
    return res.success({ data :updatedHumanAperance });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of HumanAperance with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated HumanAperances.
 * @return {Object} : updated HumanAperances. {status, message, data}
 */
const bulkUpdateHumanAperance = async (req,res)=>{
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
    let updatedHumanAperance = await dbService.updateMany(HumanAperance,filter,dataToUpdate);
    if (!updatedHumanAperance){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedHumanAperance } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of HumanAperance with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated HumanAperance.
 * @return {obj} : updated HumanAperance. {status, message, data}
 */
const partialUpdateHumanAperance = async (req,res) => {
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
      humanAperanceSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedHumanAperance = await dbService.updateOne(HumanAperance, query, dataToUpdate);
    if (!updatedHumanAperance) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedHumanAperance });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of HumanAperance from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of HumanAperance.
 * @return {Object} : deactivated HumanAperance. {status, message, data}
 */
const softDeleteHumanAperance = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedHumanAperance = await dbService.updateOne(HumanAperance, query, updateBody);
    if (!updatedHumanAperance){
      return res.recordNotFound();
    }
    return res.success({ data:updatedHumanAperance });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of HumanAperance from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted HumanAperance. {status, message, data}
 */
const deleteHumanAperance = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedHumanAperance = await dbService.deleteOne(HumanAperance, query);
    if (!deletedHumanAperance){
      return res.recordNotFound();
    }
    return res.success({ data :deletedHumanAperance });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of HumanAperance in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyHumanAperance = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedHumanAperance = await dbService.deleteMany(HumanAperance,query);
    if (!deletedHumanAperance){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedHumanAperance } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of HumanAperance from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of HumanAperance.
 * @return {Object} : number of deactivated documents of HumanAperance. {status, message, data}
 */
const softDeleteManyHumanAperance = async (req,res) => {
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
    let updatedHumanAperance = await dbService.updateMany(HumanAperance,query, updateBody);
    if (!updatedHumanAperance) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedHumanAperance } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addHumanAperance,
  bulkInsertHumanAperance,
  findAllHumanAperance,
  getHumanAperance,
  getHumanAperanceCount,
  updateHumanAperance,
  bulkUpdateHumanAperance,
  partialUpdateHumanAperance,
  softDeleteHumanAperance,
  deleteHumanAperance,
  deleteManyHumanAperance,
  softDeleteManyHumanAperance    
};
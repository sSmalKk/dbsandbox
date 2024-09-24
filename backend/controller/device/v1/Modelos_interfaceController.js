/**
 * Modelos_interfaceController.js
 * @description : exports action methods for Modelos_interface.
 */

const Modelos_interface = require('../../../model/Modelos_interface');
const Modelos_interfaceSchemaKey = require('../../../utils/validation/Modelos_interfaceValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const deleteDependentService = require('../../../utils/deleteDependent');
const utils = require('../../../utils/common');
   
/**
 * @description : create document of Modelos_interface in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Modelos_interface. {status, message, data}
 */ 
const addModelos_interface = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      Modelos_interfaceSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate = new Modelos_interface(dataToCreate);
    let createdModelos_interface = await dbService.create(Modelos_interface,dataToCreate);
    return res.success({ data : createdModelos_interface });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Modelos_interface in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Modelos_interfaces. {status, message, data}
 */
const bulkInsertModelos_interface = async (req,res)=>{
  try {
    if (req.body && (!Array.isArray(req.body.data) || req.body.data.length < 1)) {
      return res.badRequest();
    }
    let dataToCreate = [ ...req.body.data ];
    let createdModelos_interfaces = await dbService.create(Modelos_interface,dataToCreate);
    createdModelos_interfaces = { count: createdModelos_interfaces ? createdModelos_interfaces.length : 0 };
    return res.success({ data:{ count:createdModelos_interfaces.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Modelos_interface from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Modelos_interface(s). {status, message, data}
 */
const findAllModelos_interface = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Modelos_interfaceSchemaKey.findFilterKeys,
      Modelos_interface.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Modelos_interface, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundModelos_interfaces = await dbService.paginate( Modelos_interface,query,options);
    if (!foundModelos_interfaces || !foundModelos_interfaces.data || !foundModelos_interfaces.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundModelos_interfaces });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Modelos_interface from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Modelos_interface. {status, message, data}
 */
const getModelos_interface = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundModelos_interface = await dbService.findOne(Modelos_interface,query, options);
    if (!foundModelos_interface){
      return res.recordNotFound();
    }
    return res.success({ data :foundModelos_interface });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Modelos_interface.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getModelos_interfaceCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Modelos_interfaceSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedModelos_interface = await dbService.count(Modelos_interface,where);
    return res.success({ data : { count: countedModelos_interface } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Modelos_interface with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Modelos_interface.
 * @return {Object} : updated Modelos_interface. {status, message, data}
 */
const updateModelos_interface = async (req,res) => {
  try {
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      Modelos_interfaceSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedModelos_interface = await dbService.updateOne(Modelos_interface,query,dataToUpdate);
    if (!updatedModelos_interface){
      return res.recordNotFound();
    }
    return res.success({ data :updatedModelos_interface });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Modelos_interface with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Modelos_interfaces.
 * @return {Object} : updated Modelos_interfaces. {status, message, data}
 */
const bulkUpdateModelos_interface = async (req,res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = { ...req.body.data, };
    }
    let updatedModelos_interface = await dbService.updateMany(Modelos_interface,filter,dataToUpdate);
    if (!updatedModelos_interface){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedModelos_interface } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Modelos_interface with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Modelos_interface.
 * @return {obj} : updated Modelos_interface. {status, message, data}
 */
const partialUpdateModelos_interface = async (req,res) => {
  try {
    if (!req.params.id){
      res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      Modelos_interfaceSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedModelos_interface = await dbService.updateOne(Modelos_interface, query, dataToUpdate);
    if (!updatedModelos_interface) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedModelos_interface });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : deactivate document of Modelos_interface from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Modelos_interface.
 * @return {Object} : deactivated Modelos_interface. {status, message, data}
 */
const softDeleteModelos_interface = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const updateBody = { isDeleted: true, };
    let updatedModelos_interface = await deleteDependentService.softDeleteModelos_interface(query, updateBody);
    if (!updatedModelos_interface){
      return res.recordNotFound();
    }
    return res.success({ data:updatedModelos_interface });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete document of Modelos_interface from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Modelos_interface. {status, message, data}
 */
const deleteModelos_interface = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    let deletedModelos_interface;
    if (req.body.isWarning) { 
      deletedModelos_interface = await deleteDependentService.countModelos_interface(query);
    } else {
      deletedModelos_interface = await deleteDependentService.deleteModelos_interface(query);
    }
    if (!deletedModelos_interface){
      return res.recordNotFound();
    }
    return res.success({ data :deletedModelos_interface });
  }
  catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete documents of Modelos_interface in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyModelos_interface = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    let deletedModelos_interface;
    if (req.body.isWarning) {
      deletedModelos_interface = await deleteDependentService.countModelos_interface(query);
    }
    else {
      deletedModelos_interface = await deleteDependentService.deleteModelos_interface(query);
    }
    if (!deletedModelos_interface){
      return res.recordNotFound();
    }
    return res.success({ data :deletedModelos_interface });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : deactivate multiple documents of Modelos_interface from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Modelos_interface.
 * @return {Object} : number of deactivated documents of Modelos_interface. {status, message, data}
 */
const softDeleteManyModelos_interface = async (req,res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const updateBody = { isDeleted: true, };
    let updatedModelos_interface = await deleteDependentService.softDeleteModelos_interface(query, updateBody);
    if (!updatedModelos_interface) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedModelos_interface });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addModelos_interface,
  bulkInsertModelos_interface,
  findAllModelos_interface,
  getModelos_interface,
  getModelos_interfaceCount,
  updateModelos_interface,
  bulkUpdateModelos_interface,
  partialUpdateModelos_interface,
  softDeleteModelos_interface,
  deleteModelos_interface,
  deleteManyModelos_interface,
  softDeleteManyModelos_interface    
};
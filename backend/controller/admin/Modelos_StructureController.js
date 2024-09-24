/**
 * Modelos_StructureController.js
 * @description : exports action methods for Modelos_Structure.
 */

const Modelos_Structure = require('../../model/Modelos_Structure');
const Modelos_StructureSchemaKey = require('../../utils/validation/Modelos_StructureValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const deleteDependentService = require('../../utils/deleteDependent');
const utils = require('../../utils/common');
   
/**
 * @description : create document of Modelos_Structure in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Modelos_Structure. {status, message, data}
 */ 
const addModelos_Structure = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      Modelos_StructureSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate = new Modelos_Structure(dataToCreate);
    let createdModelos_Structure = await dbService.create(Modelos_Structure,dataToCreate);
    return res.success({ data : createdModelos_Structure });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Modelos_Structure in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Modelos_Structures. {status, message, data}
 */
const bulkInsertModelos_Structure = async (req,res)=>{
  try {
    if (req.body && (!Array.isArray(req.body.data) || req.body.data.length < 1)) {
      return res.badRequest();
    }
    let dataToCreate = [ ...req.body.data ];
    let createdModelos_Structures = await dbService.create(Modelos_Structure,dataToCreate);
    createdModelos_Structures = { count: createdModelos_Structures ? createdModelos_Structures.length : 0 };
    return res.success({ data:{ count:createdModelos_Structures.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Modelos_Structure from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Modelos_Structure(s). {status, message, data}
 */
const findAllModelos_Structure = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Modelos_StructureSchemaKey.findFilterKeys,
      Modelos_Structure.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Modelos_Structure, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundModelos_Structures = await dbService.paginate( Modelos_Structure,query,options);
    if (!foundModelos_Structures || !foundModelos_Structures.data || !foundModelos_Structures.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundModelos_Structures });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Modelos_Structure from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Modelos_Structure. {status, message, data}
 */
const getModelos_Structure = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundModelos_Structure = await dbService.findOne(Modelos_Structure,query, options);
    if (!foundModelos_Structure){
      return res.recordNotFound();
    }
    return res.success({ data :foundModelos_Structure });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Modelos_Structure.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getModelos_StructureCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Modelos_StructureSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedModelos_Structure = await dbService.count(Modelos_Structure,where);
    return res.success({ data : { count: countedModelos_Structure } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Modelos_Structure with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Modelos_Structure.
 * @return {Object} : updated Modelos_Structure. {status, message, data}
 */
const updateModelos_Structure = async (req,res) => {
  try {
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      Modelos_StructureSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedModelos_Structure = await dbService.updateOne(Modelos_Structure,query,dataToUpdate);
    if (!updatedModelos_Structure){
      return res.recordNotFound();
    }
    return res.success({ data :updatedModelos_Structure });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Modelos_Structure with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Modelos_Structures.
 * @return {Object} : updated Modelos_Structures. {status, message, data}
 */
const bulkUpdateModelos_Structure = async (req,res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = { ...req.body.data, };
    }
    let updatedModelos_Structure = await dbService.updateMany(Modelos_Structure,filter,dataToUpdate);
    if (!updatedModelos_Structure){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedModelos_Structure } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Modelos_Structure with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Modelos_Structure.
 * @return {obj} : updated Modelos_Structure. {status, message, data}
 */
const partialUpdateModelos_Structure = async (req,res) => {
  try {
    if (!req.params.id){
      res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      Modelos_StructureSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedModelos_Structure = await dbService.updateOne(Modelos_Structure, query, dataToUpdate);
    if (!updatedModelos_Structure) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedModelos_Structure });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : deactivate document of Modelos_Structure from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Modelos_Structure.
 * @return {Object} : deactivated Modelos_Structure. {status, message, data}
 */
const softDeleteModelos_Structure = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const updateBody = { isDeleted: true, };
    let updatedModelos_Structure = await deleteDependentService.softDeleteModelos_Structure(query, updateBody);
    if (!updatedModelos_Structure){
      return res.recordNotFound();
    }
    return res.success({ data:updatedModelos_Structure });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete document of Modelos_Structure from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Modelos_Structure. {status, message, data}
 */
const deleteModelos_Structure = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    let deletedModelos_Structure;
    if (req.body.isWarning) { 
      deletedModelos_Structure = await deleteDependentService.countModelos_Structure(query);
    } else {
      deletedModelos_Structure = await deleteDependentService.deleteModelos_Structure(query);
    }
    if (!deletedModelos_Structure){
      return res.recordNotFound();
    }
    return res.success({ data :deletedModelos_Structure });
  }
  catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete documents of Modelos_Structure in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyModelos_Structure = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    let deletedModelos_Structure;
    if (req.body.isWarning) {
      deletedModelos_Structure = await deleteDependentService.countModelos_Structure(query);
    }
    else {
      deletedModelos_Structure = await deleteDependentService.deleteModelos_Structure(query);
    }
    if (!deletedModelos_Structure){
      return res.recordNotFound();
    }
    return res.success({ data :deletedModelos_Structure });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : deactivate multiple documents of Modelos_Structure from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Modelos_Structure.
 * @return {Object} : number of deactivated documents of Modelos_Structure. {status, message, data}
 */
const softDeleteManyModelos_Structure = async (req,res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const updateBody = { isDeleted: true, };
    let updatedModelos_Structure = await deleteDependentService.softDeleteModelos_Structure(query, updateBody);
    if (!updatedModelos_Structure) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedModelos_Structure });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addModelos_Structure,
  bulkInsertModelos_Structure,
  findAllModelos_Structure,
  getModelos_Structure,
  getModelos_StructureCount,
  updateModelos_Structure,
  bulkUpdateModelos_Structure,
  partialUpdateModelos_Structure,
  softDeleteModelos_Structure,
  deleteModelos_Structure,
  deleteManyModelos_Structure,
  softDeleteManyModelos_Structure    
};
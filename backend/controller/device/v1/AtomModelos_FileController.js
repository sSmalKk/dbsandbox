/**
 * AtomModelos_FileController.js
 * @description : exports action methods for AtomModelos_File.
 */

const AtomModelos_File = require('../../../model/AtomModelos_File');
const AtomModelos_FileSchemaKey = require('../../../utils/validation/AtomModelos_FileValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const deleteDependentService = require('../../../utils/deleteDependent');
const utils = require('../../../utils/common');
   
/**
 * @description : create document of AtomModelos_File in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created AtomModelos_File. {status, message, data}
 */ 
const addAtomModelos_File = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      AtomModelos_FileSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate = new AtomModelos_File(dataToCreate);
    let createdAtomModelos_File = await dbService.create(AtomModelos_File,dataToCreate);
    return res.success({ data : createdAtomModelos_File });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of AtomModelos_File in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created AtomModelos_Files. {status, message, data}
 */
const bulkInsertAtomModelos_File = async (req,res)=>{
  try {
    if (req.body && (!Array.isArray(req.body.data) || req.body.data.length < 1)) {
      return res.badRequest();
    }
    let dataToCreate = [ ...req.body.data ];
    let createdAtomModelos_Files = await dbService.create(AtomModelos_File,dataToCreate);
    createdAtomModelos_Files = { count: createdAtomModelos_Files ? createdAtomModelos_Files.length : 0 };
    return res.success({ data:{ count:createdAtomModelos_Files.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of AtomModelos_File from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found AtomModelos_File(s). {status, message, data}
 */
const findAllAtomModelos_File = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      AtomModelos_FileSchemaKey.findFilterKeys,
      AtomModelos_File.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(AtomModelos_File, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundAtomModelos_Files = await dbService.paginate( AtomModelos_File,query,options);
    if (!foundAtomModelos_Files || !foundAtomModelos_Files.data || !foundAtomModelos_Files.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundAtomModelos_Files });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of AtomModelos_File from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found AtomModelos_File. {status, message, data}
 */
const getAtomModelos_File = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundAtomModelos_File = await dbService.findOne(AtomModelos_File,query, options);
    if (!foundAtomModelos_File){
      return res.recordNotFound();
    }
    return res.success({ data :foundAtomModelos_File });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of AtomModelos_File.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getAtomModelos_FileCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      AtomModelos_FileSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedAtomModelos_File = await dbService.count(AtomModelos_File,where);
    return res.success({ data : { count: countedAtomModelos_File } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of AtomModelos_File with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated AtomModelos_File.
 * @return {Object} : updated AtomModelos_File. {status, message, data}
 */
const updateAtomModelos_File = async (req,res) => {
  try {
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      AtomModelos_FileSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedAtomModelos_File = await dbService.updateOne(AtomModelos_File,query,dataToUpdate);
    if (!updatedAtomModelos_File){
      return res.recordNotFound();
    }
    return res.success({ data :updatedAtomModelos_File });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of AtomModelos_File with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated AtomModelos_Files.
 * @return {Object} : updated AtomModelos_Files. {status, message, data}
 */
const bulkUpdateAtomModelos_File = async (req,res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = { ...req.body.data, };
    }
    let updatedAtomModelos_File = await dbService.updateMany(AtomModelos_File,filter,dataToUpdate);
    if (!updatedAtomModelos_File){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedAtomModelos_File } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of AtomModelos_File with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated AtomModelos_File.
 * @return {obj} : updated AtomModelos_File. {status, message, data}
 */
const partialUpdateAtomModelos_File = async (req,res) => {
  try {
    if (!req.params.id){
      res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      AtomModelos_FileSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedAtomModelos_File = await dbService.updateOne(AtomModelos_File, query, dataToUpdate);
    if (!updatedAtomModelos_File) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedAtomModelos_File });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : deactivate document of AtomModelos_File from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of AtomModelos_File.
 * @return {Object} : deactivated AtomModelos_File. {status, message, data}
 */
const softDeleteAtomModelos_File = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const updateBody = { isDeleted: true, };
    let updatedAtomModelos_File = await deleteDependentService.softDeleteAtomModelos_File(query, updateBody);
    if (!updatedAtomModelos_File){
      return res.recordNotFound();
    }
    return res.success({ data:updatedAtomModelos_File });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete document of AtomModelos_File from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted AtomModelos_File. {status, message, data}
 */
const deleteAtomModelos_File = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    let deletedAtomModelos_File;
    if (req.body.isWarning) { 
      deletedAtomModelos_File = await deleteDependentService.countAtomModelos_File(query);
    } else {
      deletedAtomModelos_File = await deleteDependentService.deleteAtomModelos_File(query);
    }
    if (!deletedAtomModelos_File){
      return res.recordNotFound();
    }
    return res.success({ data :deletedAtomModelos_File });
  }
  catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete documents of AtomModelos_File in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyAtomModelos_File = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    let deletedAtomModelos_File;
    if (req.body.isWarning) {
      deletedAtomModelos_File = await deleteDependentService.countAtomModelos_File(query);
    }
    else {
      deletedAtomModelos_File = await deleteDependentService.deleteAtomModelos_File(query);
    }
    if (!deletedAtomModelos_File){
      return res.recordNotFound();
    }
    return res.success({ data :deletedAtomModelos_File });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : deactivate multiple documents of AtomModelos_File from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of AtomModelos_File.
 * @return {Object} : number of deactivated documents of AtomModelos_File. {status, message, data}
 */
const softDeleteManyAtomModelos_File = async (req,res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const updateBody = { isDeleted: true, };
    let updatedAtomModelos_File = await deleteDependentService.softDeleteAtomModelos_File(query, updateBody);
    if (!updatedAtomModelos_File) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedAtomModelos_File });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addAtomModelos_File,
  bulkInsertAtomModelos_File,
  findAllAtomModelos_File,
  getAtomModelos_File,
  getAtomModelos_FileCount,
  updateAtomModelos_File,
  bulkUpdateAtomModelos_File,
  partialUpdateAtomModelos_File,
  softDeleteAtomModelos_File,
  deleteAtomModelos_File,
  deleteManyAtomModelos_File,
  softDeleteManyAtomModelos_File    
};
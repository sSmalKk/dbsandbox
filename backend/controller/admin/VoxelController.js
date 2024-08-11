/**
 * VoxelController.js
 * @description : exports action methods for Voxel.
 */

const Voxel = require('../../model/Voxel');
const VoxelSchemaKey = require('../../utils/validation/VoxelValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const deleteDependentService = require('../../utils/deleteDependent');
const utils = require('../../utils/common');
   
/**
 * @description : create document of Voxel in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Voxel. {status, message, data}
 */ 
const addVoxel = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      VoxelSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate = new Voxel(dataToCreate);

    let checkUniqueFields = await utils.checkUniqueFieldsInDatabase(Voxel,[ 'globalcoord' ],dataToCreate,'INSERT');
    if (checkUniqueFields.isDuplicate){
      return res.validationError({ message : `${checkUniqueFields.value} already exists.Only unique ${checkUniqueFields.field} are allowed.` });
    }

    let createdVoxel = await dbService.create(Voxel,dataToCreate);
    return res.success({ data : createdVoxel });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Voxel in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Voxels. {status, message, data}
 */
const bulkInsertVoxel = async (req,res)=>{
  try {
    if (req.body && (!Array.isArray(req.body.data) || req.body.data.length < 1)) {
      return res.badRequest();
    }
    let dataToCreate = [ ...req.body.data ];

    let checkUniqueFields = await utils.checkUniqueFieldsInDatabase(Voxel,[ 'globalcoord' ],dataToCreate,'BULK_INSERT');
    if (checkUniqueFields.isDuplicate){
      return res.validationError({ message : `${checkUniqueFields.value} already exists.Only unique ${checkUniqueFields.field} are allowed.` });
    }

    let createdVoxels = await dbService.create(Voxel,dataToCreate);
    createdVoxels = { count: createdVoxels ? createdVoxels.length : 0 };
    return res.success({ data:{ count:createdVoxels.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Voxel from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Voxel(s). {status, message, data}
 */
const findAllVoxel = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      VoxelSchemaKey.findFilterKeys,
      Voxel.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Voxel, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundVoxels = await dbService.paginate( Voxel,query,options);
    if (!foundVoxels || !foundVoxels.data || !foundVoxels.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundVoxels });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Voxel from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Voxel. {status, message, data}
 */
const getVoxel = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundVoxel = await dbService.findOne(Voxel,query, options);
    if (!foundVoxel){
      return res.recordNotFound();
    }
    return res.success({ data :foundVoxel });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Voxel.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getVoxelCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      VoxelSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedVoxel = await dbService.count(Voxel,where);
    return res.success({ data : { count: countedVoxel } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Voxel with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Voxel.
 * @return {Object} : updated Voxel. {status, message, data}
 */
const updateVoxel = async (req,res) => {
  try {
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      VoxelSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };

    let checkUniqueFields = await utils.checkUniqueFieldsInDatabase(Voxel,[ 'globalcoord' ],dataToUpdate,'UPDATE', query);
    if (checkUniqueFields.isDuplicate){
      return res.validationError({ message : `${checkUniqueFields.value} already exists.Only unique ${checkUniqueFields.field} are allowed.` });
    }

    let updatedVoxel = await dbService.updateOne(Voxel,query,dataToUpdate);
    if (!updatedVoxel){
      return res.recordNotFound();
    }
    return res.success({ data :updatedVoxel });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Voxel with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Voxels.
 * @return {Object} : updated Voxels. {status, message, data}
 */
const bulkUpdateVoxel = async (req,res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = { ...req.body.data, };
    }

    let checkUniqueFields = await utils.checkUniqueFieldsInDatabase(Voxel,[ 'globalcoord' ],dataToUpdate,'BULK_UPDATE', filter);
    if (checkUniqueFields.isDuplicate){
      return res.validationError({ message : `${checkUniqueFields.value} already exists.Only unique ${checkUniqueFields.field} are allowed.` });
    }

    let updatedVoxel = await dbService.updateMany(Voxel,filter,dataToUpdate);
    if (!updatedVoxel){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedVoxel } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Voxel with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Voxel.
 * @return {obj} : updated Voxel. {status, message, data}
 */
const partialUpdateVoxel = async (req,res) => {
  try {
    if (!req.params.id){
      res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      VoxelSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };

    let checkUniqueFields = await utils.checkUniqueFieldsInDatabase(Voxel,[ 'globalcoord' ],dataToUpdate,'UPDATE', query);
    if (checkUniqueFields.isDuplicate){
      return res.validationError({ message : `${checkUniqueFields.value} already exists.Only unique ${checkUniqueFields.field} are allowed.` });
    }

    let updatedVoxel = await dbService.updateOne(Voxel, query, dataToUpdate);
    if (!updatedVoxel) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedVoxel });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : deactivate document of Voxel from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Voxel.
 * @return {Object} : deactivated Voxel. {status, message, data}
 */
const softDeleteVoxel = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const updateBody = { isDeleted: true, };
    let updatedVoxel = await deleteDependentService.softDeleteVoxel(query, updateBody);
    if (!updatedVoxel){
      return res.recordNotFound();
    }
    return res.success({ data:updatedVoxel });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete document of Voxel from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Voxel. {status, message, data}
 */
const deleteVoxel = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    let deletedVoxel;
    if (req.body.isWarning) { 
      deletedVoxel = await deleteDependentService.countVoxel(query);
    } else {
      deletedVoxel = await deleteDependentService.deleteVoxel(query);
    }
    if (!deletedVoxel){
      return res.recordNotFound();
    }
    return res.success({ data :deletedVoxel });
  }
  catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete documents of Voxel in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyVoxel = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    let deletedVoxel;
    if (req.body.isWarning) {
      deletedVoxel = await deleteDependentService.countVoxel(query);
    }
    else {
      deletedVoxel = await deleteDependentService.deleteVoxel(query);
    }
    if (!deletedVoxel){
      return res.recordNotFound();
    }
    return res.success({ data :deletedVoxel });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : deactivate multiple documents of Voxel from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Voxel.
 * @return {Object} : number of deactivated documents of Voxel. {status, message, data}
 */
const softDeleteManyVoxel = async (req,res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const updateBody = { isDeleted: true, };
    let updatedVoxel = await deleteDependentService.softDeleteVoxel(query, updateBody);
    if (!updatedVoxel) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedVoxel });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addVoxel,
  bulkInsertVoxel,
  findAllVoxel,
  getVoxel,
  getVoxelCount,
  updateVoxel,
  bulkUpdateVoxel,
  partialUpdateVoxel,
  softDeleteVoxel,
  deleteVoxel,
  deleteManyVoxel,
  softDeleteManyVoxel    
};
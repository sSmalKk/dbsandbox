/**
 * Universe_StructureController.js
 * @description : exports action methods for Universe_Structure.
 */

const Universe_Structure = require('../../model/Universe_Structure');
const Universe_StructureSchemaKey = require('../../utils/validation/Universe_StructureValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../utils/common');
   
/**
 * @description : create document of Universe_Structure in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Universe_Structure. {status, message, data}
 */ 
const addUniverse_Structure = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      Universe_StructureSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Universe_Structure(dataToCreate);
    let createdUniverse_Structure = await dbService.create(Universe_Structure,dataToCreate);
    return res.success({ data : createdUniverse_Structure });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Universe_Structure in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Universe_Structures. {status, message, data}
 */
const bulkInsertUniverse_Structure = async (req,res)=>{
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
    let createdUniverse_Structures = await dbService.create(Universe_Structure,dataToCreate);
    createdUniverse_Structures = { count: createdUniverse_Structures ? createdUniverse_Structures.length : 0 };
    return res.success({ data:{ count:createdUniverse_Structures.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Universe_Structure from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Universe_Structure(s). {status, message, data}
 */
const findAllUniverse_Structure = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Universe_StructureSchemaKey.findFilterKeys,
      Universe_Structure.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Universe_Structure, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundUniverse_Structures = await dbService.paginate( Universe_Structure,query,options);
    if (!foundUniverse_Structures || !foundUniverse_Structures.data || !foundUniverse_Structures.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundUniverse_Structures });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Universe_Structure from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Universe_Structure. {status, message, data}
 */
const getUniverse_Structure = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundUniverse_Structure = await dbService.findOne(Universe_Structure,query, options);
    if (!foundUniverse_Structure){
      return res.recordNotFound();
    }
    return res.success({ data :foundUniverse_Structure });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Universe_Structure.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getUniverse_StructureCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Universe_StructureSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedUniverse_Structure = await dbService.count(Universe_Structure,where);
    return res.success({ data : { count: countedUniverse_Structure } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Universe_Structure with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Universe_Structure.
 * @return {Object} : updated Universe_Structure. {status, message, data}
 */
const updateUniverse_Structure = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      Universe_StructureSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedUniverse_Structure = await dbService.updateOne(Universe_Structure,query,dataToUpdate);
    if (!updatedUniverse_Structure){
      return res.recordNotFound();
    }
    return res.success({ data :updatedUniverse_Structure });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Universe_Structure with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Universe_Structures.
 * @return {Object} : updated Universe_Structures. {status, message, data}
 */
const bulkUpdateUniverse_Structure = async (req,res)=>{
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
    let updatedUniverse_Structure = await dbService.updateMany(Universe_Structure,filter,dataToUpdate);
    if (!updatedUniverse_Structure){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedUniverse_Structure } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Universe_Structure with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Universe_Structure.
 * @return {obj} : updated Universe_Structure. {status, message, data}
 */
const partialUpdateUniverse_Structure = async (req,res) => {
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
      Universe_StructureSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedUniverse_Structure = await dbService.updateOne(Universe_Structure, query, dataToUpdate);
    if (!updatedUniverse_Structure) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedUniverse_Structure });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Universe_Structure from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Universe_Structure.
 * @return {Object} : deactivated Universe_Structure. {status, message, data}
 */
const softDeleteUniverse_Structure = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedUniverse_Structure = await dbService.updateOne(Universe_Structure, query, updateBody);
    if (!updatedUniverse_Structure){
      return res.recordNotFound();
    }
    return res.success({ data:updatedUniverse_Structure });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Universe_Structure from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Universe_Structure. {status, message, data}
 */
const deleteUniverse_Structure = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedUniverse_Structure = await dbService.deleteOne(Universe_Structure, query);
    if (!deletedUniverse_Structure){
      return res.recordNotFound();
    }
    return res.success({ data :deletedUniverse_Structure });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Universe_Structure in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyUniverse_Structure = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedUniverse_Structure = await dbService.deleteMany(Universe_Structure,query);
    if (!deletedUniverse_Structure){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedUniverse_Structure } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Universe_Structure from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Universe_Structure.
 * @return {Object} : number of deactivated documents of Universe_Structure. {status, message, data}
 */
const softDeleteManyUniverse_Structure = async (req,res) => {
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
    let updatedUniverse_Structure = await dbService.updateMany(Universe_Structure,query, updateBody);
    if (!updatedUniverse_Structure) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedUniverse_Structure } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addUniverse_Structure,
  bulkInsertUniverse_Structure,
  findAllUniverse_Structure,
  getUniverse_Structure,
  getUniverse_StructureCount,
  updateUniverse_Structure,
  bulkUpdateUniverse_Structure,
  partialUpdateUniverse_Structure,
  softDeleteUniverse_Structure,
  deleteUniverse_Structure,
  deleteManyUniverse_Structure,
  softDeleteManyUniverse_Structure    
};
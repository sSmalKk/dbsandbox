/**
 * Universe_cubeController.js
 * @description : exports action methods for Universe_cube.
 */

const Universe_cube = require('../../model/Universe_cube');
const Universe_cubeSchemaKey = require('../../utils/validation/Universe_cubeValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const deleteDependentService = require('../../utils/deleteDependent');
const utils = require('../../utils/common');
   
/**
 * @description : create document of Universe_cube in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Universe_cube. {status, message, data}
 */ 
const addUniverse_cube = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      Universe_cubeSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Universe_cube(dataToCreate);
    let createdUniverse_cube = await dbService.create(Universe_cube,dataToCreate);
    return res.success({ data : createdUniverse_cube });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Universe_cube in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Universe_cubes. {status, message, data}
 */
const bulkInsertUniverse_cube = async (req,res)=>{
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
    let createdUniverse_cubes = await dbService.create(Universe_cube,dataToCreate);
    createdUniverse_cubes = { count: createdUniverse_cubes ? createdUniverse_cubes.length : 0 };
    return res.success({ data:{ count:createdUniverse_cubes.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Universe_cube from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Universe_cube(s). {status, message, data}
 */
const findAllUniverse_cube = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Universe_cubeSchemaKey.findFilterKeys,
      Universe_cube.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Universe_cube, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundUniverse_cubes = await dbService.paginate( Universe_cube,query,options);
    if (!foundUniverse_cubes || !foundUniverse_cubes.data || !foundUniverse_cubes.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundUniverse_cubes });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Universe_cube from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Universe_cube. {status, message, data}
 */
const getUniverse_cube = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundUniverse_cube = await dbService.findOne(Universe_cube,query, options);
    if (!foundUniverse_cube){
      return res.recordNotFound();
    }
    return res.success({ data :foundUniverse_cube });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Universe_cube.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getUniverse_cubeCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Universe_cubeSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedUniverse_cube = await dbService.count(Universe_cube,where);
    return res.success({ data : { count: countedUniverse_cube } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Universe_cube with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Universe_cube.
 * @return {Object} : updated Universe_cube. {status, message, data}
 */
const updateUniverse_cube = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      Universe_cubeSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedUniverse_cube = await dbService.updateOne(Universe_cube,query,dataToUpdate);
    if (!updatedUniverse_cube){
      return res.recordNotFound();
    }
    return res.success({ data :updatedUniverse_cube });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Universe_cube with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Universe_cubes.
 * @return {Object} : updated Universe_cubes. {status, message, data}
 */
const bulkUpdateUniverse_cube = async (req,res)=>{
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
    let updatedUniverse_cube = await dbService.updateMany(Universe_cube,filter,dataToUpdate);
    if (!updatedUniverse_cube){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedUniverse_cube } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Universe_cube with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Universe_cube.
 * @return {obj} : updated Universe_cube. {status, message, data}
 */
const partialUpdateUniverse_cube = async (req,res) => {
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
      Universe_cubeSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedUniverse_cube = await dbService.updateOne(Universe_cube, query, dataToUpdate);
    if (!updatedUniverse_cube) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedUniverse_cube });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : deactivate document of Universe_cube from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Universe_cube.
 * @return {Object} : deactivated Universe_cube. {status, message, data}
 */
const softDeleteUniverse_cube = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedUniverse_cube = await deleteDependentService.softDeleteUniverse_cube(query, updateBody);
    if (!updatedUniverse_cube){
      return res.recordNotFound();
    }
    return res.success({ data:updatedUniverse_cube });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete document of Universe_cube from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Universe_cube. {status, message, data}
 */
const deleteUniverse_cube = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    let deletedUniverse_cube;
    if (req.body.isWarning) { 
      deletedUniverse_cube = await deleteDependentService.countUniverse_cube(query);
    } else {
      deletedUniverse_cube = await deleteDependentService.deleteUniverse_cube(query);
    }
    if (!deletedUniverse_cube){
      return res.recordNotFound();
    }
    return res.success({ data :deletedUniverse_cube });
  }
  catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete documents of Universe_cube in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyUniverse_cube = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    let deletedUniverse_cube;
    if (req.body.isWarning) {
      deletedUniverse_cube = await deleteDependentService.countUniverse_cube(query);
    }
    else {
      deletedUniverse_cube = await deleteDependentService.deleteUniverse_cube(query);
    }
    if (!deletedUniverse_cube){
      return res.recordNotFound();
    }
    return res.success({ data :deletedUniverse_cube });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : deactivate multiple documents of Universe_cube from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Universe_cube.
 * @return {Object} : number of deactivated documents of Universe_cube. {status, message, data}
 */
const softDeleteManyUniverse_cube = async (req,res) => {
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
    let updatedUniverse_cube = await deleteDependentService.softDeleteUniverse_cube(query, updateBody);
    if (!updatedUniverse_cube) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedUniverse_cube });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addUniverse_cube,
  bulkInsertUniverse_cube,
  findAllUniverse_cube,
  getUniverse_cube,
  getUniverse_cubeCount,
  updateUniverse_cube,
  bulkUpdateUniverse_cube,
  partialUpdateUniverse_cube,
  softDeleteUniverse_cube,
  deleteUniverse_cube,
  deleteManyUniverse_cube,
  softDeleteManyUniverse_cube    
};
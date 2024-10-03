/**
 * Base_CubeController.js
 * @description : exports action methods for Base_Cube.
 */

const Base_Cube = require('../../../model/Base_Cube');
const Base_CubeSchemaKey = require('../../../utils/validation/Base_CubeValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const deleteDependentService = require('../../../utils/deleteDependent');
const utils = require('../../../utils/common');
   
/**
 * @description : create document of Base_Cube in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Base_Cube. {status, message, data}
 */ 
const addBase_Cube = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      Base_CubeSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Base_Cube(dataToCreate);
    let createdBase_Cube = await dbService.create(Base_Cube,dataToCreate);
    return res.success({ data : createdBase_Cube });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Base_Cube in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Base_Cubes. {status, message, data}
 */
const bulkInsertBase_Cube = async (req,res)=>{
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
    let createdBase_Cubes = await dbService.create(Base_Cube,dataToCreate);
    createdBase_Cubes = { count: createdBase_Cubes ? createdBase_Cubes.length : 0 };
    return res.success({ data:{ count:createdBase_Cubes.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Base_Cube from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Base_Cube(s). {status, message, data}
 */
const findAllBase_Cube = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Base_CubeSchemaKey.findFilterKeys,
      Base_Cube.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Base_Cube, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundBase_Cubes = await dbService.paginate( Base_Cube,query,options);
    if (!foundBase_Cubes || !foundBase_Cubes.data || !foundBase_Cubes.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundBase_Cubes });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Base_Cube from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Base_Cube. {status, message, data}
 */
const getBase_Cube = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundBase_Cube = await dbService.findOne(Base_Cube,query, options);
    if (!foundBase_Cube){
      return res.recordNotFound();
    }
    return res.success({ data :foundBase_Cube });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Base_Cube.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getBase_CubeCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Base_CubeSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedBase_Cube = await dbService.count(Base_Cube,where);
    return res.success({ data : { count: countedBase_Cube } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Base_Cube with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Base_Cube.
 * @return {Object} : updated Base_Cube. {status, message, data}
 */
const updateBase_Cube = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      Base_CubeSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedBase_Cube = await dbService.updateOne(Base_Cube,query,dataToUpdate);
    if (!updatedBase_Cube){
      return res.recordNotFound();
    }
    return res.success({ data :updatedBase_Cube });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Base_Cube with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Base_Cubes.
 * @return {Object} : updated Base_Cubes. {status, message, data}
 */
const bulkUpdateBase_Cube = async (req,res)=>{
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
    let updatedBase_Cube = await dbService.updateMany(Base_Cube,filter,dataToUpdate);
    if (!updatedBase_Cube){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedBase_Cube } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Base_Cube with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Base_Cube.
 * @return {obj} : updated Base_Cube. {status, message, data}
 */
const partialUpdateBase_Cube = async (req,res) => {
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
      Base_CubeSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedBase_Cube = await dbService.updateOne(Base_Cube, query, dataToUpdate);
    if (!updatedBase_Cube) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedBase_Cube });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : deactivate document of Base_Cube from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Base_Cube.
 * @return {Object} : deactivated Base_Cube. {status, message, data}
 */
const softDeleteBase_Cube = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedBase_Cube = await deleteDependentService.softDeleteBase_Cube(query, updateBody);
    if (!updatedBase_Cube){
      return res.recordNotFound();
    }
    return res.success({ data:updatedBase_Cube });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete document of Base_Cube from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Base_Cube. {status, message, data}
 */
const deleteBase_Cube = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    let deletedBase_Cube;
    if (req.body.isWarning) { 
      deletedBase_Cube = await deleteDependentService.countBase_Cube(query);
    } else {
      deletedBase_Cube = await deleteDependentService.deleteBase_Cube(query);
    }
    if (!deletedBase_Cube){
      return res.recordNotFound();
    }
    return res.success({ data :deletedBase_Cube });
  }
  catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete documents of Base_Cube in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyBase_Cube = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    let deletedBase_Cube;
    if (req.body.isWarning) {
      deletedBase_Cube = await deleteDependentService.countBase_Cube(query);
    }
    else {
      deletedBase_Cube = await deleteDependentService.deleteBase_Cube(query);
    }
    if (!deletedBase_Cube){
      return res.recordNotFound();
    }
    return res.success({ data :deletedBase_Cube });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : deactivate multiple documents of Base_Cube from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Base_Cube.
 * @return {Object} : number of deactivated documents of Base_Cube. {status, message, data}
 */
const softDeleteManyBase_Cube = async (req,res) => {
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
    let updatedBase_Cube = await deleteDependentService.softDeleteBase_Cube(query, updateBody);
    if (!updatedBase_Cube) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedBase_Cube });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addBase_Cube,
  bulkInsertBase_Cube,
  findAllBase_Cube,
  getBase_Cube,
  getBase_CubeCount,
  updateBase_Cube,
  bulkUpdateBase_Cube,
  partialUpdateBase_Cube,
  softDeleteBase_Cube,
  deleteBase_Cube,
  deleteManyBase_Cube,
  softDeleteManyBase_Cube    
};
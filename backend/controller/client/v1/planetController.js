/**
 * planetController.js
 * @description : exports action methods for planet.
 */

const Planet = require('../../../model/planet');
const planetSchemaKey = require('../../../utils/validation/planetValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const deleteDependentService = require('../../../utils/deleteDependent');
const utils = require('../../../utils/common');
   
/**
 * @description : create document of Planet in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Planet. {status, message, data}
 */ 
const addPlanet = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      planetSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Planet(dataToCreate);
    let createdPlanet = await dbService.create(Planet,dataToCreate);
    return res.success({ data : createdPlanet });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Planet in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Planets. {status, message, data}
 */
const bulkInsertPlanet = async (req,res)=>{
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
    let createdPlanets = await dbService.create(Planet,dataToCreate);
    createdPlanets = { count: createdPlanets ? createdPlanets.length : 0 };
    return res.success({ data:{ count:createdPlanets.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Planet from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Planet(s). {status, message, data}
 */
const findAllPlanet = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      planetSchemaKey.findFilterKeys,
      Planet.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Planet, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundPlanets = await dbService.paginate( Planet,query,options);
    if (!foundPlanets || !foundPlanets.data || !foundPlanets.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundPlanets });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Planet from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Planet. {status, message, data}
 */
const getPlanet = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundPlanet = await dbService.findOne(Planet,query, options);
    if (!foundPlanet){
      return res.recordNotFound();
    }
    return res.success({ data :foundPlanet });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Planet.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getPlanetCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      planetSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedPlanet = await dbService.count(Planet,where);
    return res.success({ data : { count: countedPlanet } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Planet with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Planet.
 * @return {Object} : updated Planet. {status, message, data}
 */
const updatePlanet = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      planetSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedPlanet = await dbService.updateOne(Planet,query,dataToUpdate);
    if (!updatedPlanet){
      return res.recordNotFound();
    }
    return res.success({ data :updatedPlanet });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Planet with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Planets.
 * @return {Object} : updated Planets. {status, message, data}
 */
const bulkUpdatePlanet = async (req,res)=>{
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
    let updatedPlanet = await dbService.updateMany(Planet,filter,dataToUpdate);
    if (!updatedPlanet){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedPlanet } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Planet with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Planet.
 * @return {obj} : updated Planet. {status, message, data}
 */
const partialUpdatePlanet = async (req,res) => {
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
      planetSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedPlanet = await dbService.updateOne(Planet, query, dataToUpdate);
    if (!updatedPlanet) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedPlanet });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : deactivate document of Planet from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Planet.
 * @return {Object} : deactivated Planet. {status, message, data}
 */
const softDeletePlanet = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedPlanet = await deleteDependentService.softDeletePlanet(query, updateBody);
    if (!updatedPlanet){
      return res.recordNotFound();
    }
    return res.success({ data:updatedPlanet });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete document of Planet from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Planet. {status, message, data}
 */
const deletePlanet = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    let deletedPlanet;
    if (req.body.isWarning) { 
      deletedPlanet = await deleteDependentService.countPlanet(query);
    } else {
      deletedPlanet = await deleteDependentService.deletePlanet(query);
    }
    if (!deletedPlanet){
      return res.recordNotFound();
    }
    return res.success({ data :deletedPlanet });
  }
  catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete documents of Planet in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyPlanet = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    let deletedPlanet;
    if (req.body.isWarning) {
      deletedPlanet = await deleteDependentService.countPlanet(query);
    }
    else {
      deletedPlanet = await deleteDependentService.deletePlanet(query);
    }
    if (!deletedPlanet){
      return res.recordNotFound();
    }
    return res.success({ data :deletedPlanet });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : deactivate multiple documents of Planet from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Planet.
 * @return {Object} : number of deactivated documents of Planet. {status, message, data}
 */
const softDeleteManyPlanet = async (req,res) => {
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
    let updatedPlanet = await deleteDependentService.softDeletePlanet(query, updateBody);
    if (!updatedPlanet) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedPlanet });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addPlanet,
  bulkInsertPlanet,
  findAllPlanet,
  getPlanet,
  getPlanetCount,
  updatePlanet,
  bulkUpdatePlanet,
  partialUpdatePlanet,
  softDeletePlanet,
  deletePlanet,
  deleteManyPlanet,
  softDeleteManyPlanet    
};
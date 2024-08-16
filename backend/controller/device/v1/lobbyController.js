/**
 * lobbyController.js
 * @description : exports action methods for lobby.
 */

const Lobby = require('../../../model/lobby');
const lobbySchemaKey = require('../../../utils/validation/lobbyValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const deleteDependentService = require('../../../utils/deleteDependent');
const utils = require('../../../utils/common');
   
/**
 * @description : create document of Lobby in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Lobby. {status, message, data}
 */ 
const addLobby = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    dataToCreate = {
      ...{ 'time':(Date.now()).toString() },
      ...dataToCreate,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      lobbySchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Lobby(dataToCreate);
    let createdLobby = await dbService.create(Lobby,dataToCreate);
    return res.success({ data : createdLobby });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Lobby in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Lobbys. {status, message, data}
 */
const bulkInsertLobby = async (req,res)=>{
  try {
    if (req.body && (!Array.isArray(req.body.data) || req.body.data.length < 1)) {
      return res.badRequest();
    }
    let dataToCreate = [ ...req.body.data ];
    for (let i = 0;i < dataToCreate.length;i++){
      dataToCreate[i] = {
        ...{ 'time':(Date.now()).toString() },
        ...dataToCreate[i],
        addedBy: req.user.id
      };
    }
    let createdLobbys = await dbService.create(Lobby,dataToCreate);
    createdLobbys = { count: createdLobbys ? createdLobbys.length : 0 };
    return res.success({ data:{ count:createdLobbys.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Lobby from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Lobby(s). {status, message, data}
 */
const findAllLobby = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      lobbySchemaKey.findFilterKeys,
      Lobby.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Lobby, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundLobbys = await dbService.paginate( Lobby,query,options);
    if (!foundLobbys || !foundLobbys.data || !foundLobbys.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundLobbys });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Lobby from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Lobby. {status, message, data}
 */
const getLobby = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundLobby = await dbService.findOne(Lobby,query, options);
    if (!foundLobby){
      return res.recordNotFound();
    }
    return res.success({ data :foundLobby });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Lobby.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getLobbyCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      lobbySchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedLobby = await dbService.count(Lobby,where);
    return res.success({ data : { count: countedLobby } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Lobby with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Lobby.
 * @return {Object} : updated Lobby. {status, message, data}
 */
const updateLobby = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      lobbySchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedLobby = await dbService.updateOne(Lobby,query,dataToUpdate);
    if (!updatedLobby){
      return res.recordNotFound();
    }
    return res.success({ data :updatedLobby });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Lobby with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Lobbys.
 * @return {Object} : updated Lobbys. {status, message, data}
 */
const bulkUpdateLobby = async (req,res)=>{
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
    let updatedLobby = await dbService.updateMany(Lobby,filter,dataToUpdate);
    if (!updatedLobby){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedLobby } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Lobby with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Lobby.
 * @return {obj} : updated Lobby. {status, message, data}
 */
const partialUpdateLobby = async (req,res) => {
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
      lobbySchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedLobby = await dbService.updateOne(Lobby, query, dataToUpdate);
    if (!updatedLobby) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedLobby });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : deactivate document of Lobby from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Lobby.
 * @return {Object} : deactivated Lobby. {status, message, data}
 */
const softDeleteLobby = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedLobby = await deleteDependentService.softDeleteLobby(query, updateBody);
    if (!updatedLobby){
      return res.recordNotFound();
    }
    return res.success({ data:updatedLobby });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete document of Lobby from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Lobby. {status, message, data}
 */
const deleteLobby = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    let deletedLobby;
    if (req.body.isWarning) { 
      deletedLobby = await deleteDependentService.countLobby(query);
    } else {
      deletedLobby = await deleteDependentService.deleteLobby(query);
    }
    if (!deletedLobby){
      return res.recordNotFound();
    }
    return res.success({ data :deletedLobby });
  }
  catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete documents of Lobby in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyLobby = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    let deletedLobby;
    if (req.body.isWarning) {
      deletedLobby = await deleteDependentService.countLobby(query);
    }
    else {
      deletedLobby = await deleteDependentService.deleteLobby(query);
    }
    if (!deletedLobby){
      return res.recordNotFound();
    }
    return res.success({ data :deletedLobby });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : deactivate multiple documents of Lobby from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Lobby.
 * @return {Object} : number of deactivated documents of Lobby. {status, message, data}
 */
const softDeleteManyLobby = async (req,res) => {
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
    let updatedLobby = await deleteDependentService.softDeleteLobby(query, updateBody);
    if (!updatedLobby) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedLobby });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addLobby,
  bulkInsertLobby,
  findAllLobby,
  getLobby,
  getLobbyCount,
  updateLobby,
  bulkUpdateLobby,
  partialUpdateLobby,
  softDeleteLobby,
  deleteLobby,
  deleteManyLobby,
  softDeleteManyLobby    
};
/**
 * WorldDataController.js
 * @description : exports action methods for WorldData.
 */

const WorldData = require('../../model/WorldData');
const WorldDataSchemaKey = require('../../utils/validation/WorldDataValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const deleteDependentService = require('../../utils/deleteDependent');
const utils = require('../../utils/common');
   
/**
 * @description : create document of WorldData in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created WorldData. {status, message, data}
 */ 
const addWorldData = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    dataToCreate = {
      ...{
        'createdAt':(Date.now()).toString(),
        'updatedAt':(Date.now()).toString(),
        'addedBy':(req && req.user && req.user.id ? req.user.id.toString() : null),
        'updatedBy':(req && req.user && req.user.id ? req.user.id.toString() : null)
      },
      ...dataToCreate,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      WorldDataSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new WorldData(dataToCreate);

    let checkUniqueFields = await utils.checkUniqueFieldsInDatabase(WorldData,[ 'code', 'innerDiminnerDim' ],dataToCreate,'INSERT');
    if (checkUniqueFields.isDuplicate){
      return res.validationError({ message : `${checkUniqueFields.value} already exists.Only unique ${checkUniqueFields.field} are allowed.` });
    }

    let createdWorldData = await dbService.create(WorldData,dataToCreate);
    return res.success({ data : createdWorldData });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of WorldData in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created WorldDatas. {status, message, data}
 */
const bulkInsertWorldData = async (req,res)=>{
  try {
    if (req.body && (!Array.isArray(req.body.data) || req.body.data.length < 1)) {
      return res.badRequest();
    }
    let dataToCreate = [ ...req.body.data ];
    for (let i = 0;i < dataToCreate.length;i++){
      dataToCreate[i] = {
        ...{
          'createdAt':(Date.now()).toString(),
          'updatedAt':(Date.now()).toString(),
          'addedBy':(req && req.user && req.user.id ? req.user.id.toString() : null),
          'updatedBy':(req && req.user && req.user.id ? req.user.id.toString() : null)
        },
        ...dataToCreate[i],
        addedBy: req.user.id
      };
    }

    let checkUniqueFields = await utils.checkUniqueFieldsInDatabase(WorldData,[ 'code', 'innerDiminnerDim' ],dataToCreate,'BULK_INSERT');
    if (checkUniqueFields.isDuplicate){
      return res.validationError({ message : `${checkUniqueFields.value} already exists.Only unique ${checkUniqueFields.field} are allowed.` });
    }

    let createdWorldDatas = await dbService.create(WorldData,dataToCreate);
    createdWorldDatas = { count: createdWorldDatas ? createdWorldDatas.length : 0 };
    return res.success({ data:{ count:createdWorldDatas.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of WorldData from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found WorldData(s). {status, message, data}
 */
const findAllWorldData = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      WorldDataSchemaKey.findFilterKeys,
      WorldData.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(WorldData, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    if (!options.populate) options.populate = [];
    options.populate = options.populate.concat([ { path: 'universe' } ]);
    let foundWorldDatas = await dbService.paginate( WorldData,query,options);
    if (!foundWorldDatas || !foundWorldDatas.data || !foundWorldDatas.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundWorldDatas });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of WorldData from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found WorldData. {status, message, data}
 */
const getWorldData = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    const virtualRelationModel = [{ 'path':'universe' }];
    options.populate = virtualRelationModel;
    let foundWorldData = await dbService.findOne(WorldData,query, options);
    if (!foundWorldData){
      return res.recordNotFound();
    }
    return res.success({ data :foundWorldData });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of WorldData.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getWorldDataCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      WorldDataSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedWorldData = await dbService.count(WorldData,where);
    return res.success({ data : { count: countedWorldData } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of WorldData with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated WorldData.
 * @return {Object} : updated WorldData. {status, message, data}
 */
const updateWorldData = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      WorldDataSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };

    let checkUniqueFields = await utils.checkUniqueFieldsInDatabase(WorldData,[ 'code', 'innerDiminnerDim' ],dataToUpdate,'UPDATE', query);
    if (checkUniqueFields.isDuplicate){
      return res.validationError({ message : `${checkUniqueFields.value} already exists.Only unique ${checkUniqueFields.field} are allowed.` });
    }

    let updatedWorldData = await dbService.updateOne(WorldData,query,dataToUpdate);
    if (!updatedWorldData){
      return res.recordNotFound();
    }
    return res.success({ data :updatedWorldData });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of WorldData with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated WorldDatas.
 * @return {Object} : updated WorldDatas. {status, message, data}
 */
const bulkUpdateWorldData = async (req,res)=>{
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

    let checkUniqueFields = await utils.checkUniqueFieldsInDatabase(WorldData,[ 'code', 'innerDiminnerDim' ],dataToUpdate,'BULK_UPDATE', filter);
    if (checkUniqueFields.isDuplicate){
      return res.validationError({ message : `${checkUniqueFields.value} already exists.Only unique ${checkUniqueFields.field} are allowed.` });
    }

    let updatedWorldData = await dbService.updateMany(WorldData,filter,dataToUpdate);
    if (!updatedWorldData){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedWorldData } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of WorldData with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated WorldData.
 * @return {obj} : updated WorldData. {status, message, data}
 */
const partialUpdateWorldData = async (req,res) => {
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
      WorldDataSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };

    let checkUniqueFields = await utils.checkUniqueFieldsInDatabase(WorldData,[ 'code', 'innerDiminnerDim' ],dataToUpdate,'UPDATE', query);
    if (checkUniqueFields.isDuplicate){
      return res.validationError({ message : `${checkUniqueFields.value} already exists.Only unique ${checkUniqueFields.field} are allowed.` });
    }

    let updatedWorldData = await dbService.updateOne(WorldData, query, dataToUpdate);
    if (!updatedWorldData) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedWorldData });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : deactivate document of WorldData from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of WorldData.
 * @return {Object} : deactivated WorldData. {status, message, data}
 */
const softDeleteWorldData = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedWorldData = await deleteDependentService.softDeleteWorldData(query, updateBody);
    if (!updatedWorldData){
      return res.recordNotFound();
    }
    return res.success({ data:updatedWorldData });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete document of WorldData from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted WorldData. {status, message, data}
 */
const deleteWorldData = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    let deletedWorldData;
    if (req.body.isWarning) { 
      deletedWorldData = await deleteDependentService.countWorldData(query);
    } else {
      deletedWorldData = await deleteDependentService.deleteWorldData(query);
    }
    if (!deletedWorldData){
      return res.recordNotFound();
    }
    return res.success({ data :deletedWorldData });
  }
  catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete documents of WorldData in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyWorldData = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    let deletedWorldData;
    if (req.body.isWarning) {
      deletedWorldData = await deleteDependentService.countWorldData(query);
    }
    else {
      deletedWorldData = await deleteDependentService.deleteWorldData(query);
    }
    if (!deletedWorldData){
      return res.recordNotFound();
    }
    return res.success({ data :deletedWorldData });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : deactivate multiple documents of WorldData from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of WorldData.
 * @return {Object} : number of deactivated documents of WorldData. {status, message, data}
 */
const softDeleteManyWorldData = async (req,res) => {
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
    let updatedWorldData = await deleteDependentService.softDeleteWorldData(query, updateBody);
    if (!updatedWorldData) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedWorldData });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addWorldData,
  bulkInsertWorldData,
  findAllWorldData,
  getWorldData,
  getWorldDataCount,
  updateWorldData,
  bulkUpdateWorldData,
  partialUpdateWorldData,
  softDeleteWorldData,
  deleteWorldData,
  deleteManyWorldData,
  softDeleteManyWorldData    
};
/**
 * clusterController.js
 * @description : exports action methods for cluster.
 */

const Cluster = require('../../../model/cluster');
const clusterSchemaKey = require('../../../utils/validation/clusterValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const deleteDependentService = require('../../../utils/deleteDependent');
const utils = require('../../../utils/common');
   
/**
 * @description : create document of Cluster in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Cluster. {status, message, data}
 */ 
const addCluster = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      clusterSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Cluster(dataToCreate);
    let createdCluster = await dbService.create(Cluster,dataToCreate);
    return res.success({ data : createdCluster });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Cluster in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Clusters. {status, message, data}
 */
const bulkInsertCluster = async (req,res)=>{
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
    let createdClusters = await dbService.create(Cluster,dataToCreate);
    createdClusters = { count: createdClusters ? createdClusters.length : 0 };
    return res.success({ data:{ count:createdClusters.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Cluster from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Cluster(s). {status, message, data}
 */
const findAllCluster = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      clusterSchemaKey.findFilterKeys,
      Cluster.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Cluster, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundClusters = await dbService.paginate( Cluster,query,options);
    if (!foundClusters || !foundClusters.data || !foundClusters.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundClusters });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Cluster from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Cluster. {status, message, data}
 */
const getCluster = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundCluster = await dbService.findOne(Cluster,query, options);
    if (!foundCluster){
      return res.recordNotFound();
    }
    return res.success({ data :foundCluster });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Cluster.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getClusterCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      clusterSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedCluster = await dbService.count(Cluster,where);
    return res.success({ data : { count: countedCluster } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Cluster with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Cluster.
 * @return {Object} : updated Cluster. {status, message, data}
 */
const updateCluster = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      clusterSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedCluster = await dbService.updateOne(Cluster,query,dataToUpdate);
    if (!updatedCluster){
      return res.recordNotFound();
    }
    return res.success({ data :updatedCluster });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Cluster with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Clusters.
 * @return {Object} : updated Clusters. {status, message, data}
 */
const bulkUpdateCluster = async (req,res)=>{
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
    let updatedCluster = await dbService.updateMany(Cluster,filter,dataToUpdate);
    if (!updatedCluster){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedCluster } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Cluster with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Cluster.
 * @return {obj} : updated Cluster. {status, message, data}
 */
const partialUpdateCluster = async (req,res) => {
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
      clusterSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedCluster = await dbService.updateOne(Cluster, query, dataToUpdate);
    if (!updatedCluster) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedCluster });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : deactivate document of Cluster from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Cluster.
 * @return {Object} : deactivated Cluster. {status, message, data}
 */
const softDeleteCluster = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedCluster = await deleteDependentService.softDeleteCluster(query, updateBody);
    if (!updatedCluster){
      return res.recordNotFound();
    }
    return res.success({ data:updatedCluster });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete document of Cluster from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Cluster. {status, message, data}
 */
const deleteCluster = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    let deletedCluster;
    if (req.body.isWarning) { 
      deletedCluster = await deleteDependentService.countCluster(query);
    } else {
      deletedCluster = await deleteDependentService.deleteCluster(query);
    }
    if (!deletedCluster){
      return res.recordNotFound();
    }
    return res.success({ data :deletedCluster });
  }
  catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete documents of Cluster in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyCluster = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    let deletedCluster;
    if (req.body.isWarning) {
      deletedCluster = await deleteDependentService.countCluster(query);
    }
    else {
      deletedCluster = await deleteDependentService.deleteCluster(query);
    }
    if (!deletedCluster){
      return res.recordNotFound();
    }
    return res.success({ data :deletedCluster });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : deactivate multiple documents of Cluster from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Cluster.
 * @return {Object} : number of deactivated documents of Cluster. {status, message, data}
 */
const softDeleteManyCluster = async (req,res) => {
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
    let updatedCluster = await deleteDependentService.softDeleteCluster(query, updateBody);
    if (!updatedCluster) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedCluster });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addCluster,
  bulkInsertCluster,
  findAllCluster,
  getCluster,
  getClusterCount,
  updateCluster,
  bulkUpdateCluster,
  partialUpdateCluster,
  softDeleteCluster,
  deleteCluster,
  deleteManyCluster,
  softDeleteManyCluster    
};
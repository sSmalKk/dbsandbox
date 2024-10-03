/**
 * Modelos_chemistry_SubstancesController.js
 * @description : exports action methods for Modelos_chemistry_Substances.
 */

const Modelos_chemistry_Substances = require('../../../model/Modelos_chemistry_Substances');
const Modelos_chemistry_SubstancesSchemaKey = require('../../../utils/validation/Modelos_chemistry_SubstancesValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../../utils/common');
   
/**
 * @description : create document of Modelos_chemistry_Substances in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Modelos_chemistry_Substances. {status, message, data}
 */ 
const addModelos_chemistry_Substances = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      Modelos_chemistry_SubstancesSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Modelos_chemistry_Substances(dataToCreate);
    let createdModelos_chemistry_Substances = await dbService.create(Modelos_chemistry_Substances,dataToCreate);
    return res.success({ data : createdModelos_chemistry_Substances });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Modelos_chemistry_Substances in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Modelos_chemistry_Substancess. {status, message, data}
 */
const bulkInsertModelos_chemistry_Substances = async (req,res)=>{
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
    let createdModelos_chemistry_Substancess = await dbService.create(Modelos_chemistry_Substances,dataToCreate);
    createdModelos_chemistry_Substancess = { count: createdModelos_chemistry_Substancess ? createdModelos_chemistry_Substancess.length : 0 };
    return res.success({ data:{ count:createdModelos_chemistry_Substancess.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Modelos_chemistry_Substances from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Modelos_chemistry_Substances(s). {status, message, data}
 */
const findAllModelos_chemistry_Substances = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Modelos_chemistry_SubstancesSchemaKey.findFilterKeys,
      Modelos_chemistry_Substances.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Modelos_chemistry_Substances, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundModelos_chemistry_Substancess = await dbService.paginate( Modelos_chemistry_Substances,query,options);
    if (!foundModelos_chemistry_Substancess || !foundModelos_chemistry_Substancess.data || !foundModelos_chemistry_Substancess.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundModelos_chemistry_Substancess });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Modelos_chemistry_Substances from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Modelos_chemistry_Substances. {status, message, data}
 */
const getModelos_chemistry_Substances = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundModelos_chemistry_Substances = await dbService.findOne(Modelos_chemistry_Substances,query, options);
    if (!foundModelos_chemistry_Substances){
      return res.recordNotFound();
    }
    return res.success({ data :foundModelos_chemistry_Substances });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Modelos_chemistry_Substances.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getModelos_chemistry_SubstancesCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Modelos_chemistry_SubstancesSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedModelos_chemistry_Substances = await dbService.count(Modelos_chemistry_Substances,where);
    return res.success({ data : { count: countedModelos_chemistry_Substances } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Modelos_chemistry_Substances with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Modelos_chemistry_Substances.
 * @return {Object} : updated Modelos_chemistry_Substances. {status, message, data}
 */
const updateModelos_chemistry_Substances = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      Modelos_chemistry_SubstancesSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedModelos_chemistry_Substances = await dbService.updateOne(Modelos_chemistry_Substances,query,dataToUpdate);
    if (!updatedModelos_chemistry_Substances){
      return res.recordNotFound();
    }
    return res.success({ data :updatedModelos_chemistry_Substances });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Modelos_chemistry_Substances with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Modelos_chemistry_Substancess.
 * @return {Object} : updated Modelos_chemistry_Substancess. {status, message, data}
 */
const bulkUpdateModelos_chemistry_Substances = async (req,res)=>{
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
    let updatedModelos_chemistry_Substances = await dbService.updateMany(Modelos_chemistry_Substances,filter,dataToUpdate);
    if (!updatedModelos_chemistry_Substances){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedModelos_chemistry_Substances } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Modelos_chemistry_Substances with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Modelos_chemistry_Substances.
 * @return {obj} : updated Modelos_chemistry_Substances. {status, message, data}
 */
const partialUpdateModelos_chemistry_Substances = async (req,res) => {
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
      Modelos_chemistry_SubstancesSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedModelos_chemistry_Substances = await dbService.updateOne(Modelos_chemistry_Substances, query, dataToUpdate);
    if (!updatedModelos_chemistry_Substances) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedModelos_chemistry_Substances });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Modelos_chemistry_Substances from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Modelos_chemistry_Substances.
 * @return {Object} : deactivated Modelos_chemistry_Substances. {status, message, data}
 */
const softDeleteModelos_chemistry_Substances = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedModelos_chemistry_Substances = await dbService.updateOne(Modelos_chemistry_Substances, query, updateBody);
    if (!updatedModelos_chemistry_Substances){
      return res.recordNotFound();
    }
    return res.success({ data:updatedModelos_chemistry_Substances });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Modelos_chemistry_Substances from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Modelos_chemistry_Substances. {status, message, data}
 */
const deleteModelos_chemistry_Substances = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedModelos_chemistry_Substances = await dbService.deleteOne(Modelos_chemistry_Substances, query);
    if (!deletedModelos_chemistry_Substances){
      return res.recordNotFound();
    }
    return res.success({ data :deletedModelos_chemistry_Substances });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Modelos_chemistry_Substances in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyModelos_chemistry_Substances = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedModelos_chemistry_Substances = await dbService.deleteMany(Modelos_chemistry_Substances,query);
    if (!deletedModelos_chemistry_Substances){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedModelos_chemistry_Substances } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Modelos_chemistry_Substances from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Modelos_chemistry_Substances.
 * @return {Object} : number of deactivated documents of Modelos_chemistry_Substances. {status, message, data}
 */
const softDeleteManyModelos_chemistry_Substances = async (req,res) => {
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
    let updatedModelos_chemistry_Substances = await dbService.updateMany(Modelos_chemistry_Substances,query, updateBody);
    if (!updatedModelos_chemistry_Substances) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedModelos_chemistry_Substances } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addModelos_chemistry_Substances,
  bulkInsertModelos_chemistry_Substances,
  findAllModelos_chemistry_Substances,
  getModelos_chemistry_Substances,
  getModelos_chemistry_SubstancesCount,
  updateModelos_chemistry_Substances,
  bulkUpdateModelos_chemistry_Substances,
  partialUpdateModelos_chemistry_Substances,
  softDeleteModelos_chemistry_Substances,
  deleteModelos_chemistry_Substances,
  deleteManyModelos_chemistry_Substances,
  softDeleteManyModelos_chemistry_Substances    
};
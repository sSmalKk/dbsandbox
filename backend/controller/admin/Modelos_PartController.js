/**
 * Modelos_PartController.js
 * @description : exports action methods for Modelos_Part.
 */

const Modelos_Part = require('../../model/Modelos_Part');
const Modelos_PartSchemaKey = require('../../utils/validation/Modelos_PartValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../utils/common');
   
/**
 * @description : create document of Modelos_Part in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Modelos_Part. {status, message, data}
 */ 
const addModelos_Part = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      Modelos_PartSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Modelos_Part(dataToCreate);
    let createdModelos_Part = await dbService.create(Modelos_Part,dataToCreate);
    return res.success({ data : createdModelos_Part });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Modelos_Part in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Modelos_Parts. {status, message, data}
 */
const bulkInsertModelos_Part = async (req,res)=>{
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
    let createdModelos_Parts = await dbService.create(Modelos_Part,dataToCreate);
    createdModelos_Parts = { count: createdModelos_Parts ? createdModelos_Parts.length : 0 };
    return res.success({ data:{ count:createdModelos_Parts.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Modelos_Part from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Modelos_Part(s). {status, message, data}
 */
const findAllModelos_Part = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Modelos_PartSchemaKey.findFilterKeys,
      Modelos_Part.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Modelos_Part, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundModelos_Parts = await dbService.paginate( Modelos_Part,query,options);
    if (!foundModelos_Parts || !foundModelos_Parts.data || !foundModelos_Parts.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundModelos_Parts });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Modelos_Part from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Modelos_Part. {status, message, data}
 */
const getModelos_Part = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundModelos_Part = await dbService.findOne(Modelos_Part,query, options);
    if (!foundModelos_Part){
      return res.recordNotFound();
    }
    return res.success({ data :foundModelos_Part });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Modelos_Part.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getModelos_PartCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Modelos_PartSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedModelos_Part = await dbService.count(Modelos_Part,where);
    return res.success({ data : { count: countedModelos_Part } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Modelos_Part with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Modelos_Part.
 * @return {Object} : updated Modelos_Part. {status, message, data}
 */
const updateModelos_Part = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      Modelos_PartSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedModelos_Part = await dbService.updateOne(Modelos_Part,query,dataToUpdate);
    if (!updatedModelos_Part){
      return res.recordNotFound();
    }
    return res.success({ data :updatedModelos_Part });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Modelos_Part with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Modelos_Parts.
 * @return {Object} : updated Modelos_Parts. {status, message, data}
 */
const bulkUpdateModelos_Part = async (req,res)=>{
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
    let updatedModelos_Part = await dbService.updateMany(Modelos_Part,filter,dataToUpdate);
    if (!updatedModelos_Part){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedModelos_Part } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Modelos_Part with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Modelos_Part.
 * @return {obj} : updated Modelos_Part. {status, message, data}
 */
const partialUpdateModelos_Part = async (req,res) => {
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
      Modelos_PartSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedModelos_Part = await dbService.updateOne(Modelos_Part, query, dataToUpdate);
    if (!updatedModelos_Part) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedModelos_Part });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Modelos_Part from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Modelos_Part.
 * @return {Object} : deactivated Modelos_Part. {status, message, data}
 */
const softDeleteModelos_Part = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedModelos_Part = await dbService.updateOne(Modelos_Part, query, updateBody);
    if (!updatedModelos_Part){
      return res.recordNotFound();
    }
    return res.success({ data:updatedModelos_Part });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Modelos_Part from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Modelos_Part. {status, message, data}
 */
const deleteModelos_Part = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedModelos_Part = await dbService.deleteOne(Modelos_Part, query);
    if (!deletedModelos_Part){
      return res.recordNotFound();
    }
    return res.success({ data :deletedModelos_Part });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Modelos_Part in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyModelos_Part = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedModelos_Part = await dbService.deleteMany(Modelos_Part,query);
    if (!deletedModelos_Part){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedModelos_Part } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Modelos_Part from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Modelos_Part.
 * @return {Object} : number of deactivated documents of Modelos_Part. {status, message, data}
 */
const softDeleteManyModelos_Part = async (req,res) => {
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
    let updatedModelos_Part = await dbService.updateMany(Modelos_Part,query, updateBody);
    if (!updatedModelos_Part) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedModelos_Part } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addModelos_Part,
  bulkInsertModelos_Part,
  findAllModelos_Part,
  getModelos_Part,
  getModelos_PartCount,
  updateModelos_Part,
  bulkUpdateModelos_Part,
  partialUpdateModelos_Part,
  softDeleteModelos_Part,
  deleteModelos_Part,
  deleteManyModelos_Part,
  softDeleteManyModelos_Part    
};
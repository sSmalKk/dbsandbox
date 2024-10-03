/**
 * Modelos_chemistry_elementController.js
 * @description : exports action methods for Modelos_chemistry_element.
 */

const Modelos_chemistry_element = require('../../../model/Modelos_chemistry_element');
const Modelos_chemistry_elementSchemaKey = require('../../../utils/validation/Modelos_chemistry_elementValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../../utils/common');
   
/**
 * @description : create document of Modelos_chemistry_element in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Modelos_chemistry_element. {status, message, data}
 */ 
const addModelos_chemistry_element = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      Modelos_chemistry_elementSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Modelos_chemistry_element(dataToCreate);
    let createdModelos_chemistry_element = await dbService.create(Modelos_chemistry_element,dataToCreate);
    return res.success({ data : createdModelos_chemistry_element });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Modelos_chemistry_element in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Modelos_chemistry_elements. {status, message, data}
 */
const bulkInsertModelos_chemistry_element = async (req,res)=>{
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
    let createdModelos_chemistry_elements = await dbService.create(Modelos_chemistry_element,dataToCreate);
    createdModelos_chemistry_elements = { count: createdModelos_chemistry_elements ? createdModelos_chemistry_elements.length : 0 };
    return res.success({ data:{ count:createdModelos_chemistry_elements.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Modelos_chemistry_element from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Modelos_chemistry_element(s). {status, message, data}
 */
const findAllModelos_chemistry_element = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Modelos_chemistry_elementSchemaKey.findFilterKeys,
      Modelos_chemistry_element.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Modelos_chemistry_element, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundModelos_chemistry_elements = await dbService.paginate( Modelos_chemistry_element,query,options);
    if (!foundModelos_chemistry_elements || !foundModelos_chemistry_elements.data || !foundModelos_chemistry_elements.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundModelos_chemistry_elements });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Modelos_chemistry_element from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Modelos_chemistry_element. {status, message, data}
 */
const getModelos_chemistry_element = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundModelos_chemistry_element = await dbService.findOne(Modelos_chemistry_element,query, options);
    if (!foundModelos_chemistry_element){
      return res.recordNotFound();
    }
    return res.success({ data :foundModelos_chemistry_element });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Modelos_chemistry_element.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getModelos_chemistry_elementCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Modelos_chemistry_elementSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedModelos_chemistry_element = await dbService.count(Modelos_chemistry_element,where);
    return res.success({ data : { count: countedModelos_chemistry_element } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Modelos_chemistry_element with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Modelos_chemistry_element.
 * @return {Object} : updated Modelos_chemistry_element. {status, message, data}
 */
const updateModelos_chemistry_element = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      Modelos_chemistry_elementSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedModelos_chemistry_element = await dbService.updateOne(Modelos_chemistry_element,query,dataToUpdate);
    if (!updatedModelos_chemistry_element){
      return res.recordNotFound();
    }
    return res.success({ data :updatedModelos_chemistry_element });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Modelos_chemistry_element with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Modelos_chemistry_elements.
 * @return {Object} : updated Modelos_chemistry_elements. {status, message, data}
 */
const bulkUpdateModelos_chemistry_element = async (req,res)=>{
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
    let updatedModelos_chemistry_element = await dbService.updateMany(Modelos_chemistry_element,filter,dataToUpdate);
    if (!updatedModelos_chemistry_element){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedModelos_chemistry_element } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Modelos_chemistry_element with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Modelos_chemistry_element.
 * @return {obj} : updated Modelos_chemistry_element. {status, message, data}
 */
const partialUpdateModelos_chemistry_element = async (req,res) => {
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
      Modelos_chemistry_elementSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedModelos_chemistry_element = await dbService.updateOne(Modelos_chemistry_element, query, dataToUpdate);
    if (!updatedModelos_chemistry_element) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedModelos_chemistry_element });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Modelos_chemistry_element from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Modelos_chemistry_element.
 * @return {Object} : deactivated Modelos_chemistry_element. {status, message, data}
 */
const softDeleteModelos_chemistry_element = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedModelos_chemistry_element = await dbService.updateOne(Modelos_chemistry_element, query, updateBody);
    if (!updatedModelos_chemistry_element){
      return res.recordNotFound();
    }
    return res.success({ data:updatedModelos_chemistry_element });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Modelos_chemistry_element from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Modelos_chemistry_element. {status, message, data}
 */
const deleteModelos_chemistry_element = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedModelos_chemistry_element = await dbService.deleteOne(Modelos_chemistry_element, query);
    if (!deletedModelos_chemistry_element){
      return res.recordNotFound();
    }
    return res.success({ data :deletedModelos_chemistry_element });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Modelos_chemistry_element in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyModelos_chemistry_element = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedModelos_chemistry_element = await dbService.deleteMany(Modelos_chemistry_element,query);
    if (!deletedModelos_chemistry_element){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedModelos_chemistry_element } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Modelos_chemistry_element from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Modelos_chemistry_element.
 * @return {Object} : number of deactivated documents of Modelos_chemistry_element. {status, message, data}
 */
const softDeleteManyModelos_chemistry_element = async (req,res) => {
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
    let updatedModelos_chemistry_element = await dbService.updateMany(Modelos_chemistry_element,query, updateBody);
    if (!updatedModelos_chemistry_element) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedModelos_chemistry_element } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addModelos_chemistry_element,
  bulkInsertModelos_chemistry_element,
  findAllModelos_chemistry_element,
  getModelos_chemistry_element,
  getModelos_chemistry_elementCount,
  updateModelos_chemistry_element,
  bulkUpdateModelos_chemistry_element,
  partialUpdateModelos_chemistry_element,
  softDeleteModelos_chemistry_element,
  deleteModelos_chemistry_element,
  deleteManyModelos_chemistry_element,
  softDeleteManyModelos_chemistry_element    
};
/**
 * user_sectionController.js
 * @description : exports action methods for user_section.
 */

const User_section = require('../../model/user_section');
const user_sectionSchemaKey = require('../../utils/validation/user_sectionValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const deleteDependentService = require('../../utils/deleteDependent');
const utils = require('../../utils/common');
   
/**
 * @description : create document of User_section in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created User_section. {status, message, data}
 */ 
const addUser_section = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    dataToCreate = {
      ...{ 'createdAt':(Date.now()).toString() },
      ...dataToCreate,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      user_sectionSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new User_section(dataToCreate);
    let createdUser_section = await dbService.create(User_section,dataToCreate);
    return res.success({ data : createdUser_section });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of User_section in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created User_sections. {status, message, data}
 */
const bulkInsertUser_section = async (req,res)=>{
  try {
    if (req.body && (!Array.isArray(req.body.data) || req.body.data.length < 1)) {
      return res.badRequest();
    }
    let dataToCreate = [ ...req.body.data ];
    for (let i = 0;i < dataToCreate.length;i++){
      dataToCreate[i] = {
        ...{ 'createdAt':(Date.now()).toString() },
        ...dataToCreate[i],
        addedBy: req.user.id
      };
    }
    let createdUser_sections = await dbService.create(User_section,dataToCreate);
    createdUser_sections = { count: createdUser_sections ? createdUser_sections.length : 0 };
    return res.success({ data:{ count:createdUser_sections.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of User_section from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found User_section(s). {status, message, data}
 */
const findAllUser_section = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      user_sectionSchemaKey.findFilterKeys,
      User_section.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(User_section, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundUser_sections = await dbService.paginate( User_section,query,options);
    if (!foundUser_sections || !foundUser_sections.data || !foundUser_sections.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundUser_sections });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of User_section from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found User_section. {status, message, data}
 */
const getUser_section = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundUser_section = await dbService.findOne(User_section,query, options);
    if (!foundUser_section){
      return res.recordNotFound();
    }
    return res.success({ data :foundUser_section });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of User_section.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getUser_sectionCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      user_sectionSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedUser_section = await dbService.count(User_section,where);
    return res.success({ data : { count: countedUser_section } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of User_section with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated User_section.
 * @return {Object} : updated User_section. {status, message, data}
 */
const updateUser_section = async (req,res) => {
  try {
    let dataToUpdate = {
      ...{ 'updatedAt':(Date.now()).toString() },
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      user_sectionSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedUser_section = await dbService.updateOne(User_section,query,dataToUpdate);
    if (!updatedUser_section){
      return res.recordNotFound();
    }
    return res.success({ data :updatedUser_section });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of User_section with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated User_sections.
 * @return {Object} : updated User_sections. {status, message, data}
 */
const bulkUpdateUser_section = async (req,res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    delete dataToUpdate['addedBy'];
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = { 
        ...{ 'updatedAt':(Date.now()).toString() },
        ...req.body.data,
        updatedBy : req.user.id
      };
    }
    let updatedUser_section = await dbService.updateMany(User_section,filter,dataToUpdate);
    if (!updatedUser_section){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedUser_section } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of User_section with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated User_section.
 * @return {obj} : updated User_section. {status, message, data}
 */
const partialUpdateUser_section = async (req,res) => {
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
      user_sectionSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedUser_section = await dbService.updateOne(User_section, query, dataToUpdate);
    if (!updatedUser_section) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedUser_section });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : deactivate document of User_section from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of User_section.
 * @return {Object} : deactivated User_section. {status, message, data}
 */
const softDeleteUser_section = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedUser_section = await deleteDependentService.softDeleteUser_section(query, updateBody);
    if (!updatedUser_section){
      return res.recordNotFound();
    }
    return res.success({ data:updatedUser_section });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete document of User_section from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted User_section. {status, message, data}
 */
const deleteUser_section = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    let deletedUser_section;
    if (req.body.isWarning) { 
      deletedUser_section = await deleteDependentService.countUser_section(query);
    } else {
      deletedUser_section = await deleteDependentService.deleteUser_section(query);
    }
    if (!deletedUser_section){
      return res.recordNotFound();
    }
    return res.success({ data :deletedUser_section });
  }
  catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete documents of User_section in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyUser_section = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    let deletedUser_section;
    if (req.body.isWarning) {
      deletedUser_section = await deleteDependentService.countUser_section(query);
    }
    else {
      deletedUser_section = await deleteDependentService.deleteUser_section(query);
    }
    if (!deletedUser_section){
      return res.recordNotFound();
    }
    return res.success({ data :deletedUser_section });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : deactivate multiple documents of User_section from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of User_section.
 * @return {Object} : number of deactivated documents of User_section. {status, message, data}
 */
const softDeleteManyUser_section = async (req,res) => {
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
    let updatedUser_section = await deleteDependentService.softDeleteUser_section(query, updateBody);
    if (!updatedUser_section) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedUser_section });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addUser_section,
  bulkInsertUser_section,
  findAllUser_section,
  getUser_section,
  getUser_sectionCount,
  updateUser_section,
  bulkUpdateUser_section,
  partialUpdateUser_section,
  softDeleteUser_section,
  deleteUser_section,
  deleteManyUser_section,
  softDeleteManyUser_section    
};
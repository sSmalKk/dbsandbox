/**
 * wallpaperController.js
 * @description : exports action methods for wallpaper.
 */

const Wallpaper = require('../../../model/wallpaper');
const wallpaperSchemaKey = require('../../../utils/validation/wallpaperValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../../utils/common');
   
/**
 * @description : create document of Wallpaper in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Wallpaper. {status, message, data}
 */ 
const addWallpaper = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      wallpaperSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Wallpaper(dataToCreate);
    let createdWallpaper = await dbService.create(Wallpaper,dataToCreate);
    return res.success({ data : createdWallpaper });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Wallpaper in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Wallpapers. {status, message, data}
 */
const bulkInsertWallpaper = async (req,res)=>{
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
    let createdWallpapers = await dbService.create(Wallpaper,dataToCreate);
    createdWallpapers = { count: createdWallpapers ? createdWallpapers.length : 0 };
    return res.success({ data:{ count:createdWallpapers.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Wallpaper from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Wallpaper(s). {status, message, data}
 */
const findAllWallpaper = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      wallpaperSchemaKey.findFilterKeys,
      Wallpaper.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Wallpaper, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundWallpapers = await dbService.paginate( Wallpaper,query,options);
    if (!foundWallpapers || !foundWallpapers.data || !foundWallpapers.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundWallpapers });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Wallpaper from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Wallpaper. {status, message, data}
 */
const getWallpaper = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundWallpaper = await dbService.findOne(Wallpaper,query, options);
    if (!foundWallpaper){
      return res.recordNotFound();
    }
    return res.success({ data :foundWallpaper });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Wallpaper.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getWallpaperCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      wallpaperSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedWallpaper = await dbService.count(Wallpaper,where);
    return res.success({ data : { count: countedWallpaper } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Wallpaper with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Wallpaper.
 * @return {Object} : updated Wallpaper. {status, message, data}
 */
const updateWallpaper = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      wallpaperSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedWallpaper = await dbService.updateOne(Wallpaper,query,dataToUpdate);
    if (!updatedWallpaper){
      return res.recordNotFound();
    }
    return res.success({ data :updatedWallpaper });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Wallpaper with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Wallpapers.
 * @return {Object} : updated Wallpapers. {status, message, data}
 */
const bulkUpdateWallpaper = async (req,res)=>{
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
    let updatedWallpaper = await dbService.updateMany(Wallpaper,filter,dataToUpdate);
    if (!updatedWallpaper){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedWallpaper } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Wallpaper with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Wallpaper.
 * @return {obj} : updated Wallpaper. {status, message, data}
 */
const partialUpdateWallpaper = async (req,res) => {
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
      wallpaperSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedWallpaper = await dbService.updateOne(Wallpaper, query, dataToUpdate);
    if (!updatedWallpaper) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedWallpaper });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Wallpaper from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Wallpaper.
 * @return {Object} : deactivated Wallpaper. {status, message, data}
 */
const softDeleteWallpaper = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedWallpaper = await dbService.updateOne(Wallpaper, query, updateBody);
    if (!updatedWallpaper){
      return res.recordNotFound();
    }
    return res.success({ data:updatedWallpaper });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Wallpaper from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Wallpaper. {status, message, data}
 */
const deleteWallpaper = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedWallpaper = await dbService.deleteOne(Wallpaper, query);
    if (!deletedWallpaper){
      return res.recordNotFound();
    }
    return res.success({ data :deletedWallpaper });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Wallpaper in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyWallpaper = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedWallpaper = await dbService.deleteMany(Wallpaper,query);
    if (!deletedWallpaper){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedWallpaper } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Wallpaper from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Wallpaper.
 * @return {Object} : number of deactivated documents of Wallpaper. {status, message, data}
 */
const softDeleteManyWallpaper = async (req,res) => {
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
    let updatedWallpaper = await dbService.updateMany(Wallpaper,query, updateBody);
    if (!updatedWallpaper) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedWallpaper } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addWallpaper,
  bulkInsertWallpaper,
  findAllWallpaper,
  getWallpaper,
  getWallpaperCount,
  updateWallpaper,
  bulkUpdateWallpaper,
  partialUpdateWallpaper,
  softDeleteWallpaper,
  deleteWallpaper,
  deleteManyWallpaper,
  softDeleteManyWallpaper    
};
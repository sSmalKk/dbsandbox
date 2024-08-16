/**
 * RoomController.js
 * @description : exports action methods for Room.
 */

const Room = require('../../model/Room');
const RoomSchemaKey = require('../../utils/validation/RoomValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../utils/common');
   
/**
 * @description : create document of Room in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Room. {status, message, data}
 */ 
const addRoom = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    dataToCreate = {
      ...{
        'createdAt':(Date.now()).toString(),
        'addedBy':(req && req.user && req.user.id ? req.user.id.toString() : null)
      },
      ...dataToCreate,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      RoomSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Room(dataToCreate);
    let createdRoom = await dbService.create(Room,dataToCreate);
    return res.success({ data : createdRoom });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Room in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Rooms. {status, message, data}
 */
const bulkInsertRoom = async (req,res)=>{
  try {
    if (req.body && (!Array.isArray(req.body.data) || req.body.data.length < 1)) {
      return res.badRequest();
    }
    let dataToCreate = [ ...req.body.data ];
    for (let i = 0;i < dataToCreate.length;i++){
      dataToCreate[i] = {
        ...{
          'createdAt':(Date.now()).toString(),
          'addedBy':(req && req.user && req.user.id ? req.user.id.toString() : null)
        },
        ...dataToCreate[i],
        addedBy: req.user.id
      };
    }
    let createdRooms = await dbService.create(Room,dataToCreate);
    createdRooms = { count: createdRooms ? createdRooms.length : 0 };
    return res.success({ data:{ count:createdRooms.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Room from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Room(s). {status, message, data}
 */
const findAllRoom = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      RoomSchemaKey.findFilterKeys,
      Room.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Room, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundRooms = await dbService.paginate( Room,query,options);
    if (!foundRooms || !foundRooms.data || !foundRooms.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundRooms });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Room from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Room. {status, message, data}
 */
const getRoom = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundRoom = await dbService.findOne(Room,query, options);
    if (!foundRoom){
      return res.recordNotFound();
    }
    return res.success({ data :foundRoom });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Room.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getRoomCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      RoomSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedRoom = await dbService.count(Room,where);
    return res.success({ data : { count: countedRoom } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Room with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Room.
 * @return {Object} : updated Room. {status, message, data}
 */
const updateRoom = async (req,res) => {
  try {
    let dataToUpdate = {
      ...{
        'updatedAt':(Date.now()).toString(),
        'updatedBy':(req && req.user && req.user.id ? req.user.id.toString() : null)
      },
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      RoomSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedRoom = await dbService.updateOne(Room,query,dataToUpdate);
    if (!updatedRoom){
      return res.recordNotFound();
    }
    return res.success({ data :updatedRoom });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Room with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Rooms.
 * @return {Object} : updated Rooms. {status, message, data}
 */
const bulkUpdateRoom = async (req,res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    delete dataToUpdate['addedBy'];
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = { 
        ...{
          'updatedAt':(Date.now()).toString(),
          'updatedBy':(req && req.user && req.user.id ? req.user.id.toString() : null)
        },
        ...req.body.data,
        updatedBy : req.user.id
      };
    }
    let updatedRoom = await dbService.updateMany(Room,filter,dataToUpdate);
    if (!updatedRoom){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedRoom } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Room with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Room.
 * @return {obj} : updated Room. {status, message, data}
 */
const partialUpdateRoom = async (req,res) => {
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
      RoomSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedRoom = await dbService.updateOne(Room, query, dataToUpdate);
    if (!updatedRoom) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedRoom });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Room from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Room.
 * @return {Object} : deactivated Room. {status, message, data}
 */
const softDeleteRoom = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedRoom = await dbService.updateOne(Room, query, updateBody);
    if (!updatedRoom){
      return res.recordNotFound();
    }
    return res.success({ data:updatedRoom });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Room from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Room. {status, message, data}
 */
const deleteRoom = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedRoom = await dbService.deleteOne(Room, query);
    if (!deletedRoom){
      return res.recordNotFound();
    }
    return res.success({ data :deletedRoom });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Room in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyRoom = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedRoom = await dbService.deleteMany(Room,query);
    if (!deletedRoom){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedRoom } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Room from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Room.
 * @return {Object} : number of deactivated documents of Room. {status, message, data}
 */
const softDeleteManyRoom = async (req,res) => {
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
    let updatedRoom = await dbService.updateMany(Room,query, updateBody);
    if (!updatedRoom) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedRoom } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addRoom,
  bulkInsertRoom,
  findAllRoom,
  getRoom,
  getRoomCount,
  updateRoom,
  bulkUpdateRoom,
  partialUpdateRoom,
  softDeleteRoom,
  deleteRoom,
  deleteManyRoom,
  softDeleteManyRoom    
};
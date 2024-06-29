/**
 * userValidation.js
 * @description :: validate each post and put request as per user model
 */

const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('./commonFilterValidation');
const authConstantDefault = require('../../constants/authConstant');    
const userDefault = require('../../constants/user');    
const { USER_TYPES } = require('../../constants/authConstant');
const { convertObjectToEnum } = require('../common');   

/** validation keys and properties of user */
exports.schemaKeys = joi.object({
  username: joi.string().allow(null).allow(''),
  password: joi.string().allow(null).allow(''),
  email: joi.string().allow(null).allow(''),
  name: joi.string().allow(null).allow(''),
  userType: joi.number().allow(0),
  isActive: joi.boolean(),
  isDeleted: joi.boolean(),
  righthand: joi.string().allow(null).allow(''),
  lefthand: joi.string().allow(null).allow(''),
  equipedeitens: joi.string().allow(null).allow(''),
  x: joi.number().integer().allow(0),
  y: joi.number().integer().allow(0),
  z: joi.number().integer().allow(0),
  location: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  universe: joi.string().allow(null).allow(''),
  data: joi.object(),
  apearances: joi.array().items(joi.object()),
  status: joi.string().allow(null).allow(''),
  mobileNo: joi.string().allow(null).allow(''),
  resetPasswordLink: joi.object({
    code:joi.string(),
    expireTime:joi.date().options({ convert: true })
  })
}).unknown(true);

/** validation keys and properties of user for updation */
exports.updateSchemaKeys = joi.object({
  username: joi.string().allow(null).allow(''),
  password: joi.string().allow(null).allow(''),
  email: joi.string().allow(null).allow(''),
  name: joi.string().allow(null).allow(''),
  userType: joi.number().allow(0),
  isActive: joi.boolean(),
  isDeleted: joi.boolean(),
  righthand: joi.string().allow(null).allow(''),
  lefthand: joi.string().allow(null).allow(''),
  equipedeitens: joi.string().allow(null).allow(''),
  x: joi.number().integer().allow(0),
  y: joi.number().integer().allow(0),
  z: joi.number().integer().allow(0),
  location: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  universe: joi.string().allow(null).allow(''),
  data: joi.object(),
  apearances: joi.array().items(joi.object()),
  status: joi.string().allow(null).allow(''),
  mobileNo: joi.string().allow(null).allow(''),
  resetPasswordLink: joi.object({
    code:joi.string(),
    expireTime:joi.date().options({ convert: true })
  }),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of user for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      username: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      password: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      email: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      righthand: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      lefthand: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      equipedeitens: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      x: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      y: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      z: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      location: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      universe: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      data: joi.alternatives().try(joi.array().items(),joi.object(),joi.object()),
      mobileNo: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      id: joi.any(),
      _id: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object())
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  populate: joi.array().items(populate),
  select: select
    
}).unknown(true);

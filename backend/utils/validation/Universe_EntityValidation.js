/**
 * Universe_EntityValidation.js
 * @description :: validate each post and put request as per Universe_Entity model
 */

const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('./commonFilterValidation');

/** validation keys and properties of Universe_Entity */
exports.schemaKeys = joi.object({
  Name: joi.string().allow(null).allow(''),
  Description: joi.string().allow(null).allow(''),
  Location: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  X: joi.string().allow(null).allow(''),
  Y: joi.string().allow(null).allow(''),
  Z: joi.string().allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  Universe: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  Model: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  Rules: joi.array().items(),
  Tags: joi.array().items(),
  chemsData: joi.object()
}).unknown(true);

/** validation keys and properties of Universe_Entity for updation */
exports.updateSchemaKeys = joi.object({
  Name: joi.string().allow(null).allow(''),
  Description: joi.string().allow(null).allow(''),
  Location: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  X: joi.string().allow(null).allow(''),
  Y: joi.string().allow(null).allow(''),
  Z: joi.string().allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  Universe: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  Model: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  Rules: joi.array().items(),
  Tags: joi.array().items(),
  chemsData: joi.object(),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of Universe_Entity for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      Name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      Description: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      Location: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      X: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      Y: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      Z: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      Universe: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      Model: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      Rules: joi.alternatives().try(joi.array().items(),joi.array().items(),joi.object()),
      Tags: joi.alternatives().try(joi.array().items(),joi.array().items(),joi.object()),
      chemsData: joi.alternatives().try(joi.array().items(),joi.object(),joi.object()),
      id: joi.any(),
      _id: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object())
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  populate: joi.array().items(populate),
  select: select
    
}).unknown(true);

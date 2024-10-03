/**
 * Modelos_EntityValidation.js
 * @description :: validate each post and put request as per Modelos_Entity model
 */

const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('./commonFilterValidation');

/** validation keys and properties of Modelos_Entity */
exports.schemaKeys = joi.object({
  Name: joi.string().allow(null).allow(''),
  Description: joi.string().allow(null).allow(''),
  data: joi.object(),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  model: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  Rules: joi.array().items(),
  Tags: joi.array().items(),
  Size: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  Location: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  chemsData: joi.object()
}).unknown(true);

/** validation keys and properties of Modelos_Entity for updation */
exports.updateSchemaKeys = joi.object({
  Name: joi.string().allow(null).allow(''),
  Description: joi.string().allow(null).allow(''),
  data: joi.object(),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  model: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  Rules: joi.array().items(),
  Tags: joi.array().items(),
  Size: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  Location: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  chemsData: joi.object(),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of Modelos_Entity for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      Name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      Description: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      data: joi.alternatives().try(joi.array().items(),joi.object(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      model: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      Rules: joi.alternatives().try(joi.array().items(),joi.array().items(),joi.object()),
      Tags: joi.alternatives().try(joi.array().items(),joi.array().items(),joi.object()),
      Size: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      Location: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      chemsData: joi.alternatives().try(joi.array().items(),joi.object(),joi.object()),
      id: joi.any(),
      _id: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object())
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  populate: joi.array().items(populate),
  select: select
    
}).unknown(true);

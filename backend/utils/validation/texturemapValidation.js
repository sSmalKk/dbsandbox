/**
 * texturemapValidation.js
 * @description :: validate each post and put request as per texturemap model
 */

const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('./commonFilterValidation');

/** validation keys and properties of texturemap */
exports.schemaKeys = joi.object({
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  main: joi.string().allow(null).allow(''),
  variable: joi.array().items(),
  name: joi.string().allow(null).allow(''),
  description: joi.string().allow(null).allow('')
}).unknown(true);

/** validation keys and properties of texturemap for updation */
exports.updateSchemaKeys = joi.object({
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  main: joi.string().allow(null).allow(''),
  variable: joi.array().items(),
  name: joi.string().allow(null).allow(''),
  description: joi.string().allow(null).allow(''),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of texturemap for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      main: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      variable: joi.alternatives().try(joi.array().items(),joi.array().items(),joi.object()),
      name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      description: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      id: joi.any(),
      _id: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object())
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  populate: joi.array().items(populate),
  select: select
    
}).unknown(true);

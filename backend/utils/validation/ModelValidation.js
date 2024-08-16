/**
 * ModelValidation.js
 * @description :: validate each post and put request as per Model model
 */

const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('./commonFilterValidation');

/** validation keys and properties of Model */
exports.schemaKeys = joi.object({
  Name: joi.string().allow(null).allow(''),
  Voxel: joi.array().items(),
  isDeleted: joi.boolean(),
  isActive: joi.boolean()
}).unknown(true);

/** validation keys and properties of Model for updation */
exports.updateSchemaKeys = joi.object({
  Name: joi.string().allow(null).allow(''),
  Voxel: joi.array().items(),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of Model for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      Name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      Voxel: joi.alternatives().try(joi.array().items(),joi.array().items(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any(),
      _id: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object())
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  populate: joi.array().items(populate),
  select: select
    
}).unknown(true);
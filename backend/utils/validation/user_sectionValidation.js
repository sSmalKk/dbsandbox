/**
 * user_sectionValidation.js
 * @description :: validate each post and put request as per user_section model
 */

const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('./commonFilterValidation');

/** validation keys and properties of user_section */
exports.schemaKeys = joi.object({
  user: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  universe: joi.string().allow(null).allow(''),
  location: joi.string().allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  data: joi.string().allow(null).allow('')
}).unknown(true);

/** validation keys and properties of user_section for updation */
exports.updateSchemaKeys = joi.object({
  user: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  universe: joi.string().allow(null).allow(''),
  location: joi.string().allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  data: joi.string().allow(null).allow(''),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of user_section for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      user: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      universe: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      location: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      data: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      id: joi.any(),
      _id: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object())
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  populate: joi.array().items(populate),
  select: select
    
}).unknown(true);

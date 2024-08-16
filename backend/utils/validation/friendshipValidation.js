/**
 * friendshipValidation.js
 * @description :: validate each post and put request as per friendship model
 */

const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('./commonFilterValidation');

/** validation keys and properties of friendship */
exports.schemaKeys = joi.object({
  usera: joi.string().allow(null).allow(''),
  userb: joi.string().allow(null).allow(''),
  chat: joi.string().allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean().default(true),
  trust: joi.boolean()
}).unknown(true);

/** validation keys and properties of friendship for updation */
exports.updateSchemaKeys = joi.object({
  usera: joi.string().allow(null).allow(''),
  userb: joi.string().allow(null).allow(''),
  chat: joi.string().allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean().default(true),
  trust: joi.boolean(),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of friendship for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      usera: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      userb: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      chat: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      trust: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any(),
      _id: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object())
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  populate: joi.array().items(populate),
  select: select
    
}).unknown(true);

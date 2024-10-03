/**
 * Modelos_PartValidation.js
 * @description :: validate each post and put request as per Modelos_Part model
 */

const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('./commonFilterValidation');

/** validation keys and properties of Modelos_Part */
exports.schemaKeys = joi.object({
  name: joi.string().allow(null).allow(''),
  description: joi.string().allow(null).allow(''),
  tag: joi.string().allow(null).allow(''),
  texture: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  data: joi.array().items(),
  Rules: joi.array().items(),
  Tags: joi.array().items(),
  chunk: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow('')
}).unknown(true);

/** validation keys and properties of Modelos_Part for updation */
exports.updateSchemaKeys = joi.object({
  name: joi.string().allow(null).allow(''),
  description: joi.string().allow(null).allow(''),
  tag: joi.string().allow(null).allow(''),
  texture: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  data: joi.array().items(),
  Rules: joi.array().items(),
  Tags: joi.array().items(),
  chunk: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of Modelos_Part for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      description: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      tag: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      texture: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      data: joi.alternatives().try(joi.array().items(),joi.array().items(),joi.object()),
      Rules: joi.alternatives().try(joi.array().items(),joi.array().items(),joi.object()),
      Tags: joi.alternatives().try(joi.array().items(),joi.array().items(),joi.object()),
      chunk: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      id: joi.any(),
      _id: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object())
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  populate: joi.array().items(populate),
  select: select
    
}).unknown(true);

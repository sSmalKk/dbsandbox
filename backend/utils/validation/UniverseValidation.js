/**
 * UniverseValidation.js
 * @description :: validate each post and put request as per Universe model
 */

const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('./commonFilterValidation');

/** validation keys and properties of Universe */
exports.schemaKeys = joi.object({
  isDeleted: joi.boolean(),
  tick: joi.number().integer().allow(0),
  name: joi.string().allow(null).allow(''),
  date: joi.date().options({ convert: true }).allow(null).allow(''),
  data: joi.array().items(),
  running: joi.boolean().default(false),
  created: joi.boolean().default(false),
  seed: joi.string().allow(null).allow('')
}).unknown(true);

/** validation keys and properties of Universe for updation */
exports.updateSchemaKeys = joi.object({
  isDeleted: joi.boolean(),
  tick: joi.number().integer().allow(0),
  name: joi.string().allow(null).allow(''),
  date: joi.date().options({ convert: true }).allow(null).allow(''),
  data: joi.array().items(),
  running: joi.boolean().default(false),
  created: joi.boolean().default(false),
  seed: joi.string().allow(null).allow(''),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of Universe for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      tick: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      date: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      data: joi.alternatives().try(joi.array().items(),joi.array().items(),joi.object()),
      running: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      created: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      seed: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      id: joi.any(),
      _id: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object())
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  populate: joi.array().items(populate),
  select: select
    
}).unknown(true);

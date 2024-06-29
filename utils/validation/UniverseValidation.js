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
  name: joi.string().allow(null).allow(''),
  description: joi.string().allow(null).allow(''),
  settings: joi.array().items(joi.object()),
  isActive: joi.boolean(),
  isDeleted: joi.boolean(),
  universeData: joi.object({ teste:joi.string() }),
  pattern: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  code: joi.string().allow(null).allow(''),
  innerDim: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  God: joi.string().allow(null).allow(''),
  adms: joi.array().items(),
  helper: joi.array().items(),
  players: joi.array().items(),
  sizeMax: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  size: joi.number().integer().allow(0)
}).unknown(true);

/** validation keys and properties of Universe for updation */
exports.updateSchemaKeys = joi.object({
  name: joi.string().allow(null).allow(''),
  description: joi.string().allow(null).allow(''),
  settings: joi.array().items(joi.object()),
  isActive: joi.boolean(),
  isDeleted: joi.boolean(),
  universeData: joi.object({ teste:joi.string() }),
  pattern: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  code: joi.string().allow(null).allow(''),
  innerDim: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  God: joi.string().allow(null).allow(''),
  adms: joi.array().items(),
  helper: joi.array().items(),
  players: joi.array().items(),
  sizeMax: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  size: joi.number().integer().allow(0),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of Universe for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      description: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      universeData: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      pattern: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      code: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      innerDim: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      God: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      adms: joi.alternatives().try(joi.array().items(),joi.array().items(),joi.object()),
      helper: joi.alternatives().try(joi.array().items(),joi.array().items(),joi.object()),
      players: joi.alternatives().try(joi.array().items(),joi.array().items(),joi.object()),
      sizeMax: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      size: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      id: joi.any(),
      _id: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object())
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  populate: joi.array().items(populate),
  select: select
    
}).unknown(true);

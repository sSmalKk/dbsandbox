/**
 * Modelos_BiomesValidation.js
 * @description :: validate each post and put request as per Modelos_Biomes model
 */

const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('./commonFilterValidation');

/** validation keys and properties of Modelos_Biomes */
exports.schemaKeys = joi.object({
  name: joi.string().allow(null).allow(''),
  description: joi.string().allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  generation: joi.array().items(joi.object()),
  structures: joi.array().items(),
  data: joi.array().items(),
  entites: joi.string().allow(null).allow(''),
  size: joi.number().integer().allow(0),
  Rules: joi.array().items(),
  Tags: joi.array().items(),
  chemsData: joi.object()
}).unknown(true);

/** validation keys and properties of Modelos_Biomes for updation */
exports.updateSchemaKeys = joi.object({
  name: joi.string().allow(null).allow(''),
  description: joi.string().allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  generation: joi.array().items(joi.object()),
  structures: joi.array().items(),
  data: joi.array().items(),
  entites: joi.string().allow(null).allow(''),
  size: joi.number().integer().allow(0),
  Rules: joi.array().items(),
  Tags: joi.array().items(),
  chemsData: joi.object(),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of Modelos_Biomes for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      description: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      structures: joi.alternatives().try(joi.array().items(),joi.array().items(),joi.object()),
      data: joi.alternatives().try(joi.array().items(),joi.array().items(),joi.object()),
      entites: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      size: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
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

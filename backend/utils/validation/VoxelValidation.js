/**
 * VoxelValidation.js
 * @description :: validate each post and put request as per Voxel model
 */

const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('./commonFilterValidation');

/** validation keys and properties of Voxel */
exports.schemaKeys = joi.object({
  xyz: joi.array().items(),
  globalcoord: joi.string().allow(null).allow(''),
  storage: joi.array().items(joi.object()),
  isDeleted: joi.boolean(),
  data: joi.array().items(joi.object()),
  parent: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  size: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  biome: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  item: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow('')
}).unknown(true);

/** validation keys and properties of Voxel for updation */
exports.updateSchemaKeys = joi.object({
  xyz: joi.array().items(),
  globalcoord: joi.string().allow(null).allow(''),
  storage: joi.array().items(joi.object()),
  isDeleted: joi.boolean(),
  data: joi.array().items(joi.object()),
  parent: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  size: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  biome: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  item: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of Voxel for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      xyz: joi.alternatives().try(joi.array().items(),joi.array().items(),joi.object()),
      globalcoord: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      parent: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      size: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      biome: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      item: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      id: joi.any(),
      _id: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object())
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  populate: joi.array().items(populate),
  select: select
    
}).unknown(true);

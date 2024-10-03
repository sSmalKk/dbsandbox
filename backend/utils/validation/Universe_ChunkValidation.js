/**
 * Universe_ChunkValidation.js
 * @description :: validate each post and put request as per Universe_Chunk model
 */

const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('./commonFilterValidation');

/** validation keys and properties of Universe_Chunk */
exports.schemaKeys = joi.object({
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  x: joi.number().integer().allow(0),
  y: joi.number().integer().allow(0),
  z: joi.number().integer().allow(0),
  p: joi.number().integer().allow(0),
  settings: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  chunk: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  generated: joi.boolean(),
  chat: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  data: joi.array().items(),
  size: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  biome: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  op: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  chemsData: joi.object()
}).unknown(true);

/** validation keys and properties of Universe_Chunk for updation */
exports.updateSchemaKeys = joi.object({
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  x: joi.number().integer().allow(0),
  y: joi.number().integer().allow(0),
  z: joi.number().integer().allow(0),
  p: joi.number().integer().allow(0),
  settings: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  chunk: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  generated: joi.boolean(),
  chat: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  data: joi.array().items(),
  size: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  biome: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  op: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  chemsData: joi.object(),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of Universe_Chunk for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      x: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      y: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      z: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      p: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      settings: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      chunk: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      generated: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      chat: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      data: joi.alternatives().try(joi.array().items(),joi.array().items(),joi.object()),
      size: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      biome: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      op: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      chemsData: joi.alternatives().try(joi.array().items(),joi.object(),joi.object()),
      id: joi.any(),
      _id: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object())
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  populate: joi.array().items(populate),
  select: select
    
}).unknown(true);

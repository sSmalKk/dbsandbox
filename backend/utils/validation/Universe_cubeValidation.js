/**
 * Universe_cubeValidation.js
 * @description :: validate each post and put request as per Universe_cube model
 */

const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('./commonFilterValidation');

/** validation keys and properties of Universe_cube */
exports.schemaKeys = joi.object({
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  x: joi.number().integer().allow(0),
  y: joi.number().integer().allow(0),
  z: joi.number().integer().allow(0),
  p: joi.number().integer().allow(0),
  universe: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  chunk: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  interface: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  storage: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  data: joi.string().allow(null).allow(''),
  Rules: joi.array().items(),
  Tags: joi.array().items(),
  chemsData: joi.object()
}).unknown(true);

/** validation keys and properties of Universe_cube for updation */
exports.updateSchemaKeys = joi.object({
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  x: joi.number().integer().allow(0),
  y: joi.number().integer().allow(0),
  z: joi.number().integer().allow(0),
  p: joi.number().integer().allow(0),
  universe: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  chunk: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  interface: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  storage: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  data: joi.string().allow(null).allow(''),
  Rules: joi.array().items(),
  Tags: joi.array().items(),
  chemsData: joi.object(),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of Universe_cube for filter documents from collection */
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
      universe: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      chunk: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      interface: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      storage: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      data: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
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

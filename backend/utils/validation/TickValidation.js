/**
 * TickValidation.js
 * @description :: validate each post and put request as per Tick model
 */

const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('./commonFilterValidation');

/** validation keys and properties of Tick */
exports.schemaKeys = joi.object({
  isDeleted: joi.boolean(),
  number: joi.number().integer().allow(0),
  initialdate: joi.number().integer().allow(0),
  voxel: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  main: joi.boolean(),
  tickrate: joi.number().integer().allow(0),
  cicle: joi.number().integer().allow(0),
  tickmain: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow('')
}).unknown(true);

/** validation keys and properties of Tick for updation */
exports.updateSchemaKeys = joi.object({
  isDeleted: joi.boolean(),
  number: joi.number().integer().allow(0),
  initialdate: joi.number().integer().allow(0),
  voxel: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  main: joi.boolean(),
  tickrate: joi.number().integer().allow(0),
  cicle: joi.number().integer().allow(0),
  tickmain: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of Tick for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      number: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      initialdate: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      voxel: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      main: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      tickrate: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      cicle: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      tickmain: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      id: joi.any(),
      _id: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object())
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  populate: joi.array().items(populate),
  select: select
    
}).unknown(true);

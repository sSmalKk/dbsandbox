/**
 * Universe_ItemValidation.js
 * @description :: validate each post and put request as per Universe_Item model
 */

const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('./commonFilterValidation');

/** validation keys and properties of Universe_Item */
exports.schemaKeys = joi.object({
  name: joi.string().allow(null).allow(''),
  description: joi.string().allow(null).allow(''),
  x: joi.string().allow(null).allow(''),
  y: joi.string().allow(null).allow(''),
  z: joi.string().allow(null).allow(''),
  data: joi.string().allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  slot: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  cube: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  Rules: joi.array().items(),
  Tags: joi.array().items(),
  chemsData: joi.object()
}).unknown(true);

/** validation keys and properties of Universe_Item for updation */
exports.updateSchemaKeys = joi.object({
  name: joi.string().allow(null).allow(''),
  description: joi.string().allow(null).allow(''),
  x: joi.string().allow(null).allow(''),
  y: joi.string().allow(null).allow(''),
  z: joi.string().allow(null).allow(''),
  data: joi.string().allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  slot: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  cube: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  Rules: joi.array().items(),
  Tags: joi.array().items(),
  chemsData: joi.object(),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of Universe_Item for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      description: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      x: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      y: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      z: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      data: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      slot: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      cube: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
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

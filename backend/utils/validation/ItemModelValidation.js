/**
 * ItemModelValidation.js
 * @description :: validate each post and put request as per ItemModel model
 */

const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('./commonFilterValidation');

/** validation keys and properties of ItemModel */
exports.schemaKeys = joi.object({
  Name: joi.string().allow(null).allow(''),
  Description: joi.string().allow(null).allow(''),
  Data: joi.object(),
  Texture: joi.object(),
  model: joi.object(),
  category: joi.array().items(),
  Pattern: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  storage: joi.object(),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  sizeMax: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  size: joi.number().integer().allow(0)
}).unknown(true);

/** validation keys and properties of ItemModel for updation */
exports.updateSchemaKeys = joi.object({
  Name: joi.string().allow(null).allow(''),
  Description: joi.string().allow(null).allow(''),
  Data: joi.object(),
  Texture: joi.object(),
  model: joi.object(),
  category: joi.array().items(),
  Pattern: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  storage: joi.object(),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  sizeMax: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  size: joi.number().integer().allow(0),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of ItemModel for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      Name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      Description: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      Data: joi.alternatives().try(joi.array().items(),joi.object(),joi.object()),
      Texture: joi.alternatives().try(joi.array().items(),joi.object(),joi.object()),
      model: joi.alternatives().try(joi.array().items(),joi.object(),joi.object()),
      category: joi.alternatives().try(joi.array().items(),joi.array().items(),joi.object()),
      Pattern: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      storage: joi.alternatives().try(joi.array().items(),joi.object(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
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

/**
 * Universe_BlockstateValidation.js
 * @description :: validate each post and put request as per Universe_Blockstate model
 */

const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('./commonFilterValidation');

/** validation keys and properties of Universe_Blockstate */
exports.schemaKeys = joi.object({
  name: joi.string().allow(null).allow(''),
  texture: joi.string().allow(null).allow(''),
  model: joi.string().allow(null).allow(''),
  textures: joi.string().allow(null).allow(''),
  RigidBody: joi.string().allow(null).allow(''),
  RigidBodyType: joi.string().allow(null).allow(''),
  type: joi.number().integer().allow(0),
  isDeleted: joi.boolean()
}).unknown(true);

/** validation keys and properties of Universe_Blockstate for updation */
exports.updateSchemaKeys = joi.object({
  name: joi.string().allow(null).allow(''),
  texture: joi.string().allow(null).allow(''),
  model: joi.string().allow(null).allow(''),
  textures: joi.string().allow(null).allow(''),
  RigidBody: joi.string().allow(null).allow(''),
  RigidBodyType: joi.string().allow(null).allow(''),
  type: joi.number().integer().allow(0),
  isDeleted: joi.boolean(),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of Universe_Blockstate for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      texture: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      model: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      textures: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      RigidBody: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      RigidBodyType: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      type: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any(),
      _id: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object())
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  populate: joi.array().items(populate),
  select: select
    
}).unknown(true);

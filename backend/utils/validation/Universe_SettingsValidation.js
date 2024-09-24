/**
 * Universe_SettingsValidation.js
 * @description :: validate each post and put request as per Universe_Settings model
 */

const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('./commonFilterValidation');

/** validation keys and properties of Universe_Settings */
exports.schemaKeys = joi.object({
  name: joi.string().allow(null).allow(''),
  description: joi.string().allow(null).allow(''),
  isActive: joi.boolean(),
  biomes: joi.array().items(),
  models: joi.array().items(),
  textures: joi.array().items(),
  entity: joi.array().items(),
  createdAt: joi.date().options({ convert: true }).allow(null).allow(''),
  updatedAt: joi.date().options({ convert: true }).allow(null).allow(''),
  addedBy: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  updatedBy: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  ChatGlobal: joi.string().allow(null).allow(''),
  ClanChat: joi.array().items(),
  Blockstate: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  isDeleted: joi.boolean()
}).unknown(true);

/** validation keys and properties of Universe_Settings for updation */
exports.updateSchemaKeys = joi.object({
  name: joi.string().allow(null).allow(''),
  description: joi.string().allow(null).allow(''),
  isActive: joi.boolean(),
  biomes: joi.array().items(),
  models: joi.array().items(),
  textures: joi.array().items(),
  entity: joi.array().items(),
  createdAt: joi.date().options({ convert: true }).allow(null).allow(''),
  updatedAt: joi.date().options({ convert: true }).allow(null).allow(''),
  addedBy: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  updatedBy: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  ChatGlobal: joi.string().allow(null).allow(''),
  ClanChat: joi.array().items(),
  Blockstate: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  isDeleted: joi.boolean(),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of Universe_Settings for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      description: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      biomes: joi.alternatives().try(joi.array().items(),joi.array().items(),joi.object()),
      models: joi.alternatives().try(joi.array().items(),joi.array().items(),joi.object()),
      textures: joi.alternatives().try(joi.array().items(),joi.array().items(),joi.object()),
      entity: joi.alternatives().try(joi.array().items(),joi.array().items(),joi.object()),
      createdAt: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      updatedAt: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      addedBy: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      updatedBy: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      ChatGlobal: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      ClanChat: joi.alternatives().try(joi.array().items(),joi.array().items(),joi.object()),
      Blockstate: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any(),
      _id: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object())
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  populate: joi.array().items(populate),
  select: select
    
}).unknown(true);

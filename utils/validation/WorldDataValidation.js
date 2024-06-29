/**
 * WorldDataValidation.js
 * @description :: validate each post and put request as per WorldData model
 */

const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('./commonFilterValidation');

/** validation keys and properties of WorldData */
exports.schemaKeys = joi.object({
  worlddata: joi.object(),
  settings: joi.object({
    tickUpdate:joi.boolean(),
    Tick:joi.number().integer(),
    data:joi.date().options({ convert: true }),
    tickRate:joi.number().integer(),
    resolution:joi.number().integer(),
    xres:joi.number().integer(),
    yres:joi.number().integer(),
    z:joi.number().integer()
  }).allow(0),
  code: joi.string().required(),
  img: joi.string().allow(null).allow(''),
  title: joi.string().allow(null).allow(''),
  description: joi.string().allow(null).allow(''),
  entitys: joi.array().items(),
  players: joi.array().items(),
  storages: joi.array().items(),
  eventhistory: joi.array().items(),
  isDeleted: joi.boolean(),
  isActive: joi.boolean().default(true),
  x: joi.number().integer().allow(0),
  y: joi.number().integer().allow(0),
  z: joi.number().integer().allow(0),
  l: joi.number().integer().allow(0),
  parentPattern: joi.string().allow(null).allow(''),
  pattern: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  sizeMax: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  size: joi.number().integer().allow(0),
  innerDiminnerDim: joi.string().allow(null).allow('')
}).unknown(true);

/** validation keys and properties of WorldData for updation */
exports.updateSchemaKeys = joi.object({
  worlddata: joi.object(),
  settings: joi.object({
    tickUpdate:joi.boolean(),
    Tick:joi.number().integer(),
    data:joi.date().options({ convert: true }),
    tickRate:joi.number().integer(),
    resolution:joi.number().integer(),
    xres:joi.number().integer(),
    yres:joi.number().integer(),
    z:joi.number().integer()
  }).allow(0),
  code: joi.string().when({
    is:joi.exist(),
    then:joi.required(),
    otherwise:joi.optional()
  }),
  img: joi.string().allow(null).allow(''),
  title: joi.string().allow(null).allow(''),
  description: joi.string().allow(null).allow(''),
  entitys: joi.array().items(),
  players: joi.array().items(),
  storages: joi.array().items(),
  eventhistory: joi.array().items(),
  isDeleted: joi.boolean(),
  isActive: joi.boolean().default(true),
  x: joi.number().integer().allow(0),
  y: joi.number().integer().allow(0),
  z: joi.number().integer().allow(0),
  l: joi.number().integer().allow(0),
  parentPattern: joi.string().allow(null).allow(''),
  pattern: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  sizeMax: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  size: joi.number().integer().allow(0),
  innerDiminnerDim: joi.string().allow(null).allow(''),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of WorldData for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      worlddata: joi.alternatives().try(joi.array().items(),joi.object(),joi.object()),
      settings: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      code: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      img: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      title: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      description: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      entitys: joi.alternatives().try(joi.array().items(),joi.array().items(),joi.object()),
      players: joi.alternatives().try(joi.array().items(),joi.array().items(),joi.object()),
      storages: joi.alternatives().try(joi.array().items(),joi.array().items(),joi.object()),
      eventhistory: joi.alternatives().try(joi.array().items(),joi.array().items(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      x: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      y: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      z: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      l: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      parentPattern: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      pattern: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      sizeMax: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      size: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      innerDiminnerDim: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      id: joi.any(),
      _id: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object())
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  populate: joi.array().items(populate),
  select: select
    
}).unknown(true);

/**
 * Universe_StorageValidation.js
 * @description :: validate each post and put request as per Universe_Storage model
 */

const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('./commonFilterValidation');

/** validation keys and properties of Universe_Storage */
exports.schemaKeys = joi.object({
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  Slots: joi.array().items(),
  Interface: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  chemsData: joi.object()
}).unknown(true);

/** validation keys and properties of Universe_Storage for updation */
exports.updateSchemaKeys = joi.object({
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  Slots: joi.array().items(),
  Interface: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  chemsData: joi.object(),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of Universe_Storage for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      Slots: joi.alternatives().try(joi.array().items(),joi.array().items(),joi.object()),
      Interface: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      chemsData: joi.alternatives().try(joi.array().items(),joi.object(),joi.object()),
      id: joi.any(),
      _id: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object())
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  populate: joi.array().items(populate),
  select: select
    
}).unknown(true);

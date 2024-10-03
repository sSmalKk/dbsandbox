/**
 * Modelos_ActionValidation.js
 * @description :: validate each post and put request as per Modelos_Action model
 */

const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('./commonFilterValidation');

/** validation keys and properties of Modelos_Action */
exports.schemaKeys = joi.object({
  Name: joi.string().allow(null).allow(''),
  Description: joi.string().allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  data: joi.object(),
  required: joi.array().items(),
  chemsData: joi.object()
}).unknown(true);

/** validation keys and properties of Modelos_Action for updation */
exports.updateSchemaKeys = joi.object({
  Name: joi.string().allow(null).allow(''),
  Description: joi.string().allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  data: joi.object(),
  required: joi.array().items(),
  chemsData: joi.object(),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of Modelos_Action for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      Name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      Description: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      data: joi.alternatives().try(joi.array().items(),joi.object(),joi.object()),
      required: joi.alternatives().try(joi.array().items(),joi.array().items(),joi.object()),
      chemsData: joi.alternatives().try(joi.array().items(),joi.object(),joi.object()),
      id: joi.any(),
      _id: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object())
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  populate: joi.array().items(populate),
  select: select
    
}).unknown(true);

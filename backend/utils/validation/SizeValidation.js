/**
 * SizeValidation.js
 * @description :: validate each post and put request as per Size model
 */

const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('./commonFilterValidation');

/** validation keys and properties of Size */
exports.schemaKeys = joi.object({
  name: joi.string().allow(null).allow(''),
  importancia: joi.number().integer().required(),
  fakesize: joi.number().integer().required(),
  isDeleted: joi.boolean(),
  realsize: joi.number().integer().required(),
  savestructure: joi.boolean().default(false)
}).unknown(true);

/** validation keys and properties of Size for updation */
exports.updateSchemaKeys = joi.object({
  name: joi.string().allow(null).allow(''),
  importancia: joi.number().integer().when({
    is:joi.exist(),
    then:joi.required(),
    otherwise:joi.optional()
  }),
  fakesize: joi.number().integer().when({
    is:joi.exist(),
    then:joi.required(),
    otherwise:joi.optional()
  }),
  isDeleted: joi.boolean(),
  realsize: joi.number().integer().when({
    is:joi.exist(),
    then:joi.required(),
    otherwise:joi.optional()
  }),
  savestructure: joi.boolean().default(false),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of Size for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      importancia: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      fakesize: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      realsize: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      savestructure: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any(),
      _id: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object())
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  populate: joi.array().items(populate),
  select: select
    
}).unknown(true);

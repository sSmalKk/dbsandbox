/**
 * Universe_Chunk.js
 * @description :: model of a database collection Universe_Chunk
 */

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
let idValidator = require('mongoose-id-validator');
const myCustomLabels = {
  totalDocs: 'itemCount',
  docs: 'data',
  limit: 'perPage',
  page: 'currentPage',
  nextPage: 'next',
  prevPage: 'prev',
  totalPages: 'pageCount',
  pagingCounter: 'slNo',
  meta: 'paginator',
};
mongoosePaginate.paginate.options = { customLabels: myCustomLabels };
const Schema = mongoose.Schema;
const schema = new Schema(
  {

    isDeleted:{ type:Boolean },

    isActive:{ type:Boolean },

    createdAt:{ type:Date },

    updatedAt:{ type:Date },

    addedBy:{
      type:Schema.Types.ObjectId,
      ref:'user'
    },

    updatedBy:{
      type:Schema.Types.ObjectId,
      ref:'user'
    },

    x:{ type:Number },

    y:{ type:Number },

    z:{ type:Number },

    p:{ type:Number },

    settings:{
      ref:'Universe_Settings',
      type:Schema.Types.ObjectId
    },

    chunk:{
      type:Schema.Types.ObjectId,
      ref:'Universe_cube'
    },

    generated:{ type:Boolean },

    chat:{
      ref:'Chat_group',
      type:Schema.Types.ObjectId
    },

    data:{ type:Array },

    size:{
      ref:'Modelos_Size',
      type:Schema.Types.ObjectId
    },

    biome:{
      ref:'Modelos_Biomes',
      type:Schema.Types.ObjectId
    },

    op:{
      ref:'user',
      type:Schema.Types.ObjectId
    },

    chemsData:{ type:Schema.Types.Mixed }
  }
  ,{ 
    timestamps: { 
      createdAt: 'createdAt', 
      updatedAt: 'updatedAt' 
    } 
  }
);
schema.pre('save', async function (next) {
  this.isDeleted = false;
  this.isActive = true;
  next();
});

schema.pre('insertMany', async function (next, docs) {
  if (docs && docs.length){
    for (let index = 0; index < docs.length; index++) {
      const element = docs[index];
      element.isDeleted = false;
      element.isActive = true;
    }
  }
  next();
});

schema.method('toJSON', function () {
  const {
    _id, __v, ...object 
  } = this.toObject({ virtuals:true });
  object.id = _id;
     
  return object;
});
schema.plugin(mongoosePaginate);
schema.plugin(idValidator);
const Universe_Chunk = mongoose.model('Universe_Chunk',schema);
module.exports = Universe_Chunk;
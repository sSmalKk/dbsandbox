/**
 * Base_Cube.js
 * @description :: model of a database collection Base_Cube
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

    universe:{
      ref:'Universe_Settings',
      type:Schema.Types.ObjectId
    },

    chunk:{
      type:Schema.Types.ObjectId,
      ref:'Base_Chunk'
    },

    interface:{
      type:Schema.Types.ObjectId,
      ref:'Universe_Interface'
    },

    storage:{
      type:Schema.Types.ObjectId,
      ref:'Universe_Storage'
    },

    data:{ type:String },

    Rules:{ type:Array },

    Tags:{ type:Array },

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
const Base_Cube = mongoose.model('Base_Cube',schema);
module.exports = Base_Cube;
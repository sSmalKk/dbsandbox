/**
 * Universe.js
 * @description :: model of a database collection Universe
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

    name:{ type:String },

    description:{ type:String },

    settings:[{
      tickUpdate:{ type:Boolean },
      tick:{ type:Number },
      data:{ type:Date },
      tickRate:{ type:Number },
      resolution:{ type:Number },
      xres:{ type:Number },
      yres:{ type:Number },
      zres:{ type:Number },
      _id:false
    }],

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

    isDeleted:{ type:Boolean },

    universeData:{ teste:{ type:String } },

    pattern:{
      type:Schema.Types.ObjectId,
      ref:'Pattern'
    },

    code:{ type:String },

    innerDim:{
      ref:'WorldData',
      type:Schema.Types.ObjectId
    },

    God:{ type:String },

    adms:{ type:Array },

    helper:{ type:Array },

    players:{ type:Array },

    sizeMax:{
      ref:'size',
      type:Schema.Types.ObjectId
    },

    size:{ type:Number }
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
const Universe = mongoose.model('Universe',schema);
module.exports = Universe;
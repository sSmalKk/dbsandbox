/**
 * Universe_Settings.js
 * @description :: model of a database collection Universe_Settings
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

    isActive:{ type:Boolean },

    items:{
      type:{ type:Array },
      items:{ type:String }
    },

    biomes:{ type:Array },

    models:{ type:Array },

    textures:{ type:Array },

    entity:{ type:Array },

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

    ChatGlobal:{ type:String },

    ClanChat:{ type:Array },

    Blockstate:{
      ref:'Universe_Blockstate',
      type:Schema.Types.ObjectId
    },

    Rules:{ type:Array },

    Tags:{ type:Array },

    structures:{ type:Array },

    ChunkLoaded:{ type:Array },

    chemsData:{ type:Schema.Types.Mixed },

    isDeleted:{ type:Boolean }
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
const Universe_Settings = mongoose.model('Universe_Settings',schema);
module.exports = Universe_Settings;
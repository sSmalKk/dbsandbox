/**
 * Universe_Age.js
 * @description :: model of a database collection Universe_Age
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

    relativeto:{
      type:Schema.Types.ObjectId,
      ref:'Modelos_Structure'
    },

    year:{ type:Date },

    isDeleted:{ type:Boolean },

    Events:[{
      _id:false,
      id:{ type:String },
      date:{ type:Date },
      name:{ type:String },
      data:{ type:Array }
    }],

    PlayerEvents:{ type:Array },

    Rules:{ type:Array },

    Tags:{ type:Array }
  }
);
schema.pre('save', async function (next) {
  this.isDeleted = false;
  next();
});

schema.pre('insertMany', async function (next, docs) {
  if (docs && docs.length){
    for (let index = 0; index < docs.length; index++) {
      const element = docs[index];
      element.isDeleted = false;
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
const Universe_Age = mongoose.model('Universe_Age',schema);
module.exports = Universe_Age;
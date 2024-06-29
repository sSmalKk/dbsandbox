/**
 * WorldData.js
 * @description :: model of a database collection WorldData
 */

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
let idValidator = require('mongoose-id-validator');
const uniqueValidator = require('mongoose-unique-validator');
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

    worlddata:{ type:Schema.Types.Mixed },

    settings:{
      tickUpdate:{ type:Boolean },
      Tick:{ type:Number },
      data:{ type:Date },
      tickRate:{ type:Number },
      resolution:{ type:Number },
      xres:{ type:Number },
      yres:{ type:Number },
      z:{ type:Number }
    },

    code:{
      type:String,
      unique:true,
      required:true,
      uniqueCaseInsensitive:true
    },

    img:{ type:String },

    title:{ type:String },

    description:{ type:String },

    entitys:{ type:Array },

    players:{ type:Array },

    storages:{ type:Array },

    eventhistory:{ type:Array },

    isDeleted:{ type:Boolean },

    isActive:{
      type:Boolean,
      default:true
    },

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

    l:{ type:Number },

    parentPattern:{ type:String },

    pattern:{
      ref:'Pattern',
      type:Schema.Types.ObjectId
    },

    sizeMax:{
      ref:'size',
      type:Schema.Types.ObjectId
    },

    size:{ type:Number },

    innerDiminnerDim:{
      lowercase:false,
      trim:false,
      unique:true,
      type:String,
      required:false,
      uniqueCaseInsensitive:true
    }
  }
  ,{ 
    timestamps: { 
      createdAt: 'createdAt', 
      updatedAt: 'updatedAt' 
    } 
  }
);
schema.virtual('universe', {
  ref: 'Universe',
  localField: '_id',
  foreignField: 'innerDim',
  justOne: false
});
schema.pre('save',async function (next){
  if (this.tickUpdate && this.tickRate) {
    this.tick += this.tickRate; // Atualiza o valor de tick adicionando tickRate
    // Lógica para chamar um novo evento
    console.log('Novo evento chamado após atualização do tick.');
  }

  next();
});
schema.pre('validate',async function (next){
  if (this.isModified('tick') && this.tickUpdate) {
    // Lógica para lidar com a alteração de tick durante o processo de update
    console.log('Valor de tick foi alterado durante o processo de update.');
  }
  next();

  next();
});
    
schema.post('save',async function (docs,next){
  try {
    if (doc.tickUpdate) {
      // Lógica para atualizar todos os worldData com updateTick true
      await WorldData.updateMany({ updateTick: true }, { $set: { tick: doc.tick } });
      console.log('Update realizado em todos os worldData com updateTick true.');
    }
  } catch (error) {
    console.error('Erro durante a atualização dos worldData:', error);
  }

  next();
});
    
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
schema.plugin(uniqueValidator,{ message: 'Error, expected {VALUE} to be unique.' });
const WorldData = mongoose.model('WorldData',schema);
module.exports = WorldData;
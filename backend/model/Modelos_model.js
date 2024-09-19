/**
 * Modelos_model.js
 * @description :: model of a database collection Modelos_model
 */

const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
let idValidator = require("mongoose-id-validator");
const myCustomLabels = {
  totalDocs: "itemCount",
  docs: "data",
  limit: "perPage",
  page: "currentPage",
  nextPage: "next",
  prevPage: "prev",
  totalPages: "pageCount",
  pagingCounter: "slNo",
  meta: "paginator",
};
mongoosePaginate.paginate.options = { customLabels: myCustomLabels };
const Schema = mongoose.Schema;
const planeSchema = new Schema(
  {
    position: {
      type: [Number], // Array of numbers for positions
      required: true,
      default: [0, 0, 0], // Default position if not provided
    },
    rotation: {
      type: [Number], // Array of numbers for rotations
      required: true,
      default: [0, 0, 0], // Default rotation if not provided
    },
    render: {
      type: Boolean, // Boolean for rendering status
      required: true,
      default: true, // Default to true if not provided
    },
  },
  { _id: false }
);
const schema = new Schema(
  {
    name: { type: String },
    type: { type: Number },
    isDeleted: { type: Boolean },
    isActive: { type: Boolean },
    createdAt: { type: Date },
    updatedAt: { type: Date },
    addedBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    modelmap: { type: [planeSchema], default: [] }, // Array of plane schema
    file: { type: String },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

schema.pre("save", async function (next) {
  this.isDeleted = false;
  this.isActive = true;
  next();
});

schema.pre("insertMany", async function (next, docs) {
  if (docs && docs.length) {
    for (let index = 0; index < docs.length; index++) {
      const element = docs[index];
      element.isDeleted = false;
      element.isActive = true;
    }
  }
  next();
});

schema.method("toJSON", function () {
  const { _id, __v, ...object } = this.toObject({ virtuals: true });
  object.id = _id;

  return object;
});
schema.plugin(mongoosePaginate);
schema.plugin(idValidator);
const Modelos_model = mongoose.model("Modelos_model", schema);
module.exports = Modelos_model;

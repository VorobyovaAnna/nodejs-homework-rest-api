const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleSchemaValidationErrors } = require("../helpers");

const contactSchema = new Schema({
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    }
}, { versionKey: false, timestamps: true });

contactSchema.post("save", handleSchemaValidationErrors)

const contactAddSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    phone: Joi.string().required(),
})

const updateFavoriteSchema = Joi.object({
    favorite: Joi.bool().required(),
})

const schemas = {
  contactAddSchema,
  updateFavoriteSchema,
}
  
const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas,
}
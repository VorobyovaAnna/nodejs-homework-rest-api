const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleSchemaValidationErrors } = require("../helpers");

const userSchema = new Schema({
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    avatarURL: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        default: null,
    },
    verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, 'Verify token is required'],
  },
}, { versionKey: false, timestamps: true });

userSchema.post("save", handleSchemaValidationErrors);

const registerSchema = Joi.object({
    password: Joi.string().min(6).required(),
    repeatPassword: Joi.string().required().valid(Joi.ref("password")),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    subscription: Joi.string(),
    avatarURL: Joi.string(),
    token: Joi.string(),
});

const loginSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    subscription: Joi.string(),
    token: Joi.string(),
});

const verifyEmailSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
});

const schemas = {
    registerSchema,
    loginSchema,
    verifyEmailSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
}
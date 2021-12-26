const Joi = require('joi');

module.exports = {
    loginValidator: Joi.object({
        token: Joi.string()
        .alphanum()
        .min(3)
        .trim()
        .required()
    }),
    signupValidator: Joi.object({
        email: Joi.string()
        .min(8)
        .trim()
        .required(),
        password: Joi.string()
        .min(5)
        .trim()
        .required()
    }),
    addContactValidator: Joi.object({
        email: Joi.string()
        .min(8)
        .trim()
        .required(),
        userId: Joi.string().min(10).required(),
        fullName: Joi.string().min(8).required(),
        phoneNo: Joi.string().min(10).required(),
    }),
    fetchContactValidator: Joi.object({
        userId: Joi.string().min(8).required()
    }),
    deleteContactValidator: Joi.object({
        id: Joi.string().min(8).required()
    }),
    updateContactValidator: Joi.object({
        id: Joi.string().min(10).required(),
        email: Joi.string()
        .min(8)
        .trim()
        .required(),
        fullName: Joi.string().min(8).required(),
        phoneNo: Joi.string().min(10).required(),
    })
};
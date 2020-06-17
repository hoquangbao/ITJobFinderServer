import Joi from 'joi';

export default {
  createUser: {
    body: {
      username: Joi.string().min(3).max(120).required(),
      password: Joi.string().min(6).max(120).required(),
      fullname: Joi.string().min(3).max(80).required(),
      phone: Joi.string().min(10).max(10).required(),
      email: Joi.string().max(120),
    },
    options: {
      allowUnknownBody: false,
    },
  },
  login: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required(),
    },
  },
  editProfile: {
    body: {
      username: Joi.string().min(3).max(120),
      password: Joi.string().min(6).max(120),
      fullname: Joi.string().min(3).max(80),
      phone: Joi.string().min(10).max(10),
      email: Joi.string().max(120),
    },
    options: {
      allowUnknownBody: false,
    },
  },
};

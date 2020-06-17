import Joi from 'joi';

export default {
  createCompany: {
    body: {
      companyName: Joi.string().required(),
      address: Joi.string().required(),
      type: Joi.string().required(),
    },
    options: {
      allowUnknownBody: false,
    },
  },
};

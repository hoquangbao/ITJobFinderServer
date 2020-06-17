import Joi from 'joi';

export default {
  createRole: {
    body: {
      name: Joi.string().required(),
    },
    options: {
      allowUnknownBody: false,
    },
  },
};

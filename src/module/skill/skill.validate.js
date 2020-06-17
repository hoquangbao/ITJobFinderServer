import Joi from 'joi';

export default {
  createSkill: {
    body: {
      name: Joi.string().required(),
    },
    options: {
      allowUnknownBody: false,
    },
  },
};

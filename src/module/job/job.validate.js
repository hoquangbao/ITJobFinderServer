import Joi from 'joi';

export default {
  createJob: {
    body: {
      jobName: Joi.string().required(),
      jobDescription: Joi.string().required(),
      salary: Joi.string().required(),
    },
    options: {
      allowUnknownBody: false,
    },
  },
};

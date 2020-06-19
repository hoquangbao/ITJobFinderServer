const devConfig = {
  MONGO_URL: 'mongodb://localhost:27017/IT-Job-Finder',
  JWT_SECRET: 'cau-troi-xai-duoc',
};

const prodConfig = {
  MONGO_URL: 'mongodb://baohq:bao0932002321@ds263927.mlab.com:63927/itjobfinder',
  JWT_SECRET: 'cau-troi-xai-duoc',
};

const defaultConfig = {
  PORT: process.env.PORT || 7777,
};

function envConfig(env) {
  switch (env) {
    case 'dev':
      return devConfig;
    default:
      return prodConfig;
  }
}

export default {
  ...defaultConfig,
  ...envConfig(process.env.NODE_ENV),

  ROLE: {
    ADMIN: 3,
    EMPLOYER: 2,
    CANDIDATE: 1,
  },
};

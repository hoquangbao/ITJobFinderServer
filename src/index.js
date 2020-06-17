import express from 'express';
import constants from './config/constants';
import './config/database';
import configMiddleware from './config/middlewares';
import configRouters from './module';

const app = express();

configMiddleware(app);

configRouters(app);

app.listen(constants.PORT, () => console.log(`
    Service is up on port ${constants.PORT} 🐳
    ---`));

process.on('SIGINT', () => { console.log('Bye bye!'); process.exit(); });

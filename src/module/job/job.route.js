import { Router } from 'express';
import validate from 'express-validation';
import * as jobController from './job.controller';
import { authJwt } from '../../service/passport';
// import { roleEmployer } from '../../service/role';

const routes = new Router();

routes.post('/create_job', authJwt, jobController.createJob);
routes.post('/search_job', jobController.findJob);
routes.get('/getJob/:userId', authJwt, jobController.getJob);
// routes.get('/')
routes.get('/', authJwt, jobController.getListJob);
routes.get('/:id', authJwt, jobController.getJobDetail);
routes.patch('/:id', authJwt, jobController.updateJob);
routes.delete('/:id', authJwt, jobController.deleteJob);

export default routes;

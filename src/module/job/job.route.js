import { Router } from 'express';
import validate from 'express-validation';
import * as jobController from './job.controller';
import jobValidate from './job.validate';
import { authJwt } from '../../service/passport';
// import { roleEmployer } from '../../service/role';

const routes = new Router();

routes.post('/create_job', authJwt, validate(jobValidate.createJob), jobController.createJob);
// routes.get('/', authJwt, jobController.getListJob);
routes.get('/', authJwt, jobController.findJob);
routes.get('/:id', authJwt, jobController.getJobDetail);
routes.patch('/:id', authJwt, jobController.updateJob);
routes.delete('/:id', authJwt, jobController.deleteJob);

export default routes;

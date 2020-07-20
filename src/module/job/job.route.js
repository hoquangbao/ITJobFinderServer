import { Router } from 'express';
import * as jobController from './job.controller';
import { authJwt } from '../../service/passport';
// import { roleEmployer } from '../../service/role';

const routes = new Router();

routes.post('/create_job', jobController.createJob);
routes.post('/search_job', jobController.findJob);
routes.post('/search_company_job/:userId', jobController.searchCompanyJob);
routes.get('/getJob/:userId', authJwt, jobController.getJob);
// routes.get('/')
routes.get('/', authJwt, jobController.getListJob);
routes.get('/:id', authJwt, jobController.getJobDetail);
routes.patch('/:id', authJwt, jobController.updateJob);
routes.delete('/:id', authJwt, jobController.deleteJob);

export default routes;

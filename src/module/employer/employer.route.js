import { Router } from 'express';
import validate from 'express-validation';
// import * as employerController from './employer.controller';
import employerValidation from './employer.validate';
import { authJwt, authLocal } from '../../service/passport';


const routes = new Router();

routes.get('/', authJwt);
routes.post('/login', validate(employerValidation.login, authLocal));
routes.get('/:id', authJwt);
routes.patch('/:id', authJwt, validate(employerValidation.editProfile));
routes.delete('/:id', authJwt);
routes.post('/register', validate(employerValidation.createEmployer));

export default routes;

import { Router } from 'express';
import validate from 'express-validation';
import * as adminController from './admin.controller';
import adminValidation from './admin.validate';
import { authLocal, authJwt } from '../../service/passport';

const routes = new Router();

routes.get('/', authJwt, adminController.getListAdmin);
routes.post('/login', validate(adminValidation.login), authLocal);
routes.get('/:id', authJwt, adminController.getAdminDetail);
routes.patch('/:id', authJwt, validate(adminValidation.editProfile), adminController.updateAdmin);
routes.delete('/:id', authJwt, adminController.deleteAdmin);
routes.post('/register', validate(adminValidation.createUser), adminController.register);

export default routes;

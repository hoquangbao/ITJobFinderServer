import { Router } from 'express';
import validate from 'express-validation';
import * as userController from './user.controller';
import userValidation from './user.validate';
import { authLocal, authJwt } from '../../service/passport';

const routes = new Router();

routes.get('/', authJwt, userController.getListUser);
routes.post('/login', validate(userValidation.login), authLocal);
routes.get('/:id', authJwt, userController.getUserDetail);
routes.patch('/:id', authJwt, validate(userValidation.editProfile), userController.updateUser);
routes.delete('/:id', authJwt, userController.deleteUser);
routes.post('/register', validate(userValidation.createUser), userController.register);

export default routes;

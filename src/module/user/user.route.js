import { Router } from 'express';
import validate from 'express-validation';
import * as userController from './user.controller';
import userValidation from './user.validate';
import { authJwt } from '../../service/passport';

const routes = new Router();

routes.get('/', authJwt, userController.getListUser);
routes.post('/login', authJwt, userController.login);
routes.get('/:username', authJwt, userController.getUserDetail);
routes.patch('/:username', authJwt, validate(userValidation.editProfile), userController.updateUser);
routes.delete('/:username', authJwt, userController.deleteUser);
routes.post('/register', validate(userValidation.createUser), userController.register);

export default routes;

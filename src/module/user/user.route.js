import { Router } from 'express';
import validate from 'express-validation';
import * as userController from './user.controller';
import userValidation from './user.validate';
import { authJwt } from '../../service/passport';

const routes = new Router();

routes.get('/', userController.getListUser);
routes.post('/login', authJwt);
routes.get('/:username', userController.getUserDetail);
routes.patch('/:username', validate(userValidation.editProfile), userController.updateUser);
routes.delete('/:username', userController.deleteUser);
routes.post('/register', validate(userValidation.createUser), userController.register);

export default routes;

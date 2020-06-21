import { Router } from 'express';
import validate from 'express-validation';
import * as userController from './user.controller';
import userValidation from './user.validate';
import { authLocal } from '../../service/passport';

const routes = new Router();

routes.get('/', userController.getListUser);
routes.post('/login', validate(userValidation.login), authLocal);
routes.get('/:id', userController.getUserDetail);
routes.patch('/:id', validate(userValidation.editProfile), userController.updateUser);
routes.delete('/:id', userController.deleteUser);
routes.post('/register', validate(userValidation.createUser), userController.register);

export default routes;

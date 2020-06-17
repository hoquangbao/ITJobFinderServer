import { Router } from 'express';
import validate from 'express-validation';
import * as roleController from './role.controller';
import roleValidation from './role.validate';

const routes = new Router();

routes.post('/create_role', validate(roleValidation.createRole), roleController.createRole);
routes.get('/', roleController.getRoles);
routes.get('/:id', roleController.getRole);
routes.patch('/:id', roleController.updateRole);
routes.delete('/:id', roleController.deleteRole);

export default routes;

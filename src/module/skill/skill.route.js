import { Router } from 'express';
import validate from 'express-validation';
import * as skillController from './skill.controller';
import skillvalidation from './skill.validate';

const routes = new Router();

routes.post('/create_skill', validate(skillvalidation.createSkill), skillController.createSkill);
routes.get('/', skillController.getSkills);
routes.get('/:id', skillController.getSkill);
routes.patch('/:id', skillController.updateSkill);
routes.delete('/:id', skillController.deleteSkill);

export default routes;

import { Router } from 'express';
// import validate from 'express-validation';
import * as companyController from './company.controller';
import { authJwt } from '../../service/passport';
import { roleEmployer } from '../../service/role';
// import companyValidation from './company.validate';

const routes = new Router();

routes.post('/create_company', authJwt, roleEmployer, companyController.createCompany);
routes.get('/', companyController.getListCompany);
routes.get('/:id', authJwt, roleEmployer, companyController.getCompanyDetail);
routes.patch('/:id', authJwt, roleEmployer, companyController.updateCompany);
routes.delete('/:id', authJwt, roleEmployer, companyController.deleteCompany);

export default routes;

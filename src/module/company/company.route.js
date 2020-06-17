import { Router } from 'express';
// import validate from 'express-validation';
import * as companyController from './company.controller';
// import companyValidation from './company.validate';

const routes = new Router();

routes.post('/create_company', companyController.createCompany);
routes.get('/', companyController.getListCompany);
routes.get('/:id', companyController.getCompanyDetail);
routes.patch('/:id', companyController.updateCompany);
routes.delete('/:id', companyController.deleteCompany);

export default routes;

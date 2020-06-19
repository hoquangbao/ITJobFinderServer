import employerRoutes from './employer/employer.route';
import companyRoutes from './company/company.route';
import skillRoutes from './skill/skill.route';
import roleRoutes from './role/role.route';
import jobRoutes from './job/job.route';


export default app => {
  app.use('/employers', employerRoutes);
  app.use('/company', companyRoutes);
  app.use('/skills', skillRoutes);
  app.use('/roles', roleRoutes);
  app.use('/jobs', jobRoutes);
};

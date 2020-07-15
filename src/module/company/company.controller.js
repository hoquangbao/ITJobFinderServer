import HTTPStatus from 'http-status';
import Company from './company.model';


export const getListCompany = async (req, res) => {
  const offset = parseInt(req.query.offset, 10) || 0;
  const limit = parseInt(req.query.limit, 10) || 0;
  try {
    const listCompany = await Company.find({ isRemoved: false }).skip(offset).limit(limit);
    const total = await listCompany.length;
    return res.status(HTTPStatus.OK).json({ total, listCompany });
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e.message);
  }
};

export const createCompany = async (req, res) => {
  try {
    const company = await Company.create({ ...req.body });
    return res.status(HTTPStatus.OK).json(company);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e.message);
  }
};

export const getCompanyDetail = async (req, res) => {
  const companyID = req.params._id;
  try {
    console.log(companyID);
    const companyDetail = await Company.findOne({ companyID, isRemoved: false });
    return res.status(HTTPStatus.OK).json(companyDetail);
  } catch (error) {
    return res.status(HTTPStatus.BAD_REQUEST).json(error.message);
  }
};

export const updateCompany = async (req, res) => {
  try {
    const company = await Company.findOne({ _id: req.params.id, isRemoved: false });
    if (!company) {
      return res.sendStatus(HTTPStatus.NOT_FOUND);
    }

    Object.keys(req.body).forEach(key => {
      company[key] = req.body[key];
    });

    await company.save();

    return res.status(HTTPStatus.OK).json(company);
  } catch (error) {
    return res.status(HTTPStatus.BAD_REQUEST).json(error.message);
  }
};

export const deleteCompany = async (req, res) => {
  try {
    const company = await Company.findOne({ _id: req.params.id, isRemoved: false });
    if (!company) {
      return res.sendStatus(HTTPStatus.NOT_FOUND);
    }

    company.isRemoved = true;

    await company.save();

    return res.status(HTTPStatus.OK).json(company);
  } catch (error) {
    return res.status(HTTPStatus.BAD_REQUEST).json(error.message);
  }
};



import HTTPStatus from 'http-status';
import Employer from './employer.model';

const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


export const getListEmployer = async (req, res) => {
  const offset = parseInt(req.query.offset, 10) || 0;
  const limit = parseInt(req.query.limit, 10) || 0;
  try {
    const listEmployer = await Employer.find({ isRemoved: false }).skip(offset).limit(limit);
    const total = await Employer.count();
    return res.status(HTTPStatus.OK).json({ total, listEmployer });
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e.message);
  }
};

// export const login = async (req, res) => {
//   try {
//     const username = req.body.username;
//     const password = req.body.password;
//     const user = await Employer.findOne({ username, password });
//     return res.status(HTTPStatus.OK).send({ user });
//   } catch (error) {
//     return res.status(HTTPStatus.BAD_REQUEST).send(error.message);
//   }
// };

export const register = async (req, res) => {
  try {
    const createEmployer = await Employer.create({ ...req.body });
    return res.status(HTTPStatus.OK).send(createEmployer);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).send(e.message);
  }
};

export const getEmployerDetail = async (req, res) => {
  const id = req.params._id;
  try {
    console.log(id);
    const userDetail = await Employer.findOne({ id });
    return res.status(HTTPStatus.OK).json(userDetail);
  } catch (error) {
    return res.status(HTTPStatus.BAD_REQUEST).json(error.message);
  }
};

export const updateEmployer = async (req, res) => {
  const id = req.params._id;
  try {
    const employerDetail = await Employer.findOne({ id });
    if (!employerDetail) {
      return res.sendStatus(HTTPStatus.NOT_FOUND);
    }

    Object.keys(req.body).forEach(key => {
      employerDetail[key] = req.body[key];
    });

    await employerDetail.save();

    return res.status(HTTPStatus.OK).json(employerDetail);
  } catch (error) {
    return res.status(HTTPStatus.BAD_REQUEST).json(error.message);
  }
};

export const deleteEmpoyer = async (req, res) => {
  const id = req.params._id;
  try {
    const deleteEmployer = await Employer.deleteOne({ id });
    console.log(deleteEmployer);
    return res.status(HTTPStatus.OK).json(deleteEmployer);
  } catch (error) {
    return res.status(HTTPStatus.BAD_REQUEST).json(error.message);
  }
};



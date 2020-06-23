import HTTPStatus from 'http-status';
import Admin from './admin.model';

const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


export const getListAdmin = async (req, res) => {
  const offset = parseInt(req.query.offset, 10) || 0;
  const limit = parseInt(req.query.limit, 10) || 0;
  try {
    const listAdmin = await Admin.find({ isRemoved: false }).skip(offset).limit(limit);
    const total = await Admin.count();
    return res.status(HTTPStatus.OK).json({ total, listAdmin });
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e.message);
  }
};

export const register = async (req, res) => {
  try {
    const createdAdmin = await Admin.create({ ...req.body });
    return res.status(HTTPStatus.OK).send(createdAdmin);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).send(e.message);
  }
};

export const getAdminDetail = async (req, res) => {
  const id = req.params._id;
  try {
    const adminDetail = await Admin.findOne({ id });
    return res.status(HTTPStatus.OK).json(adminDetail);
  } catch (error) {
    return res.status(HTTPStatus.BAD_REQUEST).json(error.message);
  }
};

export const updateAdmin = async (req, res) => {
  const id = req.params._id;
  try {
    const adminDetail = await Admin.findOne({ id });
    if (!adminDetail) {
      return res.sendStatus(HTTPStatus.NOT_FOUND);
    }

    Object.keys(req.body).forEach(key => {
      adminDetail[key] = req.body[key];
    });

    await adminDetail.save();

    return res.status(HTTPStatus.OK).json(adminDetail);
  } catch (error) {
    return res.status(HTTPStatus.BAD_REQUEST).json(error.message);
  }
};

export const deleteAdmin = async (req, res) => {
  const id = req.params._id;
  try {
    const adminDelete = await Admin.deleteOne({ id });
    return res.status(HTTPStatus.OK).json(adminDelete);
  } catch (error) {
    return res.status(HTTPStatus.BAD_REQUEST).json(error.message);
  }
};



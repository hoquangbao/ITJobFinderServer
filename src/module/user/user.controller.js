import HTTPStatus from 'http-status';
import User from './user.model';

const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


export const getListUser = async (req, res) => {
  const offset = parseInt(req.query.offset, 10) || 0;
  const limit = parseInt(req.query.limit, 10) || 0;
  try {
    const listUser = await User.find({ isRemoved: false }).skip(offset).limit(limit);
    const total = await User.count();
    return res.status(HTTPStatus.OK).json({ total, listUser });
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e.message);
  }
};

export const login = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const user = await User.findOne({ username, password });
    const token = await user.generateJWT(1);
    console.log(token);
    return res.status(HTTPStatus.OK).send({ user, token });
  } catch (error) {
    return res.status(HTTPStatus.BAD_REQUEST).send(error.message);
  }
};

export const register = async (req, res) => {
  try {
    const createdUser = await User.create({ ...req.body });
    return res.status(HTTPStatus.OK).send(createdUser);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).send(e.message);
  }
};

export const getUserDetail = async (req, res) => {
  const username = req.params.username;
  try {
    console.log(username);
    const userDetail = await User.findOne({ username });
    return res.status(HTTPStatus.OK).json(userDetail);
  } catch (error) {
    return res.status(HTTPStatus.BAD_REQUEST).json(error.message);
  }
};

export const updateUser = async (req, res) => {
  const username = req.params.username;
  try {
    const userDetail = await User.findOne({ username });
    if (!userDetail) {
      return res.sendStatus(HTTPStatus.NOT_FOUND);
    }

    Object.keys(req.body).forEach(key => {
      userDetail[key] = req.body[key];
    });

    await userDetail.save();

    return res.status(HTTPStatus.OK).json(userDetail);
  } catch (error) {
    return res.status(HTTPStatus.BAD_REQUEST).json(error.message);
  }
};

export const deleteUser = async (req, res) => {
  const username = req.params.username;
  try {
    const userDelete = await User.deleteOne({ username });
    console.log(userDelete);
    return res.status(HTTPStatus.OK).json(userDelete);
  } catch (error) {
    return res.status(HTTPStatus.BAD_REQUEST).json(error.message);
  }
};



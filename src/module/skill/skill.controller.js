import HTTPStatus from 'http-status';
import Skill from './skill.model';


export const getSkills = async (req, res) => {
  const offset = parseInt(req.query.offset, 10) || 0;
  const limit = parseInt(req.query.limit, 10) || 0;
  try {
    const listSkill = await Skill.find({ isRemoved: false }).skip(offset).limit(limit);
    const total = await listSkill.length;
    return res.status(HTTPStatus.OK).json({ total, listSkill });
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e.message);
  }
};

export const createSkill = async (req, res) => {
  try {
    const skill = await Skill.create({ ...req.body });
    return res.status(HTTPStatus.OK).json(skill);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e.message);
  }
};

export const getSkill = async (req, res) => {
  const skillId = req.params._id;
  try {
    console.log(skillId);
    const skillDetail = await Skill.findOne({ skillId });
    return res.status(HTTPStatus.OK).json(skillDetail);
  } catch (error) {
    return res.status(HTTPStatus.BAD_REQUEST).json(error.message);
  }
};

export const updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findOne({ _id: req.params.id, isRemoved: false });
    if (!skill) {
      return res.sendStatus(HTTPStatus.NOT_FOUND);
    }

    Object.keys(req.body).forEach(key => {
      skill[key] = req.body[key];
    });

    await skill.save();

    return res.status(HTTPStatus.OK).json(skill);
  } catch (error) {
    return res.status(HTTPStatus.BAD_REQUEST).json(error.message);
  }
};

export const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findOne({ _id: req.params.id, isRemoved: false });
    if (!skill) {
      return res.sendStatus(HTTPStatus.NOT_FOUND);
    }

    skill.isRemoved = true;

    await skill.save();

    return res.status(HTTPStatus.OK).json(skill);
  } catch (error) {
    return res.status(HTTPStatus.BAD_REQUEST).json(error.message);
  }
};



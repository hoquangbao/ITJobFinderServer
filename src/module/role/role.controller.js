import HTTPStatus from 'http-status';
import Role from './role.model';


export const getRoles = async (req, res) => {
  const offset = parseInt(req.query.offset, 10) || 0;
  const limit = parseInt(req.query.limit, 10) || 0;
  try {
    const listRole = await Role.find({ isRemoved: false }).skip(offset).limit(limit);
    const total = await listRole.length;
    return res.status(HTTPStatus.OK).json({ total, listRole });
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e.message);
  }
};

export const createRole = async (req, res) => {
  try {
    const role = await (await Role.create({ ...req.body })
    ).populate('createdBy').execPopulate((err, createdById) => {
      console.log(createdById);
    });
    console.log(role);
    return res.status(HTTPStatus.OK).json(role);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e.message);
  }
};

export const getRole = async (req, res) => {
  const roleId = req.params._id;
  try {
    console.log(roleId);
    const roleDetail = await Role.findOne({ roleId });
    return res.status(HTTPStatus.OK).json(roleDetail);
  } catch (error) {
    return res.status(HTTPStatus.BAD_REQUEST).json(error.message);
  }
};

export const updateRole = async (req, res) => {
  try {
    const role = await Role.findOne({ _id: req.params.id, isRemoved: false });
    if (!role) {
      return res.sendStatus(HTTPStatus.NOT_FOUND);
    }

    Object.keys(req.body).forEach(key => {
      role[key] = req.body[key];
    });

    await role.save();

    return res.status(HTTPStatus.OK).json(role);
  } catch (error) {
    return res.status(HTTPStatus.BAD_REQUEST).json(error.message);
  }
};

export const deleteRole = async (req, res) => {
  try {
    const role = await Role.findOne({ _id: req.params.id, isRemoved: false });
    if (!role) {
      return res.sendStatus(HTTPStatus.NOT_FOUND);
    }

    role.isRemoved = true;

    await role.save();

    return res.status(HTTPStatus.OK).json(role);
  } catch (error) {
    return res.status(HTTPStatus.BAD_REQUEST).json(error.message);
  }
};



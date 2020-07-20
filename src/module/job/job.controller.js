import HTTPStatus from 'http-status';
import Job from './job.model';


export const getListJob = async (req, res) => {
  const offset = parseInt(req.query.offset, 10) || 0;
  const limit = parseInt(req.query.limit, 10) || 0;
  try {
    const listJob = await Job.find({ isRemoved: false }
    ).skip(offset).limit(limit).populate('companyId', '_id companyName ' +
      'address description startWorkingDate endWorkingDate type contact numberOfEmployees createdBy');
    const total = await listJob.length;
    return res.status(HTTPStatus.OK).json({ total, listJob });
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e.message);
  }
};

export const getJob = async (req, res) => {
  const id = req.params.userId;
  try {
    const listJob = await Job.find({ isRemoved: false, userId: id }
    ).populate('companyId', '_id companyName ' +
      'address description startWorkingDate endWorkingDate type contact numberOfEmployees');
    const total = await listJob.length;
    return res.status(HTTPStatus.OK).json({ total, listJob });
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e.message);
  }
};

export const findJob = async (req, res) => {
  const offset = parseInt(req.query.offset, 10) || 0;
  const limit = parseInt(req.query.limit, 10) || 0;
  const job = req.body.jobName;
  try {
    const listJob = await Job.find({ jobName: new RegExp(job, 'i'), isRemoved: false }
    ).skip(offset).limit(limit).populate('companyId', '_id companyName ' +
      'address description startWorkingDate endWorkingDate type contact numberOfEmployees');
    const total = await listJob.length;
    return res.status(HTTPStatus.OK).json({ total, listJob });
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e.message);
  }
};

export const createJob = async (req, res) => {
  try {
    const job = await Job.create({ ...req.body });
    return res.status(HTTPStatus.OK).json(job);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e.message);
  }
};

export const getJobDetail = async (req, res) => {
  const jobId = req.params._id;
  try {
    console.log(jobId);
    const jobDetail = await Job.findOne({ jobId, isRemoved: false });
    return res.status(HTTPStatus.OK).json(jobDetail);
  } catch (error) {
    return res.status(HTTPStatus.BAD_REQUEST).json(error.message);
  }
};

export const updateJob = async (req, res) => {
  try {
    const job = await Job.findOne({ _id: req.params.id, isRemoved: false });
    if (!job) {
      return res.sendStatus(HTTPStatus.NOT_FOUND);
    }

    Object.keys(req.body).forEach(key => {
      job[key] = req.body[key];
    });

    await job.save();

    return res.status(HTTPStatus.OK).json(job);
  } catch (error) {
    return res.status(HTTPStatus.BAD_REQUEST).json(error.message);
  }
};

export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findOne({ _id: req.params.id, isRemoved: false });
    if (!job) {
      return res.sendStatus(HTTPStatus.NOT_FOUND);
    }

    job.isRemoved = true;

    await job.save();

    return res.status(HTTPStatus.OK).json(job);
  } catch (error) {
    return res.status(HTTPStatus.BAD_REQUEST).json(error.message);
  }
};



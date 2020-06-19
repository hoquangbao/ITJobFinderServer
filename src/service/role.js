import HTTPStatus from 'http-status';
import constants from '../config/constants';

// NOTA: NOTADMIN
export function roleNOTA(req, res, next) {
  if (req.user.role != constants.ROLE.ADMIN) {
    return next();
  }
  return res.sendStatus(HTTPStatus.FORBIDDEN);
}

// NOTS: NOTEployer
export function roleNOTE(req, res, next) {
  if (req.user.role != constants.ROLE.EMPLOYER) {
    return next();
  }
  return res.sendStatus(HTTPStatus.FORBIDDEN);
}

// NOTS: NOTCandidate
export function roleNOTA2(req, res, next) {
  if (req.user.role != constants.ROLE.CANDIDATE) {
    return next();
  }
  return res.sendStatus(HTTPStatus.FORBIDDEN);
}


export function roleNOTOWN(req, res, next) {
  if (req.user._id !== req.params.id) {
    return next();
  }
  return res.sendStatus(HTTPStatus.FORBIDDEN);
}


export function roleAdmin(req, res, next) {
  if (req.user.role == constants.ROLE.ADMIN) {
    return next();
  }
  return res.sendStatus(HTTPStatus.FORBIDDEN);
}

export function roleEmployer(req, res, next) {
  if (req.user.role == constants.ROLE.EMPLOYER) {
    return next();
  }
  return res.sendStatus(HTTPStatus.FORBIDDEN);
}

export function roleCandidate(req, res, next) {
  if (req.user.role == constants.ROLE.CANDIDATE) {
    return next();
  }
  return res.sendStatus(HTTPStatus.FORBIDDEN);
}

export function roleOwn(req, res, next) {
  if (req.user._id == req.params.id) {
    return next();
  }
  return res.sendStatus(HTTPStatus.FORBIDDEN);
}

// AM: Admin or manager
export function roleAM(req, res, next) {
  if (!req.user.role || req.user.role == constants.ROLE.MANAGER) {
    return next();
  }
  return res.sendStatus(HTTPStatus.FORBIDDEN);
}

// AMO: Admin, manager or own
export function roleAMO(req, res, next) {
  if (!req.user.role || req.user.role == constants.ROLE.MANAGER || req.user._id == req.params.id) {
    return next();
  }
  return res.sendStatus(HTTPStatus.FORBIDDEN);
}

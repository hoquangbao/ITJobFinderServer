import HTTPStatus from 'http-status';
import constants from '../config/constants';

// NOTA: NOTADMIN
export function roleNOTA(req, res, next) {
  if (req.user.role) {
    return next();
  }
  return res.sendStatus(HTTPStatus.FORBIDDEN);
}
// NOT EMPLOYER
export function roleNOTEM(req, res, next) {
  if (req.user.role != constants.ROLE.EMPLOYER) {
    return next();
  }
  return res.sendStatus(HTTPStatus.FORBIDDEN);
}

// NOTC: NOTCANDIDATE
export function roleNOTC(req, res, next) {
  if (req.user.role != constants.ROLE.CANDIDATE) {
    return next();
  }
  return res.sendStatus(HTTPStatus.FORBIDDEN);
}

// NOT Own
export function roleNOTO(req, res, next) {
  if (req.user._id !== req.params.id) {
    return next();
  }
  return res.sendStatus(HTTPStatus.FORBIDDEN);
}

// Admin
export function roleAdmin(req, res, next) {
  if (!req.user.role) {
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

export function roleEmployer(req, res, next) {
  if (req.user.role == constants.ROLE.EMPLOYER) {
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

/* eslint-disable no-nested-ternary */
import passport from 'passport';
import HTTPStatus from 'http-status';
import LocalStrategy from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import constants from '../config/constants';
// import Employee from '../module/employee/employee.model';
import User from '../module/user/user.model';
// import Company from '../module/company/company.model';

const localOpts = {
  usernameField: 'username',
  passReqToCallback: true,
};
const localStrategy = new LocalStrategy(localOpts, async (req, username, password, done) => {
  try {
    const user = await User.findOne({ username, isRemoved: false });

    if (!user) {
      return done(null, false);
    } else if (!user.validatePassword(password)) {
      return done(null, false);
    }

    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
});
passport.use(localStrategy);

export const authLocal = async (req, res, next) => passport.authenticate('local', { session: false },
  async (err, user) => {
    if (!user) {
      return res.status(HTTPStatus.BAD_REQUEST).json('Invalid username or password');
    }

    return res.status(HTTPStatus.OK).json(user.toAuthJSON());
  })(req, res, next);

//------------------------------------

const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    ExtractJwt.fromHeader('token'),
    (req) => req.params.token,
  ]),
  secretOrKey: constants.JWT_SECRET,
};

const jwtStrategy = new JWTStrategy(jwtOpts, async (payload, done) => {
  try {
    const user = await User.findOne({ username: payload.username, isRemoved: false });
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (e) {
    return done(e, false);
  }
});

passport.use(jwtStrategy);
export const authJwt = passport.authenticate('jwt', { session: false });

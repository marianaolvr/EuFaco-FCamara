const passport = require('passport');
const { ExtractJwt, Strategy } = require('passport-jwt');

const config = require('../config/auth');
const Client = require('../models/Client');
const Provider = require('../models/Provider');

const opts = {
  secretOrKey: config.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

module.exports = () => {
  const strategy = new Strategy(opts, async (payload, done) => {
    try {
      let user = await Client.query().findById(payload.id);
      if (user) return done(null, user);
      if (!user) user = await Provider.query().findById(payload.id);
      if (user) return done(null, user);
      return done(new Error('User not found'));
    } catch (error) {
      return done(error, null);
    }
  });

  passport.use(strategy);

  return {
    initialize: () => passport.initialize(),
    authenticate: () => passport.authenticate('jwt', config.session),
  };
};

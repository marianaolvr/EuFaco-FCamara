const Client = require('../models/Client');
const Provider = require('../models/Provider');
const jwt = require('jsonwebtoken');
const config = require('../config/auth');

module.exports.login = async (req, res, next) => {
  const { user, email, password } = req.body;

  let client;
  let provider;

  if (user === undefined || user > 1 || typeof user === 'string') {
    return res.status(400).json({ message: 'invalids fields.' });
  }

  const signIn = () => async (table, entity) => {
    try {
      entity = await table.query().where('email', email);
      if (
        entity[0] &&
        (await table.hashCompare(entity[0].password, password))
      ) {
        let payload = { id: entity[0].id };
        return res.status(200).json({
          token: jwt.sign(payload, config.secret, { expiresIn: '24h' }),
        });
      }
      return res.status(401).json({ login: false });
    } catch (error) {
      next(error);
    }
  };

  const getUser = (type) => (table, entity) => {
    return {
      0: signIn,
      1: signIn,
    }[type]()(table, entity);
  };

  if (user === 0) return getUser(user)(Client, client);
  if (user === 1) return getUser(user)(Provider, provider);
};

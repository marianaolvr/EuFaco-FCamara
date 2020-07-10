const Client = require('../models/Client');
const knex = require('../database/connection');
const jwt = require('jsonwebtoken');
const config = require('../config/auth');
const { v4 } = require('uuid');
const cepPromise = require('cep-promise');

const create = async (req, res, next) => {
  let { address_city } = req.body;
  const { name, email, password, cep } = req.body;
  try {
    let client = await Client.query().findOne({ email });
    if (!client) {
      if (address_city === undefined) {
        address_city = await (await cepPromise(cep)).city;
      }
      client = await Client.query().insert({
        id: v4(),
        name,
        email,
        password,
        cep: parseInt(cep),
        address_city,
      });
      const payload = { id: client.id };
      return res.status(201).json({
        token: jwt.sign(payload, config.secret, {
          expiresIn: '1d',
        }),
      });
    }
    return res.status(400).json({ message: 'registration client failed' });
  } catch (error) {
    next(error);
  }
};

const find = async (req, res, next) => {
  const { id } = req.user;

  try {
    const client = await Client.query().findById(id);

    if (!client) return res.status(401).send();

    return res.status(200).json(client);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  const { id } = req.user;
  const { name, email, password, cep } = req.body;

  try {
    const client = await Client.query().findById(id);

    if (!client) return res.status(401).send();

    await Client.query().findById(id).patch({
      name,
      email,
      password,
      cep,
    });

    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  const { id } = req.user;

  try {
    const client = await Client.query().findById(id);

    if (!client) return res.status(401).send();

    await Client.query().deleteById(id);

    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
};

const createBudgte = async (req, res, next) => {
  const { id } = req.user;
  const { id_provider, description, type_service, time } = req.body;

  try {
    const client = await Client.query().findById(id);

    if (!client) return res.status(401).send();

    await knex('BUDGET').insert({
      id_client: id,
      id_provider,
      description,
      type_service,
      time,
    });

    return res.status(201).send();
  } catch (error) {
    next(error);
  }
};

const findAllRooms = async (req, res, next) => {
  const { id } = req.user;
  try {
    const client = await Client.query().findById(id);

    if (!client) return res.status(401).send();

    const rooms = await knex
      .select('chat.name_room', 'chat.id_provider', 'prov.name')
      .from('CLIENT as clit')
      .leftJoin('CHAT_ROOM as chat', 'clit.id', 'chat.id_client')
      .leftJoin('PROVIDER as prov', 'chat.id_provider', 'prov.id')
      .where('clit.id', id);

    return res.status(200).json(rooms);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  find,
  update,
  destroy,
  createBudgte,
  findAllRooms,
};
// .leftJoin('PROVIDER_CATEGORY as pc', 'p.id', 'pc.id_provider')
// .leftJoin('CLIENT as c', 'c.id', 'b.id_client')

// 'chat.id_provider',
// 'chat.name_room',
// 'prov.name',
// 'c.address_city',
// 'b.type_service',
// 'b.time',
// 'b.description',
// 'pc.id_category'

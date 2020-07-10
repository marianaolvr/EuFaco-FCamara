const Provider = require('../models/Provider');
const knex = require('../database/connection');
const jwt = require('jsonwebtoken');
const { v4 } = require('uuid');
const config = require('../config/auth');
const cepPromise = require('cep-promise');

module.exports = {
  async index(req, res, next) {
    const { id } = req.user;

    try {
      const provider = await Provider.query().findById(id);
      if (!provider) return res.status(401).send();
      return res.status(200).json(provider);
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
    try {
      let { address_city } = req.body;
      const { name, email, password, cep } = req.body;

      let provider = await Provider.query().findOne({ email });

      if (!provider) {
        if (address_city === undefined) {
          address_city = await (await cepPromise(cep)).city;
        }
        provider = await Provider.query().insert({
          id: v4(),
          name,
          email,
          password,
          cep: parseInt(cep),
          address_city,
        });
        const payload = { id: provider.id };
        return res.status(201).json({
          token: jwt.sign(payload, config.secret, {
            expiresIn: '1d',
          }),
        });
      }
      return res.status(400).json({ message: 'registration provider failed' });
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    const { id } = req.user;
    const {
      name,
      email,
      password,
      cep,
      type_service,
      description,
      cpf,
      tel,
    } = req.body;
    try {
      let provider = await Provider.query().findById(id);
      if (!provider) return res.status(401).send();
      await Provider.query()
        .findById(id)
        .patch({
          name,
          email,
          password,
          cep,
          type_service,
          description,
          cpf: parseInt(cpf),
          tel: parseInt(tel),
        });
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    const { id } = req.user;

    try {
      let provider = await Provider.query().findById(id);

      if (!provider) return res.status(401).send();

      await Provider.query().deleteById(id);

      return res.sendStatus(204);
    } catch (error) {
      return next(error);
    }
  },

  async createCategory(req, res, next) {
    const id_provider = req.user.id;
    const { id_category } = req.body;

    const insertCategory = async (id_provider, id_category) => {
      try {
        const provider = await Provider.query().findById(id_provider);

        if (!provider) return res.status(401).send();

        await knex('PROVIDER_CATEGORY').insert({
          id_provider,
          id_category,
        });

        return res.status(201).send();
      } catch (error) {
        next(error);
      }
    };

    if (id_category === 'Pintura') insertCategory(id_provider, 1);
    if (id_category === 'Montagem') insertCategory(id_provider, 2);
    if (id_category === 'Instalação') insertCategory(id_provider, 3);
    if (id_category === 'Elétrica') insertCategory(id_provider, 4);
    if (id_category === 'Hidráulica') insertCategory(id_provider, 5);
    if (id_category === 'Reparos Gerais') insertCategory(id_provider, 6);
  },

  async findAll(req, res, next) {
    const categorie = req.query.categorie;
    const address = req.query.address;
    try {
      const categories = await knex('CATEGORY').where({ name: categorie });

      if (categories) {
        const providers = await knex('PROVIDER')
          .join(
            'PROVIDER_CATEGORY',
            'PROVIDER.id',
            'PROVIDER_CATEGORY.id_provider'
          )
          .select(
            'PROVIDER_CATEGORY.id_provider',
            'PROVIDER.name',
            'PROVIDER.address_city',
            'PROVIDER.type_service',
            'PROVIDER.description'
          )
          .where({
            'PROVIDER_CATEGORY.id_category': categories[0].id,
            'PROVIDER.address_city': address,
          });
        return res.status(200).json(providers);
      }
      return res.status(400).json({ message: 'not a found!' });
    } catch (error) {
      next(error);
    }
  },

  async findById(req, res, next) {
    const { id } = req.params;
    try {
      const provider = await Provider.query().findById(id);
      if (provider) {
        return res.status(200).json({
          id: provider.id,
          name: provider.name,
          cep: provider.cep,
          address: provider.address_city,
          service: provider.type_service,
          description: provider.description,
        });
      }
      return res.status(404).json({ message: 'not a found' });
    } catch (error) {
      next(error);
    }
  },

  async findAllBudgets(req, res, next) {
    const id_provider = req.user.id;
    try {
      const provider = await Provider.query().findById(id_provider);

      if (!provider) return res.status(401).send();
      const budgets = await knex
        .select(
          'b.id_client',
          'c.name',
          'c.address_city',
          'b.type_service',
          'b.time',
          'b.description',
          'pc.id_category'
        )
        .from('PROVIDER as p')
        .leftJoin('BUDGET as b', 'p.id', 'b.id_provider')
        .leftJoin('CLIENT as c', 'c.id', 'b.id_client')
        .leftJoin('PROVIDER_CATEGORY as pc', 'p.id', 'pc.id_provider')
        .where('p.id', id_provider);
      return res.status(200).json(budgets);
    } catch (error) {
      next(error);
    }
  },

  async findAllRooms(req, res, next) {
    const { id } = req.user;
    try {
      const provider = await Provider.query().findById(id);

      if (!provider) return res.status(401).send();

      const rooms = await knex
        .select('chat.name_room', 'cli.name', 'cli.id')
        .from('PROVIDER as prov')
        .leftJoin('CHAT_ROOM as chat', 'prov.id', 'chat.id_provider')
        .leftJoin('CLIENT as cli', 'chat.id_client', 'cli.id')
        .where('prov.id', id);

      return res.status(200).json(rooms);
    } catch (error) {
      next(error);
    }
  },
};

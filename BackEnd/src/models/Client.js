const { Model } = require('objection');
const knex = require('../database/connection');
const { hashSync, compareSync } = require('bcrypt');

Model.knex(knex);

class Client extends Model {
  static get tableName() {
    return 'CLIENT';
  }

  static get relationMappings() {
    return {
      services: {
        relation: Model.HasManyRelation,
        modelClass: 'SERVICE',
        join: {
          from: 'id',
          to: 'id_client',
        },
      },
    };
  }

  $beforeInsert(context) {
    console.log(this);
    const hashPassword = (password) => hashSync(password, 8);
    return (this.password = hashPassword(this.password));
  }

  static hashCompare(hashPassword, password) {
    return compareSync(password, hashPassword);
  }
}

module.exports = Client;

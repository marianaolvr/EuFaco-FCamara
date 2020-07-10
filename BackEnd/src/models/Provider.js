const { Model } = require('objection');
const knex = require('../database/connection');
const { hashSync, compareSync } = require('bcrypt');

Model.knex(knex);

class Provider extends Model {
  static get tableName() {
    return 'PROVIDER';
  }

  static get relationMappings() {
    return {
      services: {
        relation: Model.HasManyRelation,
        modelClass: 'SERVICE',
        join: {
          from: 'id',
          to: 'id_provider',
        },
      },
      category: {
        relation: Model.HasManyRelation,
        modelClass: 'PROVIDER_CATEGORY',
        join: {
          from: 'id',
          to: 'id_provider',
        },
      },
    };
  }

  $beforeInsert(context) {
    console.log(this);
    const hashPassword = (password) => hashSync(password, 8);
    return (this.password = hashPassword(this.password));
  }

  $beforeUpdate(context) {
    if (this.password != null) {
      const hashPassword = (password) => hashSync(password, 8);
      return (this.password = hashPassword(this.password));
    }
  }

  static hashCompare(hashPassword, password) {
    return compareSync(password, hashPassword);
  }
}

module.exports = Provider;

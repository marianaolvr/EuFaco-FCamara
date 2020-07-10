
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('CATEGORY').del()
    .then(function () {
      // Inserts seed entries
      return knex('CATEGORY').insert([
        {name: 'Pintura'},
        {name: 'Montagem'},
        {name: 'Instalação'},
        {name: 'Elétrica'},
        {name: 'Hidráulica'},
        {name: 'Reparos gerais'},
      ]);
    });
};

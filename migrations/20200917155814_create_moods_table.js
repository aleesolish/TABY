exports.up = function(knex) {
return knex.schema
    .createTable('mood', (table) => {
      table.increments('id');
      table.string('mood', 255).notNullable();
      table.integer('user_id').notNullable().unsigned().index().references('id').inTable('user');
      table.timestamps(true, true);
    });  
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('mood');
};

// Obtiene la conexión con la base de datos
const knex = require('../database/connection');

//Create
exports.create = (habit) => {
  return knex('habit')
    .insert({
      habit: habit.name,
      user_id: habit.user_id,
    });
}

//Retrieve
exports.findByUserId = (user_id) => {
  return knex.select('name').from('habit').where({ 'user_id': user_id });
}

exports.findById = (id) => {
  return knex
    .select('*')
    .from('habit')
    .where('id', id)
    .first();
}

//Update
exports.update = (id, habit) => {
  return knex('habit').where('id', id).update({
    habit: habit
  }).update('updated_at', knex.fn.now());
}

//Delete
exports.delete = (id) => {
  return knex('habit')
    .delete()
    .where('id', id);
}

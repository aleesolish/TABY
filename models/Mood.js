const knex = require('../database/connection');

//Create
exports.create = (mood) => {
  return knex('mood')
    .insert({
      mood: mood.name,
      user_id: mood.user_id,
    });
}

//Retrieve
exports.findByUserId = (user_id) => {
  return knex.select('mood').from('mood').where({ 'user_id': user_id });
}

exports.findById = (id) => {
  return knex
    .select('*')
    .from('mood')
    .where('id', id)
    .first();
}

//Update
exports.update = (id, mood) => {
  return knex('mood').where('id', id).update({
    mood: mood
  }).update('updated_at', knex.fn.now());
}

//Delete
exports.delete = (id) => {
  return knex('mood')
    .delete()
    .where('id', id);
}

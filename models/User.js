// Obtiene la conexión con la base de datos
const knex = require('../database/connection');
const bcrypt = require('bcrypt')

//Create
exports.create = (user) => {
  let pass = user.password
  pass = bcrypt.hashSync(pass, 10)
  return knex('user')
    .insert({
      name: user.name,
      gender: user.gender,
      age: user.age,
      email: user.email,
      password: pass,
      role: user.role
    });
}

//Retrieve
exports.findByEmail = (email) => {
  return knex('user').where({ 'email': email }).first()
}

exports.findById = (id) => {
  return knex
    .select('*')
    .from('user')
    .where('id', id)
    .first();
}

// Obtiene todos los usuarios en la base
exports.all = () => {
  return knex('user');
}

exports.update = (id, name, email, gender, password, role, age) => {
  return knex('user').where('id', id).update({
    name: name,
    email: email,
    gender: gender,
    password: password,
    role: role,
    age: age
  })
}

//Delete
exports.delete = (id) => {
  return knex('user')
    .delete()
    .where('id', id);
}

const { validationResult } = require('express-validator')

let UserModel = require('../models/User')
// ...
// Almacena el usuario
exports.store = (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  //Tiene que ir en el controller por la parte de req res
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    //return res.status(422).json({ errors: errors.array() });
    req.flash('errors', errors.array());
    console.log(errors);
    return res.redirect('back');
  }
  // Crea un objeto con la información del usuario
  let user = {
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
    gender: req.body.gender,
    password: req.body.password,
    role: req.body.role
  };
  // Crea el usuario
  UserModel.create(user)
    .then((id) => {
        console.log('user created');
    }).catch((error) => console.log(error));
}

exports.show = (req, res) => {
  // Obtiene el id que viene en la url
  let id = req.body.id;
  // Busca dentro de la base de datos el usuario con el id indicado
  UserModel.findById(id).then((user) => {
    // Si el usuario no existe entonces
    if (user == null) {
      // Regresa el error 404
      res.status(404).send('Not found');
      return;
    }
    console.log(user);
  })
}

exports.showAll = (req, res) => {
  UserModel.all().then((users) => {
    // Si el producto no existe entonces
    if (users == null) {
      // Regresa el error 404
      res.status(404).send('Not found');
      return;
    }
    console.log(users);
  })
}

exports.update = (req, res) => {
  UserModel.update(req.body.id, req.body.name, req.body.email, req.body.gender, req.body.password, req.body.role, req.body.age).then((data)=> {
    UserModel.all()
    .then((data) => {
      let users = data
      console.log(users);
    })
  })
}

exports.delete = (req, res) => {
  let id = req.body.id;
  UserModel.findById(id).then((user) => {
    // Si el usuario no existe entonces
    if (user == null) {
      // Regresa el error 404
      res.status(404).send('Not found');
      return;
    }
    UserModel.delete(user.id)
      .then((id) => {
        console.log('user deleted');
      });
  });
}


const { validationResult } = require('express-validator')

let HabitModel = require('../models/Habit')
let UserModel = require('../models/User')
// ...
// Almacena el habito
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

  let habit = {
    name: req.body.name,
    user_id: req.body.user_id,
  };
  
  HabitModel.create(habit)
    .then((id) => {
      console.log('habit created');
    }).catch((error) => console.log(error));
}

exports.showByUser = (req, res) => {
  // Obtiene el id que viene en la url
  let user_id = req.body.user_id;
  // Busca dentro de la base de datos el usuario con el id indicado
  HabitModel.findByUserId(user_id).then((habits) => {
    // Si el usuario no existe entonces
    if (habits == null) {
      // Regresa el error 404
      res.status(404).send('Not found');
      return;
    }
    console.log(habits);
  })
}

exports.update = (req, res) => {
  HabitModel.update(req.body.id, req.body.habit).then((data)=> {
    HabitModel.findByUserId(req.body.user_id)
    .then((data) => {
      let user_habits = data
      console.log(user_habits);
    })
  })
}

exports.delete = (req, res) => {
  let id = req.body.id;
  HabitModel.findById(id).then((habit) => {
    // Si el usuario no existe entonces
    if (habit == null) {
      // Regresa el error 404
      res.status(404).send('Not found');
      return;
    }
    HabitModel.delete(habit.id)
      .then((id) => {
        console.log('habit deleted');
      });
  });
}


const { validationResult } = require('express-validator')

let MoodModel = require('../models/Mood')
let UserModel = require('../models/User')
// ...
// Almacena el humor
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

  let mood = {
    mood: req.body.mood,
    user_id: req.body.user_id,
  };
  
  MoodModel.create(mood)
    .then((id) => {
      console.log('mood created');
    }).catch((error) => console.log(error));
}

exports.showByUser = (req, res) => {
  // Obtiene el id que viene en la url
  let user_id = req.body.user_id;
  // Busca dentro de la base de datos el usuario con el id indicado
  MoodModel.findByUserId(user_id).then((moods) => {
    // Si el usuario no existe entonces
    if (moods == null) {
      // Regresa el error 404
      res.status(404).send('Not found');
      return;
    }
    console.log(moods);
  })
}

exports.update = (req, res) => {
  MoodModel.update(req.body.id, req.body.mood).then((data)=> {
    MoodModel.findByUserId(req.body.user_id)
    .then((data) => {
      let user_moods = data
      console.log(user_moods);
    })
  })
}

exports.delete = (req, res) => {
  let id = req.body.id;
  MoodModel.findById(id).then((mood) => {
    // Si el usuario no existe entonces
    if (mood == null) {
      // Regresa el error 404
      res.status(404).send('Not found');
      return;
    }
    MoodModel.delete(mood.id)
      .then((id) => {
        console.log('mood deleted');
      });
  });
}


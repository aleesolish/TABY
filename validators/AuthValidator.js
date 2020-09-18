const { check } = require('express-validator')

exports.store = [
  check('name').notEmpty(),
  // username must be an email
  check('email').isEmail(),
  // password must be not empty
  check('password').notEmpty(),
  //verifica que el password sea el mismo
  check('password').custom((value, {req, loc, path}) => {
    if (value !== req.body.password_confirm) {
      throw new Error("Passwords don't match");
    } else {
      return value;
    }
  }),
  check('gender').notEmpty(),
  check('age').notEmpty(),
  //verifica el rol
  check('role').notEmpty()
];

exports.isAdmin = (req, res, next) => {
  if (req.isAuthenticated()) {
    //console.log(req);
    //console.log(req.user.role);
    if(req.user.role != 'admin'){
      res.status(403).json({msg: 'Unauthorized access prohibited'})
    }
    next();
  } else {
    //res.status(401).json({ msg: 'You are not authorized to view this resource' });
    res.redirect(('/login'))
  }
}

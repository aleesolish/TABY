let router = require('express').Router();
let authController = require('../controllers/AuthController');
let usersController = require('../controllers/UsersController')
let authValidator = require('../validators/AuthValidator')
let habitsController = require('../controllers/HabitsController')
let moodsController = require('../controllers/MoodsController')
let passport = require('passport');

//--------------------------------USERS------------------------------------
//retrieve users
router.get('/user', usersController.show);
router.get('/users', usersController.showAll);

//post users
//router.post('/users/store', authValidator.store ,usersController.store);
router.post('/users/store', usersController.store);
//router.post('/login', passport.authenticate('local', { failureRedirect: '/login?authError=1', successRedirect: '/app/dashboard' }))

//update users
router.post('/users/update', usersController.update);

//delete users
router.delete('/user/del', usersController.delete);

//------------------------------HABITS---------------------------------------
//retrieve habits
router.get('/habits', habitsController.showByUser);

//post habits
router.post('/habits/store', habitsController.store);

//update habits
router.post('/habits/update', habitsController.update);

//delete habits
router.delete('/habit/del', habitsController.delete);

//------------------------------MOODS---------------------------------------
//retrieve moods
router.get('/moods', moodsController.showByUser);

//post moods
router.post('/moods/store', moodsController.store);

//update moods
router.post('/moods/update', moodsController.update);

//delete moods
router.delete('/mood/del', moodsController.delete);


/*
router.get('/logout', (req, res) => {
  req.logout();
});
*/
module.exports = router;

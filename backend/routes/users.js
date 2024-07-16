var express = require('express');
var router = express.Router();
var controller = require('../controllers/users.ctrl')

/* POST user.. signup user. */
router.post('/signup', controller.signupUser);
/* POST user.. login user . */
router.post('/login', controller.loginUser);
/* GET users.. get all users . */
router.get('/', controller.getUsers);
/* GET user... get sigle user by id. */
router.get('/:id', controller.getUser);
/* DELETE user... delete user by id. */
router.get('/delete/:id', controller.deleteUser);

module.exports = router;

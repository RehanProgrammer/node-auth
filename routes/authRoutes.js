const { Router } = require('express');
const authController = require ('../controllers/authController');

const router = Router();

router.get('/signup', authController.signUp_get);

router.post('/signup', authController.signUp_post);

router.get('/login', authController.login_get);

router.post('/login', authController.login_post);

module.exports = router;

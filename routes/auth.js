import express from 'express';
import * as authController from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/login', authController.login);

router.get('/register', (request, response) => {
	response.render('../views/pages/register')
})

router.post('/signup', authController.signup);

export { router };

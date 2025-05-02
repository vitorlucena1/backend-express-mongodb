import express from 'express';
import Controller from '../controller/endpoint.controller.js';
import verifyToken from '../middleware/jwt.token.middleware.js';

const router = express.Router();

router.get('/protected', verifyToken, Controller.securedEndpoint);

export default router;
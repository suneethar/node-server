import { isExpressionStatement } from "typescript";
import express, { Router } from 'express';
import { registerUser } from '../controllers/auth';

const authRouter: Router = express.Router();

authRouter.post(`/register`, registerUser);

export default authRouter;
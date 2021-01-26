import express, { Router } from 'express';

const indexRouter: Router = express.Router();

indexRouter.get('/', (req, res) => {
    res.status(200).send('Welcome to Express backend')
})

export default indexRouter;
import express from 'express';
import { addTheater, getTheaters, deleteTheater } from '../controllers/theaterController.js';
import { protectAdmin } from '../middleware/auth.js';

const theaterRouter = express.Router();

theaterRouter.get('/all', getTheaters);
theaterRouter.post('/add', protectAdmin, addTheater);
theaterRouter.delete('/delete/:theaterId', protectAdmin, deleteTheater);

export default theaterRouter;

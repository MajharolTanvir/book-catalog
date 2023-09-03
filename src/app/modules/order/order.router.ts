import express from 'express';
import { OrderController } from './order.controller';

const router = express.Router();

router.post('/create-order', OrderController.createOrder);
router.get('/', OrderController.allOrder);
router.get('/:id', OrderController.singleOrder);



export const OrderRouter = router;

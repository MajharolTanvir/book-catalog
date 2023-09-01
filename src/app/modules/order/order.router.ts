import express from 'express';
import { OrderController } from './order.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.post('/create-order', OrderController.createOrder);
router.get('/', auth(ENUM_USER_ROLE.admin), OrderController.allOrder);
router.get('/specific', auth(ENUM_USER_ROLE.customer), OrderController.specificOrders);
router.get('/:id', OrderController.singleOrder);



export const OrderRouter = router;

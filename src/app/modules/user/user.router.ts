import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';
import express from 'express';
const router = express.Router();

router.post(
  '/signup',
  validateRequest(UserValidation.createUser),
  UserController.createUser,
);

router.post(
  '/signin',
  validateRequest(UserValidation.loginAuth),
  UserController.loginAuth,
);

router.get('/', auth(ENUM_USER_ROLE.admin), UserController.allUser);
router.get('/:id', auth(ENUM_USER_ROLE.admin), UserController.singleUser);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.admin),
  validateRequest(UserValidation.updateUser),
  UserController.updateUser,
);
router.delete('/:id', auth(ENUM_USER_ROLE.admin), UserController.deleteUser);


export const UserRouter = router;

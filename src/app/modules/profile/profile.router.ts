import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import express from 'express';
import { userProfileController } from './profile.controller';
const router = express.Router();


router.get(
  '/',
  auth(ENUM_USER_ROLE.admin, ENUM_USER_ROLE.customer),
  userProfileController.userProfile,
);

export const UserProfileRouter = router;

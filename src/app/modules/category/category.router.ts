import { ENUM_USER_ROLE } from '../../../enums/user';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { CategoriesController } from './category.controller';
import { CategoriesValidation } from './category.validation';

const router = express.Router();

router.get('/', CategoriesController.allCategories);
router.get('/:id', CategoriesController.singleCategories);

router.post(
  '/create-category',
  auth(ENUM_USER_ROLE.admin),
  validateRequest(CategoriesValidation.createCategories),
  CategoriesController.createCategories,
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.admin),
  validateRequest(CategoriesValidation.updateCategories),
  CategoriesController.updateCategories,
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.admin),
  CategoriesController.deleteCategories,
);

export const CategoriesRouter = router;

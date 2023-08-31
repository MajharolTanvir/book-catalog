import { ENUM_USER_ROLE } from '../../../enums/user';
import { router } from '../../../shared/sharedRouter';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { CategoriesController } from './category.controller';
import { CategoriesValidation } from './category.validation';

router.get('/', CategoriesController.allCategories);

router.post(
  '/create-category',
  auth(ENUM_USER_ROLE.admin),
  validateRequest(CategoriesValidation.createCategories),
  CategoriesController.createCategories,
);

export const CategoriesRouter = router;

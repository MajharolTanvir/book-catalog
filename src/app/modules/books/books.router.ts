import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BooksController } from './books.controller';
import { BooksValidation } from './books.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.post(
  '/create-book',
  auth(ENUM_USER_ROLE.admin),
  validateRequest(BooksValidation.createBooks),
  BooksController.createBooks,
);

router.get('/', BooksController.allBooks);
router.get('/:id', BooksController.singleBooks);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.admin),
  validateRequest(BooksValidation.updateBooks),
  BooksController.updateBooks,
);

router.delete('/:id', auth(ENUM_USER_ROLE.admin), BooksController.deleteBooks);

export const BooksRouter = router;

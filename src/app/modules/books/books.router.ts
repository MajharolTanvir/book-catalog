import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BooksController } from './books.controller';
import { BooksValidation } from './books.validation';

const router = express.Router();

router.post(
  '/create-book',
  validateRequest(BooksValidation.createBooks),
  BooksController.createBooks,
);

router.get('/', BooksController.allBooks);

export const BooksRouter = router;

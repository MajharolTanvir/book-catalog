import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { BooksServices } from './books.services';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { booksFilterableFields } from './books.constant';

const createBooks = catchAsync(async (req: Request, res: Response) => {
  const result = await BooksServices.createBooks(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book created successful',
    data: result,
  });
});

const allBooks = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, booksFilterableFields);
  const options = pick(req.query, paginationFields);
  const result = await BooksServices.allBooks(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books retrieved successful',
    data: result,
  });
});

const singleBooks = catchAsync(async (req: Request, res: Response) => {
  const result = await BooksServices.singleBooks(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book retrieved successful',
    data: result,
  });
});

const updateBooks = catchAsync(async (req: Request, res: Response) => {
  const result = await BooksServices.updateBooks(req.params.id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book updated successful',
    data: result,
  });
});

const deleteBooks = catchAsync(async (req: Request, res: Response) => {
  const result = await BooksServices.deleteBooks(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book deleted successful',
    data: result,
  });
});

export const BooksController = {
  createBooks,
  allBooks,
  singleBooks,
  updateBooks,
  deleteBooks,
};

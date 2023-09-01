import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { BooksServices } from './books.services';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const createBooks = catchAsync(async (req: Request, res: Response) => {
  const result = await BooksServices.createBooks(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book created successful',
    data: result,
  });
});

export const BooksController = {
  createBooks,
};

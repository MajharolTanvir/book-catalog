import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { CategoriesService } from './category.services';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const createCategories = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoriesService.createCategories(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category created successful',
    data: result,
  });
});

const allCategories = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoriesService.allCategories();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Categories retrieved successful',
    data: result,
  });
});

const singleCategories = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoriesService.singleCategories(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category retrieved successful',
    data: result,
  });
});



export const CategoriesController = {
  createCategories,
  allCategories,
  singleCategories,
};

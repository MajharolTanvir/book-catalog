import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { OrderService } from './order.services';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const token: string | undefined = req.headers.authorization;

  try {
    if (!token) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Token not provided');
    }

    const verifiedUser = jwtHelpers.verifyToken(
      token,
      config.jwt.secret as Secret,
    );

    if (verifiedUser.role === 'admin') {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        'Admins cannot create orders. Please login as a customer account.',
      );
    }
    const { orderedBooks } = req.body;

    const result = await OrderService.createOrder(
      orderedBooks,
      verifiedUser?.id,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Order created successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
});


const allOrder = catchAsync(async (req: Request, res: Response) => {
  const token: string | undefined = req.headers.authorization;

  try {
    if (!token) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Token not provided');
    }

    const verifiedUser = jwtHelpers.verifyToken(
      token,
      config.jwt.secret as Secret,
    );

    const result = await OrderService.allOrders(verifiedUser);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Order retrieved successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
});


const singleOrder = catchAsync(async (req: Request, res: Response) => {
  const token: string | undefined = req.headers.authorization;

  try {
    if (!token) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Token not provided');
    }

    const verifiedUser = jwtHelpers.verifyToken(
      token as string,
      config.jwt.secret as Secret,
    );

    const result = await OrderService.singleOrder(verifiedUser, req.params.id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Order retrieved successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
});

export const OrderController = {
  createOrder,
  allOrder,
  singleOrder,
};

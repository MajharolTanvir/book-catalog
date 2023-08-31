import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { UserService } from "./user.services";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";



const createUser = catchAsync(
    async (req: Request, res: Response) => {
        const result = await UserService.createUser(req.body)

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "User created successful",
            data: result
        })
    }
)


const allUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.allUser();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users retrieved successful',
    data: result,
  });
});



const singleUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.singleUser(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successful',
    data: result,
  });
});


const updateUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.updateUser(req.params.id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successful',
    data: result,
  });
});


const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.deleteUser(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successful',
    data: result,
  });
});


export const UserController = {
  createUser,
  allUser,
  singleUser,
  updateUser,
  deleteUser,
};
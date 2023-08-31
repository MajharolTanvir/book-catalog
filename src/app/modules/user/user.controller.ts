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


export const UserController = {
  createUser,
  allUser,
};
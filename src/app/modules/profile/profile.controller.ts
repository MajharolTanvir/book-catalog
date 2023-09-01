import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import catchAsync from "../../../shared/catchAsync";
import { Request, Response } from "express";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";
import { UserProfileService } from "./profile.services";
import sendResponse from "../../../shared/sendResponse";


const userProfile = catchAsync(async (req: Request, res: Response) => {
  const token: string | undefined = req.headers.authorization;

  try {
    if (!token) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Token not provided');
    }

    const verifiedUser = jwtHelpers.verifyToken(
      token as string,
      config.jwt.secret as Secret,
    );
      
      
    const result = await UserProfileService.userProfile(verifiedUser?.id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Profile retrieved successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
});


export const userProfileController = {
    userProfile
}
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ReviewAndRatingsService } from "./ReviewAndRatings.services";
import { Request, Response } from "express";



const createReviewAndRatings = catchAsync(
    async (req: Request, res: Response) => {
        const result = await ReviewAndRatingsService.createReviewAndRatings(req.body)

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "",
            data: result
        })
    }


)


export const ReviewAndRatingsController = {
    createReviewAndRatings
}
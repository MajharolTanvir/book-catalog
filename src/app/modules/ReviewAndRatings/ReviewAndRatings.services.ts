import { prisma } from "../../../shared/prisma";
import { ReviewAndRatings } from "@prisma/client";


const createReviewAndRatings = async (payload: ReviewAndRatings) => {
    const result = await prisma.reviewAndRatings.create({
        data: payload
    })

    return result
}


export const ReviewAndRatingsService = {
    createReviewAndRatings
}
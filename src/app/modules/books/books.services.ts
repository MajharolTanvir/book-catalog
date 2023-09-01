import { Book } from "@prisma/client";
import { prisma } from "../../../shared/prisma";



const createBooks = async (payload: Book): Promise<Book> => {
    const result = await prisma.book.create({
        data: payload
    })
    return result
}


export const BooksServices = {
    createBooks
}
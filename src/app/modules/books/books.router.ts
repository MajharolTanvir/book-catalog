import { router } from "../../../shared/sharedRouter";
import validateRequest from "../../middlewares/validateRequest";
import { BooksController } from "./books.controller";
import { BooksValidation } from "./books.validation";


router.post(
  '/create-book',
  validateRequest(BooksValidation.createBooks),
  BooksController.createBooks,
);


export const BooksRouter = router
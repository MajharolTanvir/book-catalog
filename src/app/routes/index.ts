import express from 'express';
import { UserRouter } from '../modules/user/user.router';
import { CategoriesRouter } from '../modules/category/category.router';
import { BooksRouter } from '../modules/books/books.router';


const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    routes: UserRouter,
  },
  {
    path: '/users',
    routes: UserRouter,
  },
  {
    path: '/categories',
    routes: CategoriesRouter,
  },
  {
    path: '/books',
    routes: BooksRouter,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;

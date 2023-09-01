import express from 'express';
import { UserRouter } from '../modules/user/user.router';
import { CategoriesRouter } from '../modules/category/category.router';
import { BooksRouter } from '../modules/books/books.router';
import { OrderRouter } from '../modules/order/order.router';
import { UserProfileRouter } from '../modules/profile/profile.router';


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
  {
    path: '/orders',
    routes: OrderRouter,
  },
  {
    path: '/profile',
    routes: UserProfileRouter,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;

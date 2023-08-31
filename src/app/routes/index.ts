import express from 'express';
import { UserRouter } from '../modules/user/user.router';
import { CategoriesRouter } from '../modules/category/category.router';


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
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;

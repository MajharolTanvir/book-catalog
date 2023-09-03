"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_router_1 = require("../modules/user/user.router");
const category_router_1 = require("../modules/category/category.router");
const books_router_1 = require("../modules/books/books.router");
const order_router_1 = require("../modules/order/order.router");
const profile_router_1 = require("../modules/profile/profile.router");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/auth',
        routes: user_router_1.UserRouter,
    },
    {
        path: '/users',
        routes: user_router_1.UserRouter,
    },
    {
        path: '/categories',
        routes: category_router_1.CategoriesRouter,
    },
    {
        path: '/books',
        routes: books_router_1.BooksRouter,
    },
    {
        path: '/orders',
        routes: order_router_1.OrderRouter,
    },
    {
        path: '/profile',
        routes: profile_router_1.UserProfileRouter,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.routes));
exports.default = router;

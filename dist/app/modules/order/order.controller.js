"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const order_services_1 = require("./order.services");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const createOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    try {
        if (!token) {
            throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Token not provided');
        }
        const verifiedUser = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
        if (verifiedUser.role === 'admin') {
            throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Admins cannot create orders. Please login as a customer account.');
        }
        const { orderedBooks } = req.body;
        const result = yield order_services_1.OrderService.createOrder(orderedBooks, verifiedUser === null || verifiedUser === void 0 ? void 0 : verifiedUser.id);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Order created successfully',
            data: result,
        });
    }
    catch (error) {
        console.log(error);
    }
}));
const allOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    try {
        if (!token) {
            throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Token not provided');
        }
        const verifiedUser = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
        const result = yield order_services_1.OrderService.allOrders(verifiedUser);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Order retrieved successfully',
            data: result,
        });
    }
    catch (error) {
        console.log(error);
    }
}));
const singleOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    try {
        if (!token) {
            throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Token not provided');
        }
        const verifiedUser = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
        const result = yield order_services_1.OrderService.singleOrder(verifiedUser, req.params.id);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Order retrieved successfully',
            data: result,
        });
    }
    catch (error) {
        console.log(error);
    }
}));
exports.OrderController = {
    createOrder,
    allOrder,
    singleOrder,
};

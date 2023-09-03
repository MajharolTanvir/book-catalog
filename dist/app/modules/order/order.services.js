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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const prisma_1 = require("../../../shared/prisma");
const createOrder = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    const orderCreate = yield prisma_1.prisma.$transaction((orderTransaction) => __awaiter(void 0, void 0, void 0, function* () {
        const order = yield orderTransaction.order.create({
            data: {
                userId: id,
            },
        });
        for (let i = 0; i < payload.length; i++) {
            yield orderTransaction.orderedBook.create({
                data: {
                    orderId: order.id,
                    bookId: payload[i].bookId,
                    quantity: payload[i].quantity,
                },
            });
        }
        return order;
    }));
    const result = yield prisma_1.prisma.order.findMany({
        where: {
            id: orderCreate.id,
        },
        include: {
            orderedBooks: true,
        },
    });
    return result;
});
const allOrders = (user) => __awaiter(void 0, void 0, void 0, function* () {
    if (user.role === 'customer') {
        const result = yield prisma_1.prisma.order.findMany({
            where: { userId: user.id },
        });
        return result;
    }
    else {
        const result = user.role === 'admin' && (yield prisma_1.prisma.order.findMany({}));
        return result;
    }
});
const singleOrder = (user, id) => __awaiter(void 0, void 0, void 0, function* () {
    if (user.role === 'customer') {
        const result = yield prisma_1.prisma.order.findUnique({
            where: {
                userId: user.id,
                id,
            },
        });
        return result;
    }
    const result = yield prisma_1.prisma.order.findUnique({
        where: { id },
    });
    return result;
});
exports.OrderService = {
    createOrder,
    allOrders,
    singleOrder,
};

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
exports.UserService = void 0;
const prisma_1 = require("../../../shared/prisma");
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.user.create({
        data: payload,
    });
    const isUserExist = yield prisma_1.prisma.user.findFirst({
        where: {
            id: result.id,
        },
    });
    if (isUserExist) {
        const { id, role } = isUserExist;
        const accessToken = jwtHelpers_1.jwtHelpers.createToken({ id, role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
        const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ id, role }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
        return {
            accessToken,
            refreshToken,
        };
    }
    else {
        throw new Error('User does not exist');
    }
});
const loginAuth = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield prisma_1.prisma.user.findFirst({
        where: { email: payload.email },
    });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    // Match user password
    if ((payload === null || payload === void 0 ? void 0 : payload.password) !== (isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.password)) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Password does not match');
    }
    const { id: userId, role } = isUserExist;
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ userId, role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return {
        accessToken,
    };
});
const allUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.user.findMany({});
    return result;
});
const singleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.user.findUnique({
        where: {
            id,
        },
    });
    return result;
});
const updateUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.user.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.user.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.UserService = {
    createUser,
    loginAuth,
    allUser,
    singleUser,
    updateUser,
    deleteUser,
};

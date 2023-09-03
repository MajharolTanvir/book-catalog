"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post('/signup', (0, validateRequest_1.default)(user_validation_1.UserValidation.createUser), user_controller_1.UserController.createUser);
router.post('/signin', (0, validateRequest_1.default)(user_validation_1.UserValidation.loginAuth), user_controller_1.UserController.loginAuth);
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.admin), user_controller_1.UserController.allUser);
router.get('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.admin), user_controller_1.UserController.singleUser);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.admin), (0, validateRequest_1.default)(user_validation_1.UserValidation.updateUser), user_controller_1.UserController.updateUser);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.admin), user_controller_1.UserController.deleteUser);
exports.UserRouter = router;
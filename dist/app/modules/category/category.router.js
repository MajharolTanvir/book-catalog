"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesRouter = void 0;
const user_1 = require("../../../enums/user");
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const category_controller_1 = require("./category.controller");
const category_validation_1 = require("./category.validation");
const router = express_1.default.Router();
router.get('/', category_controller_1.CategoriesController.allCategories);
router.get('/:id', category_controller_1.CategoriesController.singleCategories);
router.post('/create-category', (0, auth_1.default)(user_1.ENUM_USER_ROLE.admin), (0, validateRequest_1.default)(category_validation_1.CategoriesValidation.createCategories), category_controller_1.CategoriesController.createCategories);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.admin), (0, validateRequest_1.default)(category_validation_1.CategoriesValidation.updateCategories), category_controller_1.CategoriesController.updateCategories);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.admin), category_controller_1.CategoriesController.deleteCategories);
exports.CategoriesRouter = router;

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
exports.getProductByNameHandler = exports.getUserProductsHandler = exports.deleteManyProductHandler = exports.createProductHandler = void 0;
const logger_1 = __importDefault(require("../../utils/logger"));
const product_service_1 = require("../service/product.service");
const socket_1 = require("../../utils/socket");
const createProductHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield (0, product_service_1.createProduct)(req.body.array);
        yield (0, socket_1.socketHandleUserSynchronization)({ req, res, data: product, whatToDo: 'change', where: 'product' });
        return res.send(product);
    }
    catch (error) {
        logger_1.default.error(error);
        return res.status(409).send(error.message);
    }
});
exports.createProductHandler = createProductHandler;
const deleteManyProductHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.body.array.forEach((product) => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, product_service_1.deleteManyProduct)({
                _id: product._id,
                user_ID: product.user_ID
            });
        }));
        yield (0, socket_1.socketHandleUserSynchronization)({ req, res, data: req.body.array, whatToDo: 'delete', where: 'product' });
        return res.send({});
    }
    catch (error) {
        logger_1.default.error(error);
        return res.status(409).send(error.message);
    }
});
exports.deleteManyProductHandler = deleteManyProductHandler;
const getUserProductsHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield (0, product_service_1.getUserProducts)(res.locals.token);
        return res.send(products);
    }
    catch (error) {
        logger_1.default.error(error);
        return res.status(409).send(error.message);
    }
});
exports.getUserProductsHandler = getUserProductsHandler;
const getProductByNameHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const items = yield (0, product_service_1.getProductByName)(req.body.find);
        return res.send({ items });
    }
    catch (error) {
        logger_1.default.error(error);
        return res.status(409).send(error.message);
    }
});
exports.getProductByNameHandler = getProductByNameHandler;

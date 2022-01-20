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
exports.getProductByName = exports.getProduct = exports.getUserProducts = exports.deleteManyProduct = exports.createProduct = void 0;
const product_model_1 = require("../models/product.model");
const lodash_1 = require("lodash");
const createProduct = (input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_model_1.ProductModel.create(input);
        return product;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.createProduct = createProduct;
const deleteManyProduct = (input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_model_1.ProductModel.updateOne(input, [
            {
                $set: { deleted: true }
            }
        ]);
        return product;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.deleteManyProduct = deleteManyProduct;
const getUserProducts = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_model_1.ProductModel.find({
            $and: [
                {
                    user_ID: token._id
                },
                {
                    deleted: {
                        $exists: false
                    }
                }
            ]
        });
        return products;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.getUserProducts = getUserProducts;
const getProduct = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = (0, lodash_1.omit)((yield product_model_1.ProductModel.findOne({ _id })).toJSON(), 'deleted');
        return product;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.getProduct = getProduct;
const getProductByName = (find) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let regex = { name: { $regex: find, $options: 'im' } };
        if (find.split(" ").length > 1)
            regex = { $text: { $search: find.split(" ").map((str) => "\"" + str + "\"").join(' ') } };
        const products = yield product_model_1.ProductModel.find({
            $and: [
                { user_ID: { $exists: false } },
                { deleted: { $exists: false } },
                regex
            ]
        })
            .sort({ l: 1, v: -1 })
            .limit(10);
        return products;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.getProductByName = getProductByName;

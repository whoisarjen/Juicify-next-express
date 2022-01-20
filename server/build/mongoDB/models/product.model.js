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
exports.ProductModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_long_1 = __importDefault(require("mongoose-long"));
(0, mongoose_long_1.default)(mongoose_1.default);
const Long = mongoose_1.default.Schema.Types.Long;
const productSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        text: true,
        required: true
    },
    l: Number,
    v: Boolean,
    deleted: Boolean,
    user_ID: String,
    checkMe: Boolean,
    code: Long,
    p: Number,
    c: Number,
    s: Number,
    f: Number,
    fi: Number,
    na: Number,
    ethanol: Number
});
productSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        let product = this;
        if (product.isNew) {
            product.l = product.name.length;
        }
        return next();
    });
});
exports.ProductModel = mongoose_1.default.model('product', productSchema);

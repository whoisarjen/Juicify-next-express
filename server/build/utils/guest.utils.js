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
exports.removeUsersSensitiveData = void 0;
const lodash_1 = require("lodash");
const removeUsersSensitiveData = (array) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise(resolve => {
        let newUsers = [];
        for (let i = 0; i < array.length; i++) {
            const user = (0, lodash_1.omit)(array[i], [
                'email',
                'email_confirmation',
                'registered',
                'password',
                'password_remind_hash',
                'createdAt',
                'updatedAt'
            ]);
            newUsers.push(user);
        }
        resolve(newUsers);
    });
});
exports.removeUsersSensitiveData = removeUsersSensitiveData;

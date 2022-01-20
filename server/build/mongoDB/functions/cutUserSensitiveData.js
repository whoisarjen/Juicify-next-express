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
function default_1(Array) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(resolve => {
            let response = [];
            for (let i = 0; i < Array.length; i++) {
                let object = JSON.parse(JSON.stringify(Array[i]));
                delete object.email_confirmation;
                delete object.meal_number;
                // delete object.users_roles_ID
                // delete object.public_profile
                delete object.goal;
                delete object.coach;
                delete object.registered;
                // delete object.banned
                // delete object.avatar
                delete object.fiber;
                delete object.sugar_percent;
                delete object.water_adder;
                delete object.workout_watch;
                // delete object._id
                // delete object.login
                delete object.password;
                delete object.email;
                delete object.height;
                delete object.birth;
                // delete object.sex
                delete object.language;
                delete object.macronutrients;
                // delete object.instagram
                // delete object.twitter
                // delete object.facebook
                // delete object.website
                // delete object.description
                // delete object.name
                // delete object.surname
                response.push(object);
            }
            resolve(response);
        });
    });
}
exports.default = default_1;

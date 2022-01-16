const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const cache_productSchema = new Schema({
    en: {
        type: String,
        required: [true, 'required!']
    },
    pl: String,
    p: Number,
    p_v: Number,
    c: Number,
    c_n: Number,
    s: Number,
    f: Number,
    f_s: Number,
    f_m: Number,
    f_p: Number,
    fi: Number
})

const cache_product = mongoose.model('cache_product', cache_productSchema)

module.exports = cache_product
import ProductProps from "../../interfaces/product";

const mongoose = require('mongoose')
require('mongoose-long')(mongoose);
const Long = mongoose.Schema.Types.Long;
const Schema = mongoose.Schema;

const productSchema: ProductProps = new Schema({
    name: {
        type: String,
        text: true,
        required: [true, 'required!']
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
})

const productModel = mongoose.model('product', productSchema)

export default productModel;
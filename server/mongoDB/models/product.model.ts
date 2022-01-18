import mongoose from 'mongoose'
import mongooseLong from 'mongoose-long';

mongooseLong(mongoose);

const Long = mongoose.Schema.Types.Long;

export interface ProductProps {
    _id?: string,
    name?: string,
    l?: number,
    v?: boolean,
    deleted?: boolean,
    user_ID?: string,
    checkMe?: boolean,
    code?: number,
    p?: number,
    c?: number,
    s?: number,
    f?: number,
    fi?: number,
    na?: number,
    ethanol?: number
}

const productSchema = new mongoose.Schema({
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
})

productSchema.pre("save", async function (next) {
    let product: any = this

    if (product.isNew) {
        product.l = product.name.length
    }

    return next();

})

export const ProductModel = mongoose.model('product', productSchema);
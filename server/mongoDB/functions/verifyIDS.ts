import is_id from './is_id'

const verifyIDS = async (req) => {
    if(req.body.array && req.body.array.length){
        req.body.array.map(async x => {
            if(x._id && !await is_id(x._id)){
                delete x._id
            }
            return x;
        })
    }
}

export default verifyIDS;
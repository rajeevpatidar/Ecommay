import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    products:[{
        type:mongoose.Schema.Types.ObjectID,
        ref:"Product",
    }],
    payments:{},
    buyer:{
        type :  mongoose.Schema.Types.ObjectID,
        ref: 'users'
    },
    status: {
        type:String,
        default:'Not process',
        enum:['Not process','Processing','Shipped','deliverd','Cancel']
    },
},
    { timestamps:true }
    )
export default mongoose.model("Order",orderSchema);
// import mongoose from "mongoose";

// const { Schema } = mongoose;

// const orderSchema = new Schema({
//     products: [{
//         type: Schema.Types.ObjectId,
//         ref: "Products",
//     }],
//     payment: {},
//     buyer: {
//         type: Schema.Types.ObjectId,
//         ref: 'users'
//     },
//     status: {
//         type: String,
//         default: 'Not Process',
//         enum: ['Not Process', 'Processing', 'Shipped', 'Delivered', 'Cancel']
//     },
// },
//     { timestamps: true });

// export default mongoose.model("Order", orderSchema);

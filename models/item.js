const mongoose = require ("mongoose");

const itemSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true,
        unique : true,
    }, 
    description : {
        type : String,
        required : true,
    }, 
    price: {
        type : Number,
        min : 0,
        required : true,
    }, 
    quantity : {
        type : Number,
        min : 0,
        default : 0,
    },
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Category",
        required : true
    }
})

module.exports = mongoose.model("Item", itemSchema)
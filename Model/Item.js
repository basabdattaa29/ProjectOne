const mongoose = require('mongoose');
const SchemaVariable = mongoose.Schema;
const ItemDetails = new SchemaVariable({
    ItemNm: {
        type: String,
        required: true
    },
    Itemcat: {
        type: String,
        required: true
    },
    ItemPrice: {
        type: Number,
        required: true
    },
    ItemImg: {
        type: String,
        required: true
    },
    ItemDesc: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Items', ItemDetails);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FoodlogSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    calories: {
        type: Number,
        required: true
    }
});

const Foodlog = mongoose.model('Foodlog', FoodlogSchema);
module.exports = Foodlog;

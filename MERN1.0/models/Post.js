const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema ({
    title: {
        type: string,
        required: true
    },
    question: {
        type: string,
        required: true
    },
    answer: {
        type: string,
        required: true
    },
    category: {
        type: string,
        required: true
    },
    subCategory: {
        type: string,
        required: true
    },
    counter: {
        type: number,
        default: 0
    }
})
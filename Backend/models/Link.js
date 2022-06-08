const mongoose = require('mongoose')
const shortid = require('shortid')
const { Schema } = mongoose

const LinkSchema = new Schema({
    _id: {
        type: String,
        default:shortid.generate
    },
    originalUrl: {
        type: String,
        required: true,
    },
    urlBackHalf:{
        type:String,
        default:""
    },
    clicks: {
        type: Number,
        required: true,
        default: 0,
    },
    date: {
        type: String,
        default: Date.now,
    },

})

module.exports = mongoose.model('Link', LinkSchema)
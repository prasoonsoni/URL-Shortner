require('dotenv').config()
const express = require('express')
const router = express.Router()
const Link = require('../models/Link')

router.post('/', async (req, res) => {
    try {
        const { url, back_half } = req.body
        const backHalfExist = await Link.findOne({ urlBackHalf: back_half })
        if (backHalfExist && back_half.length!==0) {
            return res.json({ success: false, message: "Back Half already taken." })
        }

        const link = await Link.create({
            originalUrl: url,
            urlBackHalf: back_half
        })
        
        if (back_half.length === 0) {
            const update = await Link.updateOne({ _id: link._id, }, { $set: { urlBackHalf: link._id } })
            return res.json({ success: true, shortenUrl: [`${process.env.HOST}/${link._id}`] })
        }

        res.json({ success: true, shortenUrl: [`${process.env.HOST}/${link._id}`, `${process.env.HOST}/${link.urlBackHalf}`] })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Some internal server error occured." })
    }
})

module.exports = router
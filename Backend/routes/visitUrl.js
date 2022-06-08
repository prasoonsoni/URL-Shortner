const express = require('express')
const router = express.Router()
const Link = require('../models/Link')

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const link = await Link.findOneAndUpdate({ $or: [{ _id: id }, { urlBackHalf: id }] }, { $inc: { clicks: 1 } })
        if (!link) {
            return res.send("URL is not valid. Please enter a valid URL and try again.")
        }
        res.redirect(link.originalUrl)
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Some internal server error occured." })
    }
})

module.exports = router
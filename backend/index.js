const express = require('express')
const app = express()
const cors = require('cors')
const port = 5000
const connectToDatabase = require('./database/connection')
connectToDatabase()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.redirect("https://urlshortner.prasoon.codes")
})

app.use('/short', require('./routes/shortUrl'))
app.use('/', require('./routes/visitUrl'))

app.listen(port, () => {
    console.log(`URL Shortner listening on http://localhost:${port}`)
})
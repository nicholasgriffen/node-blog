const express = require('express')
const cors = require('cors')
const router = require('./router')

const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors())
app.listen(port, () => console.log(`Listening on ${port}`))

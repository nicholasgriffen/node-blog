const express = require('express')
const cors = require('cors')
const postsRouter = require('./posts/router')

const port = process.env.PORT || 3000
const app = express()

app.use(express.json())
app.use(cors())
app.use('/posts', postsRouter)

app.use((req, res, next) => {
    return next({status: 404, message: 'no routes found'})
})

app.use((err, req, res, next) => {
    res.status(err.status || 500).json(err || new Error('Something happened'))
})

app.listen(port, () => console.log(`Listening on ${port}`))

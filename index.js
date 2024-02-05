// imports
const express = require('express')
const cors = require('cors')
const app = express()
const videosRoute = require('./routes/videos')

app.use(express.json())
app.use(cors())

app.use(express.static('./public'));
// videosRoute
app.use("/videos", videosRoute)

// dotenv and way to get PORT # from env
require('dotenv').config()
const { PORT } = process.env || 8000

// listening to app
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})

// browser check
app.get('/', (req, res)=>{
    res.json('Hi! You are approaching to get to Videos API!!')
})

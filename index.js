const express = require('express')
const cors = require('cors')
const app = express()
const videosRoute = require('./routes/videos')

app.use(express.json())
app.use(cors())

// PUT the API requirement here
// app.use((req,res,next), ()=>{

// })

app.use("/videos", videosRoute)
// REQUIRED LINE OF CODE TO GET ACCESS TO process.env
require('dotenv').config()
const { PORT } = process.env || 8000

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})

app.get('/', (req, res)=>{
    res.json('Hi! You are approaching to get to Videos API!!')
})

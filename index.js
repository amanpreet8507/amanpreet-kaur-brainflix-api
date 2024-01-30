const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json())

app.use(cors())

// REQUIRED LINE OF CODE TO GET ACCESS TO process.env
require('dotenv').config()

const PORT = process.env.PORT || 8000

require('dotenv').config()
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})

app.get('/', (req, res)=>{
    res.json('Hi')
})
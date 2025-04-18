// const express = require('express')

// use import over require
// add type= module im package.json

import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import db from "./utils/db.js"
import cookieParser from "cookie-parser"


// import all routes
import userRoutes from "./routes/user.routes.js"


dotenv.config()


// express ke shaktiya app meh transfer
const app = express()

app.use(cors({
    // config
    origin: process.env.BASE_URL,    //kaha se req ane chiaye sirf; local par thikse cors work nahi karte
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],       //yeh req accept karo
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}))


app.use(express.json());    //json data accept karlo
app.use(express.urlencoded({        //url accept karlo
    extended: true      
}));


// cookie access
app.use(cookieParser())


// const port = 3000 //--> .env meh shift
// env wala consider kar or 4000
const PORT= process.env.PORT || 4000


// get type request on / route
app.get('/', (req, res) => {
    // callback fn
  res.send('Chai piyo, Biscuit khao')
})


// route ; route start with /
app.get('/say', (req, res)=>{       //kaha bejna hai(/say), kya karna hai(arr fn)
    res.send("silver blue")
})

// connect to db
db()


// user routes
app.use('/api/v1/users/', userRoutes)   //control to userRoutes default



// listen karo port per
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
// server is infinite loop; app.listen
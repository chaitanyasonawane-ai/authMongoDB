import mongoose from "mongoose";

import dotenv from "dotenv"
dotenv.config()


// export fn to connect to db:
const db = ()=>{
    mongoose
    .connect(process.env.MONGO_URL)
    .then(()=> {
        console.log("connected to mongodb")
    })
    .catch((err)=>{
        console.log("error connecting to mongodb")
    })
}

// db ko export; single so default
export default db
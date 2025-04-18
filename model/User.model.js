import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
        // schema
        name : String,
        email: String,
        password: String,
        role:{
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        isVerified:{
            type: Boolean,
            default: false,

        },
        verificationToken:{
            type: String,
        },
        resetPasswordToken:{
            type: String,
        },
        resetPasswordExpires:{
            type: Date,
        },


    }, 
    {
        timestamps: true,
        // created at
        // updated at
    }
)


// hooks
userSchema.pre("save", async function (next){
    // this have access of current context
    if (this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10)
    }

    next()

})


const User= mongoose.model("User", userSchema)  //"bolo kya", kispar base

export default User; //const User
import User from "../model/User.model.js"
import crypto from "crypto"
import nodemailer from "nodemailer"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

const registerUser= async(req, res)=> {
    // business logic
    // res.send("registered");

    // get data
    // validate
    // check if user already exists
    //create user in database
    // create verification token
    // save token in db
    // send token as email to user
    // send success status to user


    const {name, email, password}= req.body

    if(!name || !email || !password){
        return res.status(400).json({
            message: "All fields are required"
        })
    }

    // console.log(email)


    try {
       const existingUser= await User.findOne({email})
        if (existingUser){
            return res.status(400).json({
                message: "User already exists"
            })
        }

        const user= await User.create({
            name,
            email,
            password
        })

        console.log(user)

        if(!user){
            return res.status(400).json({
                message: "User not registered"
            })
        }

        // generate random
        const token = crypto.randomBytes(32).toString("hex")
        console.log(token)

        user.verificationToken= token

        await user.save()

        // sned email
        const transporter = nodemailer.createTransport({
            host: process.env.MAILTRAP_HOST,
            port: process.env.MAILTRAP_PORT,
            secure: false, // true for port 465, false for other ports
            auth: {
              user: process.env.MAILTRAP_USERNAME,
              pass: process.env.MAILTRAP_PASSWORD,
            },
          });


          const mailOption = {
                from: process.env.MAILTRAP_SENDEREMAIL, // sender address
                to: user.email, // list of receivers
                subject: "Verify your email", // Subject line
                text: `please click on following link: ${process.env.BASE_URL}/api/v1/users/verify/${token}`,
            }

      await transporter.sendMail(mailOption)
      
      res.status(200).json({
        message: "user register successfully",
        success: true
      })







    } catch (error) {

        res.status(400).json({
            message:"user not registered",
            error,
            success: false

        })

        
    }

};

const verifyUser= async(req, res)=>{
    // get token from url
    // validate
    // find user based on token
    // if not

    // set isVerified to true
    // remove verification token
    // return response


    const {token} = req.params

    console.log(token)

    if(!token){
        return res.status(400).json({
            message: "invalid token"
        })
    }


    const user = await User.findOne({verificationToken: token})


    if(!user){
        return res.status(400).json({
            message: "invalid token"
        })
    }

    user.isVerified = true
    user.verificationToken = undefined

    // db in another continent
    await user.save()

    
}

const login = async(req, res)=>{
    const {email, password}= req.params

    if(!email || !password){
        return res.status(400).json({
            message: "all fields are required"
        })
    }

    try {
        // User is mongoose model
        const user= await User.findOne({email})

        // chekc if emaill exist
        if(!user){
            return res.status(400).json({
                message: "invalid email or password"
            })
        
        }


        // password match in db
        const isMatch = await bcrypt.compare(password, user.password)

        console.log(isMatch)

        if(!isMatch){
            return res.status(400).json({
                message: "invalid email or password"
            })
        }

        // isVerfied check






        // login session token / JWT
        const token = jwt.sign({id: user._id, role: user.role}, 
            "shhhhh", {
            expiresIn: '24h'
        })


        const cookieOptions = {
            httpOnly: true,
            secure: true,
            maxAge: 24*60*60*1000
        }

        res.cookie("token", token, cookieOptions)


        res.send(200).json({
            message: "login successful",
            token,
            user:{
                id: user._id,
                name: user.name,
                role: user.role
            }
        })




    } catch (error) {

        
    }
}

const getMe= async(req,res)=>{
    try {
        // const data = req.user
        // console.log("reached at profile level", data)

       const user= await User.findById(req.user.id).select('-password')
    } catch (error) {
        
    }
    
}

const logoutUser= async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
    
}

const resetPassword= async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
    
}

const forgotPassword= async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
    
}

export {registerUser, verifyUser, login, getMe, logoutUser, resetPassword, forgotPassword}
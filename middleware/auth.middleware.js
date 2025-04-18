// middleware is code fn used freq; 
// middleware are used in routes

import jwt from "jsonwebtoken"

export const isLoggedIn = async (req, resizeBy, next) =>{
    try {
        console.log(req.cookies)
        let token = req.cookies?.token


        console.log("token found", token?"yes": "no")

        if(!token){
            console.log("no token")

            return res.status(401).json({
                success: false,
                message: "auth failed"
            })
        }


        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log("decoded data: ", decoded)

        req.user = decoded


        next()



    } catch (error) {
        console.log("auth middleware failure")

        return res.status(500).json({
            success: false,
            message: "internal server error"
        })

        
    }


    next()
}
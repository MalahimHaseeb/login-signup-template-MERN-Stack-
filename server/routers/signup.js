const express = require("express")
const router = new express.Router();
const User = require("../models/user")
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');

// Now we will handle post request
router.post("/register", async (req, res) => {
    // try {
    //     const adding = new User(req.body)
    //     const insert = await adding.save()
    //     res.status(201).send(insert)
    // } catch (error) {
    //     res.status(500).send(error.message)
    // }

    if (req.method == 'POST') {
     const{name,email}=req.body   
       let u = new User({name,email,password:CryptoJS.AES.encrypt(req.body.password,process.env.SECRET_KEY).toString()})
       await u.save()
       res.status(200).send({
           success: true,
           message: 'Your account has been created',
       })
       }
       else {
           res.status(400).send({
               success: false,
               message: 'This method is not allowed',
           })
       }
})

// Now we will handle login post request
router.post("/login", async (req, res) => {
    // try {
        //    const insert =await User.findOne({email})
        //     res.status(201).send(insert)
        // } catch (error) {
            //     res.status(500).send(error.message)
            // }
            try {
                if (req.method == 'POST') {
            const {email, password} = req.body
            let user = await User.findOne({ "email": req.body.email })
            if (user) {
                let password =CryptoJS.AES.decrypt(user.password,process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8)
                if (req.body.email === user.email && req.body.password === password) {
                    var token = jwt.sign({ 
                        email: user.email,
                        name: user.name},process.env.JWT_SECRET,{ expiresIn: '3d'} );

                    res.status(200).send({ success: true,token , email: user.email})
                }
                else {
                    res.status(500).send({
                        success: false,
                        message: "Invalid Credentials"
                    })
                }

            } else {
                res.status(402).send({
                    success: false,
                    message: "No user  found"
                })
            }
        }
        else {
            res.status(400).send({
                success: false,
                message: 'This method is not allowed',
            })
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in login',
            error
        })
    }
})



module.exports = router;
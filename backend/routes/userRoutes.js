const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/userModel");
const userRoutes = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      User: 
 *          type: object
 *          properties: 
 *              id:
 *                  type: string
 *                  description: It will have the auto generated ID.
 *              name:
 *                  type: string
 *                  description: The name of user.
 *              email :
 *                  type: string
 *                  description: The email of user.
 *              pass :
 *                  type: string
 *                  description: The password of user.  
 */

/**
 * @swagger
 * tags:
 *  name: Users
 *  descripation: All the API related to users
 */

/**
 * @swagger
 * /users:
 *  get:
 *      summary: This will get all user data from database.
 *      tags: [Users]
 *      responses:
 *          200:
 *              description: The list of all users
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          item: 
 *                              $ref: "#components/schemas/user"
 *          500:
 *              description: Some Server Error                      
 */


userRoutes.post("/register", async (req, res) => {
    const { name, email, pass } = req.body;
    try {
        bcrypt.hash(pass, 5, async (err, hash) => {
            if (err) {
                res.send({ "error": err })
            } else if (hash) {
                const user = await new UserModel({ name, email, pass: hash })
                await user.save()
                res.send({ "msg": "New User Registered" })
            }
        })
    } catch (err) {
        res.send({ "error": err })
    }
})

userRoutes.post("/login", async (req, res) => {
    const { email, pass } = req.body;
    try {
        const user = await UserModel.findOne({ email })
        bcrypt.compare(pass, user.pass, async (err, decoded) => {
            if (decoded) {
                const token = jwt.sign({ userID: user._id, user: user.name }, "krishna");
                res.send({ "msg": "Login Successful", "token": token })
            } else {
                res.send({ "msg": "Wrong Credentials" })
            }
        })
    } catch (err) {
        res.send({ "error": err })
    }
})


module.exports = {
    userRoutes
}
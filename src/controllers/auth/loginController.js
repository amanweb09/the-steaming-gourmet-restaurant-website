const mongoose = require('mongoose');
const Users = require('../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const envVar = require('../../../config/envVar');
require('dotenv').config();

const loginController = () => {
    return {
        render(req, res) {
            return res.render('auth/login')
        },
        async access(req, res) {
            
            try {
                const { email, password } = req.body;

                if (!email || !password) {
                    return res.redirect('/login')
                }

                await Users.findOne({ email }, async (err, user) => {
                    if (err) {
                        //NO USER EXISTS
                        console.log(err.message)
                        return res.redirect('/signup')
                    }
                    if (user) {
                        const verify = await bcrypt.compare(password, user.password);

                        if (!verify) {
                            //INVALID CREDENTIALS
                            console.log('invalid pwd')
                            return res.redirect('/login');
                        }
                        else {
                            //VALID CREDENTIALS
                            await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
                                expiresIn: "2 days"
                            }, async (err, token) => {
                                if (err) {
                                    //SOMETHING WENT WRONG
                                    console.log(err)
                                    return res.redirect('/login');
                                }
                                if (token) {
                                    await user.accessToken.unshift(token);
                                    await res.cookie('jwt', token);

                                    console.log('success');
                                    return res.redirect('/');
                                }
                            })
                        }
                    }
                })
            } catch {
                err => {
                    console.log(err);
                    res.redirect('/login')
                }
            }
        }
    }
}

module.exports = loginController;
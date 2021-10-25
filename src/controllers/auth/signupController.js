const mongoose = require('mongoose');
const Users = require('../../models/user');
const bcrypt = require('bcrypt');

function signupController() {
    return {
        render(req, res) {
            res.render('auth/signup.ejs')
        },
        async store(req, res) {
            try {
                const { name, email, tel, password } = req.body;
    
                if (!name || !email || !tel || !password) {
                    res.redirect('/signup')
                }

                await Users.findOne({$or: [{name}, {email}]}, async (err, user) => {
                    if (user) {
                        //USER ALREADY EXISTS
                        res.redirect('/login')
                    }

                    //USER DOESN'T EXISTS
                    await bcrypt.hash(password, 10, async (err, hash) => {
                        if (err) {
                            //SOMETHING WENT WRONG
                            console.log(err)
                            res.redirect('/signup')
                        }

                        if (hash) {
                            const user = new Users({name, email, tel, password: hash});
                            await user.save((err, data) => {
                                if (err) {
                                    //DATABASE ERROR
                                    console.log(err)
                                    res.redirect('/signup')
                                }
                                if (data) {
                                    //SIGNUP SUCCESSFUL
                                    console.log('success')
                                    res.redirect('/signup')
                                }
                            })

                        }
                    })

                })

            }
            catch {
                err => {
                    console.log(err);
                    res.redirect('/signup'); 
                }
            }

        }
    }
}

module.exports = signupController;
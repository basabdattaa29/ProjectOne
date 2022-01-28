const path = require('path');
const ReglogModel = require("../Model/auth");
const bcrypt = require('bcryptjs');

exports.getRegDisplay = (req, res) => {
    let message = req.flash('error');
    console.log(message);
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('Auth/regis', {
        title_page: "Reg form",
        path: '/reg_page',
        errorMsg: message,
    })
}

exports.regPostform = (req, res) => {
    console.log("collected value form form: ", req.body);
    const user_fname = req.body.fname;
    const user_lname = req.body.lname;
    const user_state = req.body.state;
    const user_city = req.body.city;
    const user_phno = req.body.phno;
    const user_email = req.body.email;
    const user_paswd = req.body.psd;

    ReglogModel.findOne({ EMail: user_email })
        .then(userValue => {

            if (userValue) {
                console.log(userValue, "Email already exist");
                req.flash('error', 'Email already exist,try new email')
                return res.redirect('/log_page');
            }
            return bcrypt.hash(user_paswd, 12)
                .then(hashPassword => {
                    const userData = new ReglogModel({Fname:user_fname,Lname: user_lname, State: user_state, City: user_city, PHNO: user_phno,EMail: user_email, Passwd: hashPassword });
                    return userData.save()
                }).then(result => {
                    console.log('Resgistration Done');
                    return res.redirect('/log_page');
                }).catch(err => {
                    console.log(err);

                })

        }).catch(err => {
            console.log("error in findone", err);

        })






}

exports.getlogDisplay = (req, res) => {
    let message = req.flash('error');
    console.log(message);
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;

    }
    res.render('Auth/login', {
        title_page: "Login form",
        path: '/log_page',
        errorMsg: message,
        cookie_data: req.cookies,
    })
}

exports.loginPostForm = (req, res) => {
    const user_email = req.body.email;
    const user_paswd = req.body.psd;
    const checked = req.body.checked;

    ReglogModel.findOne({ EMail: user_email })
        .then(UserValue => {
            if (!UserValue) {
                console.log('Invalid email');
                req.flash('error', 'Invalid Email,try again')
                return res.redirect('/log_page')
            }
            bcrypt.compare(user_paswd, UserValue.Passwd)
                .then(result => {
                    console.log(result);
                    if (!result) {
                        console.log("Invalid password");

                    } else {
                        console.log('logged in' + result);
                        req.session.isLoggedIn = true;
                        req.session.user = UserValue;
                        return req.session.save(err => {
                            if (err) {
                                console.log(err);

                            }
                            else {
                                if (checked) {
                                    const cookiedata = { emailCookie: UserValue.Email, password: user_paswd };
                                    res.cookie("cookiedata", cookiedata, {
                                        expires: new Date(Date.now() + 120000),
                                        httpOnly: true
                                    })
                                }
                            }
                            console.log('logged in');
                            return res.redirect('/itemtDet');
                        })
                    }
                    res.redirect('/log_page')
                }).catch(err => {
                    console.log(err);
                    res.redirect('/log_page')
                })
        }).catch(err => {
            console.log("error to find email:", err);

        })

}





exports.logout = (req, res) => {
    req.session.destroy(err => {

        res.redirect('/reg_page');
    });

}
const express = require('express');
const appServer = express();
const path = require('path');
const admin_route = require('./Route/adminRoute');
const auth_route = require('./Route/authRoute');
const multer = require('multer');
const bcrypt = require('bcryptjs');
const ReglogModel = require("./Model/auth");
const auth_check = require('./middle-ware/isAuth');
const session = require('express-session');

const mongodb_session = require('connect-mongodb-session')(session);
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');


const mongoose = require('mongoose');
const dbDriver="mongodb+srv://basab1996:akhiroy2021@cluster0.kegdd.mongodb.net/MongosProject?retryWrites=true&w=majority";

appServer.use(express.urlencoded());
appServer.set('view engine', 'ejs');
appServer.set('views', 'Views');
appServer.use(flash());
appServer.use(cookieParser());



appServer.use(express.static(path.join(__dirname, 'Public')))
appServer.use('/Uploaded_images', express.static(path.join(__dirname, 'Uploaded_images')))

const fileStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'Uploaded_images')
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname)
    }
});


const fileFilter = (req, file, callback) => {
    if (file.mimetype.includes("png") ||file.mimetype.includes("jpg") ||file.mimetype.includes("jpeg")) {
        callback(null, true)
    } else {
        callback(null, false)
    }
}

appServer.use(multer({ storage: fileStorage, fileFilter: fileFilter, limits: { fieldSize: 1024 * 1024 * 5 } }).single('iimg'))

const storeValue = new mongodb_session({
    uri: 'mongodb+srv://basab1996:akhiroy2021@cluster0.kegdd.mongodb.net/MongosProject',
    collection: 'my-session'
})
appServer.use(session({ secret: 'secret-key', resave: false, saveUninitialized: false, store: storeValue }))


appServer.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    ReglogModel.findById(req.session.user._id)
        .then(UserValue => {
            req.user = UserValue;
            console.log('user details:', req.user);
            next();
        }).catch(err => console.log("user not found", err));


});


appServer.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    next();
})

appServer.use(admin_route);
appServer.use(auth_route);



mongoose.connect(dbDriver, { useNewUrlParser: true, useUnifiedTopology: true }).then(result => {
    appServer.listen(1600, () => {
        console.log("server is running at localhost:1600");

    });
}).catch(err => {
    console.log(err);

})
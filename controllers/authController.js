const User = require('../models/User');

module.exports.signUp_get = (req,res) =>{
    res.render('signup');
}

module.exports.signUp_post = (req,res) =>{
    const { email, password } = req.body;

    
        User
        .create({email,password})
        .then(user =>{
            console.log(user);
            res.status(201).json(user)
        })
        .catch(error=>{
        console.log("Rehan",error);
        res.status(400).send('error, user not created');
    });
}

module.exports.login_get = (req,res) =>{
    res.render('login');
}

module.exports.login_post = (req,res) =>{
    const { email, password } = req.body;
    res.send('user login');
}
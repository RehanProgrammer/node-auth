const User = require('../models/User');

const handleErrors = (err) => {
    let error = {email:'',password:''};

    //duplicate email found
    if (err.code === 11000){
        error.email = 'that email is already in use';
        return error;
    }

    if (err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            error[properties.path] = properties.message;
        })
        //console.log(err);
    }
    return error;
}

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
        const errors =handleErrors(error);
        console.log('error: ',error);
        res.status(400).send(errors);
    });
}

module.exports.login_get = (req,res) =>{
    res.render('login');
}

module.exports.login_post = (req,res) =>{
    const { email, password } = req.body;
    res.send('user login');
}
module.exports.signUp_get = (req,res) =>{
    res.render('signup');
}

module.exports.signUp_post = (req,res) =>{
    res.send('new signup');
}

module.exports.login_get = (req,res) =>{
    res.render('login');
}

module.exports.login_post = (req,res) =>{
    const { emai }
    res.send('user login');
}
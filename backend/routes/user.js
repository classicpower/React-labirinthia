const express = require('express');
const router = express.Router();
const Login = require('../models/Login');
const jwt = require('jsonwebtoken');

// @route POST api/main
// @desc  Login user
// @access Public

router.post('/login/', async (req, res) => {
    const data = req.body;

    let userData = {};

    if (data.type === 'vk') {
        userData = {
            userId: data.user.id,
            firstName: data.user.first_name,
            secondName: data.user.last_name,
        }
    }
    
    else if (data.type === 'google') {
        if (data.type === 'vk') {
            userData = {
                userId: data.userId,
                firstName: data.firstName,
                secondName: data.secondName,
            }
        }
    }
    try {
        //const newUser = new Login(userData)
        //const user = await newUser.save()
        
        jwt.sign(userData, 'secret', { expiresIn: '25s' }, (error, token) => {
            res.json({
                status: true,
                userData,
                token
            });
            
            if (error) {
                console.log(error)
            }
        })
        
       
    } catch(err) {
        console.error(err);
        res.status(500).send('Server error')
    }
});

router.post('/login/auth/', async (req, res) => {
    const bearerHeader =  req.headers['authorization'];
    console.log(bearerHeader)
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        
        jwt.verify(bearerToken, 'secret', (err, userData) => {
            if (err) {
                res.sendStatus(403)
            }
            else {
                res.json({
                    status: true,
                    userData,
                    
                })
            }
        })
    }
    
    else {
        res.sendStatus(403)
    }
});





module.exports = router;

const User = require('../models/user');  

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                pseudo: req.body.newUser,
                email: req.body.email,
                password: hash,
                permission: "player",
                gamesNumber: 0,
                gamesWon: 0,
               
            });
            user.save()
                .then(() => res.status(201).json({message: "Utilisateur créé"}))
                .catch(error => res.status(400).json({ error }));

        })
        .catch(error => res.status(500).json({ error }));
            
};


exports.login = (req, res, next) => {
    User.findOne({ user: req.body.pseudo })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Pseudo ou mot de passe incorrect'});
            }

            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Pseudo ou mot de passe incorrect' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        message : "Log in ok",
                        user : user,
                        token: jwt.sign(
                            { userId : user._id},
                            'RANDOM_TOKEN_SECRET',
                            {expiresIn : '24h'}
                        ),
                        
                    });
                    console.log(user)
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.getAccounts = (req, res, next) => {
    User.find()
        .then(users => res.status(200).json({ users }))
        .catch(error => res.status(400).json({ error }));
};

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Table = require('../models/table')


exports.createTable = (req, res, next) => {
    console.log(req.body)
    const table = new Table({
        nbPlyrs : req.body.nbPlyrs,
        nbPlyrsMax : req.body.nbPlyrsMax,
        plyrsList : req.body.plyrsList,
        full : req.body.full,
        completed : req.body.completed,  
    })
    table.save()
        .then(() => res.status(201).json({
            message : "Lobby",
            table : table}
            ))
        .catch(error => res.status(400).json({error}))
}

exports.getTables = (req, res, next) => {
    Table.find()
        .then(tables => res.status(200).json({ tables }))
        .catch(error => res.status(400).json({ error }));
};

exports.deleteTable = (req, res, next) => {
    Table.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
}


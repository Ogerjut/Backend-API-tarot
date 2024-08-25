const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const tableSchema = mongoose.Schema({
    nbPlyrs : { type: Number, required: true },
    nbPlyrsMax : { type: Number, required: true },
    plyrsList: { type: Array, required: true },
    full : { type: Boolean, required: true },
    completed : { type: Boolean, required: true },
},
{
    timestamps: true
});

tableSchema.plugin(uniqueValidator);

module.exports = mongoose.model('table', tableSchema);
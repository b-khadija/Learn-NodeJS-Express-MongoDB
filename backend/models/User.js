const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');//Package qui garantie que les données sont uniques et évite les doublons

const userSchema = mongoose.Schema({
  email: {type: String, required: true, unique: true},//'unique' permet d'éviter l'utilisation d'une adresse mail déjà existante
  password: {type: String, required: true} 
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);
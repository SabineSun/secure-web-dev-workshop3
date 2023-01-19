const User = require('./user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const salt = 10;

async function register(username, password) {
    try{
        if(username == null || password == null) {
            throw new Error("Wrong parameters");
        }
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({
            username,
            password: hashedPassword
        });
        return newUser;
    } catch (err) {
        return null;
    }
}

async function verify(username, password) {
    try {
        if(username == null || password == null) {
            throw new Error("Wrong parameters");
        }
        const user = await User.findOne({username: username});
        const match = await bcrypt.compare(password, user.password);
        return match;
    } catch (err) {
        return null;
    }
}

async function findAll() {
    try {
        return User.find({});
    } catch (err) {
        return null;
    }
}

async function findId(id) {
    try {
        return User.findOne({id});
    } catch (err) {
        return null;
    }
}

async function updateUser(id, property) {
    try {
        if (property.password) {
            const hashPassword = await bcrypt.hash(property.password, salt);
            property.password = hashPassword;
        }
        await User.findOneAndUpdate({id}, property);
        return await findId(id);
    } catch (err) {
        return null;
    }
}

async function deleteUser(id) {
    try {
        return await User.findOneAndDelete({_id:id});
    } catch (err) {
        return null;
    }
}

async function generate(id) {
    return jwt.sign({sub: id}, 'secret');
}

module.exports = {
    register,
    verify,
    findAll,
    findId,
    updateUser,
    deleteUser,
    generate
}



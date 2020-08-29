const User = require("../models/user.model");

exports.registerUser = (body) => {
    return new Promise (async (resolve, reject) => {
        const { username, firstName, lastName, email, password } = body;
        const user = new User ({ username, firstName, lastName, email, password });

        await user.save().catch((e) => {
            console.error(e);
            return reject({
                success: false,
                error: "Unknown error, read the console"
            })
        });

        resolve({
            success: true,
            user
        })
    });
}

exports.getUserByName = (username) => {
    return new Promise(async (resolve, reject) => {
        const user = await User.findOne({username}).catch((e) => {
            console.error(e);
            return reject({
                success: false,
                error: "Unknown error, read the console"
            })
        });

        resolve(user)
    }) 
}

exports.getUserByEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        const user = await User.findOne({email}).catch((e) => {
            console.error(e);
            return reject({
                success: false,
                error: "Unknown error, read the console"
            })
        });

        resolve(user);
    }) 
}

exports.existUsername = (username) => {
    return new Promise(async (resolve, reject) => {
        const user = await this.getUserByName(username);
        return {
            success: true,
            exist: (user != null)
        }
    })
}

exports.existEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        const user = await this.getUserByEmail(email);
        return {
            success: true,
            exist: (user != null)
        }
    })
}
import User from '../models/user.model';
import Crypt from '../controllers/crypt.controller';

exports.registerUser = (body) => {
    return new Promise (async (resolve, reject) => {
        const { username, firstName, lastName, email, password } = body;
        const hashedPassword = await Crypt.getHash(password).catch((e) => {
            console.error(e);
            reject({
                success: false,
                error: "Unknown error, read the console"
            });
        })

        const user = new User ({ username, firstName, lastName, email, password: hashedPassword });

        await user.save().catch((e) => {

            let error = "Unknown error, read the console";
            
            if (e.code == 11000) {
                let pattern = Object.keys(e.keyPattern)[0];
                error = "This " + pattern + " is already registered"
            } else {
                console.error(e);
            }

            return reject({
                success: false,
                error: error
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
            reject({
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
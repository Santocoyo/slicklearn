import bcrypt from 'bcrypt';

exports.getHash = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            if (err != null) {
                console.error(err);
                return reject({
                    success: false,
                    error: "Unknown error, read the console"
                })
            }

            bcrypt.hash(password, salt, (err, hash) => {
                if (err != null) {
                    console.error(err);
                    return reject({
                        success: false,
                        error: "Unknown error, read the console"
                    })
                }

                resolve(hash);
            })
        });
    });
}

exports.comparePassword = (hash, password) => {
    return new Promise(async (resolve, reject) => {
        let compare = bcrypt.compare(password, hash);
        if (compare != null) {
            resolve(compare);
        } else {
            console.error("Error comparing password, result is null");
            reject({
                success: false,
                error: "Unown error, read the console"
            });
        }
    });
}
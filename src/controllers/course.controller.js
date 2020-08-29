const Course = require("../models/course.model");

exports.addCourse = (body) => {
    return new Promise(async (resolve, reject) => {
        const displayname = body.name;
        const description = body.description;
        const name = body.name.toLowerCase().replace(/ /gi, "-");

        const course = new Course({name, displayname, description});
        await course.save().catch((e) => {
            console.error(e);
            return reject({
                success: false,
                error: "Unknown error, read the console"
            });
        });

        resolve({
            success: true,
            course
        })
    });
}

exports.getCourses = (pag) => {
    return new Promise (async (resolve, reject) => {
        // ToDo
        const list = Course;
    });
}

exports.getCourseByName = (name) => {
    return new Promise (async (resolve, reject) => {
        name = name.toLowerCase().replace(/ /gi, "-");
        const course = await Course.findOne({name}).catch((e) => {
            console.error(e);
            return reject({
                success: false,
                error: "Unknown error, read the console"
            })
        })

        if (course == null) {
            reject({
                success: false,
                error: "Course with this id doesn't exist"
            })
        } else {
            resolve({
                success: true,
                course
            })
        }
    });
}

exports.getCourseById = (id) => {
    return new Promise(async (resolve, reject) => {
        const course = await Course.find(id).catch((e) => {
            console.error(e);
            return reject({
                success: false,
                error: "Unknown error, read the console"
            })
        });

        if (course == null) {
            reject({
                success: false,
                error: "Course with this id doesn't exist"
            })
        } else {
            resolve({
                success: true,
                course
            })
        }
    });
}
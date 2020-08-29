const express = require("express");
const Router = express.Router();

const controller = require("../controllers/user.controller");

Router.post("/api/login", async (req, res) => {
    let body = req.body;
    let user = await controller.getUserByEmail(body.email).catch((e) => {
        return res.json(e);
    });

    if (user == null) {
        return res.json({success: false, error: "Email isn't registered"});
    } else {
        if (user.password == body.password) {
            user.password = null;
            return res.json({
                success: true,
                user
            })
        } else {
            return res.json({
                success: false,
                error: "Invalid password"
            })
        }
    }
});

Router.post("/api/register", async (req, res) => {
    let body = req.body;
    let result = await controller.registerUser(body).catch((e) => {
        return res.json(e);
    })

    // Temporal, cambiar esto
    if (result.user != null) {
        result.user.password = null;
    }

    res.json(result)
})

module.exports = Router;
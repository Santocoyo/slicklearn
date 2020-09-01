import controller from '../controllers/user.controller';
import crypt from '../controllers/crypt.controller';
import { Router } from 'express';

const router = Router();

router.post("/api/login", async (req, res) => {
    let body = req.body;
    let user = await controller.getUserByEmail(body.email).catch((e) => {
        return res.json(e);
    });

    if (user == null) {
        return res.json({success: false, error: "Email isn't registered"});
    } else {
        const result = await crypt.comparePassword(user.password, body.password).catch((e) => {
            return res.json(e);
        });

        if (result === true) {
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

router.post("/api/register", async (req, res) => {
    let body = req.body;

    let result = await controller.registerUser(body).catch((e) => {
        res.json(e);

        // Temp (To Do)
        return null;
    })

    if (result == null) {
        return;
    }

    // Temporal, cambiar esto
    if (result.user != null) {
        result.user.password = null;
    }

    res.json(result)
})

module.exports = router;
import express from "express";
const router = express.Router();
import db from "../models"
import SimpleCrypto from "simple-crypto-js";
import passport from "passport";


router.post("/register", async (req: express.Request, res: express.Response) => {
    if (!req.body.username || !req.body.password || !req.body.email || !req.body.invite) 
        return res.status(400).json({error: "No data provided"});

    // sanitize data
    const username = req.body.username.replace(/[^a-zA-Z0-9]/g, "");
    const password = req.body.password.replace(/[^a-zA-Z0-9]/g, "");

    // check if username is taken
    const user = await db.User.findOne({where: {username: username}});
    if (user) return res.status(400).json({error: "Username is taken"});

    // check if email is taken
    const email = await db.User.findOne({where: {email: req.body.email}});
    if (email) return res.status(400).json({error: "Email is taken"});

    // check if invite is valid
    const invite = await db.Invites.findOne({where: {code: req.body.invite}});
    if (!invite) return res.status(400).json({error: "Invalid invite code"});
    if (invite.isUsed) return res.status(400).json({error: "Invite code is already used"});

    // encrypt password
    const simpleCrypto = new SimpleCrypto(password);
    const encryptedPassword = simpleCrypto.encrypt(password);


    // create user
    await db.User.create({
        username: username,
        email: req.body.email,
        password: encryptedPassword,
        invite: req.body.invite,
    });

    // update invite
    await db.Invites.update({isUsed: true, usedBy: username}, {where: {code: req.body.invite}});

    return res.redirect("/");
});

router.post("/login", async (req: express.Request, res: express.Response) => {
    passport.authenticate("local", (err, user, info) => {
        req.login(user, (err) => {
            if (!user) return res.status(401).json({error: "Invalid password"});
            req.logIn(user, (err) => {
                if (err) return res.status(401).json({error: "Invalid password"});
                res.status(201).json({message: user});
            });
        });
    })(req,res);
});

export default router;
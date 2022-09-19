import express from "express";
const router = express.Router();
import db from "../models"
import SimpleCrypto from "simple-crypto-js";


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
    if (!req.body.username || !req.body.password) 
        return res.status(400).json({error: "No data provided"});

    // sanitize data
    const username = req.body.username.replace(/[^a-zA-Z0-9]/g, "");
    const password = req.body.password.replace(/[^a-zA-Z0-9]/g, "");

    // check if user exists
    const user = await db.User.findOne({where: {username: username}});
    if (!user) return res.status(400).json({error: "User does not exist"});

    // decrypt password
    try {
        const simpleCrypto = new SimpleCrypto(password);
        const decryptedPassword = simpleCrypto.decrypt(user.password);
        // check if password is correct
        if (decryptedPassword !== password) return res.status(400).json({error: "Invalid password"});

    } catch (error) {
        return res.status(400).json({error: "Invalid password"});
    }

    return res.status(200).json({success: "Logged in"});
});

export default router;
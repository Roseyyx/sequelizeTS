import express from "express";
const router = express.Router();
import db from "../models"
import {} from "../types/admin"

router.post("/CreateInvite", async (req: express.Request, res: express.Response) => {
    if (!req.isAuthenticated() || !req.user?.isAdmin) { res.cookie("notification", "You are not allowed to access this page!"); return res.redirect("/")};
    if (req.body.amount){
        for (let i = 0; i < req.body.amount; i++) {
            db.Invites.create({
                code: "arty_" + Math.random().toString(36).substring(2, 12) + Math.random().toString(36).substring(2, 12),
                createdBy: req.user.username,
                usedBy: null,
                isUsed: false,
            },);
        }
        return res.cookie("notification", "Generated: " + req.body.amount + " invites").redirect("/dashboard");
    } else {
        const invite = await db.Invites.create({
            code: "arty_" + Math.random().toString(36).substring(2, 12) + Math.random().toString(36).substring(2, 12),
            createdBy: req.user.username,
            usedBy: null,
            isUsed: false,
        });
    
        res.cookie("clipboard", invite.code);
    
        return res.cookie("notification", "Invite code: " + invite.code).redirect("/dashboard");
    }
});

router.post("/giftSub", async(req: express.Request, res: express.Response) => {
    if (!req.isAuthenticated() || !req.user?.isAdmin) { res.cookie("notification", "You are not allowed to access this page!"); return res.redirect("/")};
    if (req.body.username && req.body.months){
        const user = await db.User.findOne({
            where: {
                username: req.body.username,
            }
        });
        if (user){
            if (user.subEndDate){
                user.subEndDate = new Date(new Date().setMonth(new Date().getMonth() + req.body.months));
            } else {
                user.subEndDate = new Date(new Date().setMonth(new Date().getMonth() + req.body.months));
            }
            user.subBeginDate = new Date();
            user.save();
            return res.cookie("notification", "Successfully gifted " + req.body.months + " months to " + user.username).redirect("/dashboard");
        } else {
            return res.cookie("notification", "User not found!").redirect("/dashboard");
        }
    } else {
        return res.cookie("notification", "Missing username or months!").redirect("/dashboard");
    }
});

export default router;
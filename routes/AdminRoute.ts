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

export default router;
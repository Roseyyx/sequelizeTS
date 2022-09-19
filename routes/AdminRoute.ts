import express from "express";
const router = express.Router();
import db from "../models"
import {} from "../types/admin"

router.get("/CreateInvite", async (req: express.Request, res: express.Response) => {
    if (!req.isAuthenticated() || !req.user?.isAdmin) { res.cookie("notification", "You are not allowed to access this page!"); return res.redirect("/")};
    const invite = await db.Invites.create({
        code: "arty_" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
        createdBy: null,
        usedBy: null,
        isUsed: false,
    });

    res.cookie("clipboard", invite.code);

    return res.cookie("notification", "Invite code: " + invite.code).redirect("/dashboard");
});

export default router;
import express from "express";
const router = express.Router();
import db from "../models"

router.get("/CreateInvite", (req: express.Request, res: express.Response) => {
    const invite = db.Invites.create({
        code: "arty_" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
        createdBy: "admin",
        usedBy: null,
        isUsed: false,
    });
    return res.status(200).json({success: "Invite created: " + invite.code});
});

export default router;
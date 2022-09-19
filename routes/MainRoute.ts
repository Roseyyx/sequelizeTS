import express from "express";
const router = express.Router();

router.get("", (req: express.Request, res: express.Response) => {
    if (req.cookies["notification"]){
        res.clearCookie("notification");
        return res.render("index", {notification: req.cookies["notification"]});
    } else
        return res.render("index", {notification: req.cookies["notification"]});
});

router.get("/login/", (req: express.Request, res: express.Response) => {
    if (req.isAuthenticated()) { res.cookie("notification", "You are already logged in!") ; return res.redirect("/");}
    return res.render("login");
});

router.get("/register/", (req: express.Request, res: express.Response) => {
    if (req.isAuthenticated()) { res.cookie("notification", "You are already logged in!") ; return res.redirect("/");}
    return res.render("register");
});

export default router;
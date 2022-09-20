import express from "express";
const router = express.Router();

router.get("", (req: express.Request, res: express.Response) => {
    if (req.cookies["notification"]){
        res.clearCookie("notification");
        return res.render("index", {notification: req.cookies["notification"]});
    } else
        return res.render("index", {notification: req.cookies["notification"]});
});

router.get("/dashboard/", (req: express.Request, res: express.Response) => {
    if (!req.isAuthenticated() || !req.user?.isAdmin) { res.cookie("notification", "You are not allowed to access this page!"); return res.redirect("/")};
    if (req.cookies["clipboard"] && req.cookies["notification"]){
        res.clearCookie("clipboard");
        res.clearCookie("notification");
        return res.render("dashboard", {notification: req.cookies["notification"], clipboard: req.cookies["clipboard"]});
    }
    if (req.cookies["notification"]){
        res.clearCookie("notification");
        return res.render("dashboard", {notification: req.cookies["notification"]});
    } else
        return res.render("dashboard", {notification: req.cookies["notification"]});
});

router.get("/login/", (req: express.Request, res: express.Response) => {
    if (req.isAuthenticated()) { res.cookie("notification", "You are already logged in!") ; return res.redirect("/");}
    return res.render("login");
});

router.get("/register/", (req: express.Request, res: express.Response) => {
    if (req.isAuthenticated()) { res.cookie("notification", "You are already logged in!") ; return res.redirect("/");}
    return res.render("register");
});

router.get("/forums/", (req: express.Request, res: express.Response) => {
    if (!req.isAuthenticated()) { res.cookie("notification", "You do not have permission to view these forums.") ; return res.redirect("/login");}
    if (!req.user.subEndDate || new Date(req.user.subEndDate) < new Date()) { res.cookie("notification", "Your subscription has expired!") ; return res.redirect("/dashboard");}
    return res.render("forums");
});

export default router;
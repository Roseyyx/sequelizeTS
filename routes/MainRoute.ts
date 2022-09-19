import express from "express";
const router = express.Router();

router.get("", (req: express.Request, res: express.Response) => {
    console.log(req.session);
    return res.render("index");
});

router.get("/login/", (req: express.Request, res: express.Response) => {
    return res.render("login");
});

router.get("/register/", (req: express.Request, res: express.Response) => {
    return res.render("register");
});

export default router;
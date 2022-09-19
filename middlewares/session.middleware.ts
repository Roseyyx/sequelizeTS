import { NextFunction, Request, Response } from "express";
import db from "../models"
import session from "express-session";
const SessionStore = require("express-session-sequelize")(session.Store);

const sequelizeSessionStore = new SessionStore({
    db: db.sequelize,
})

const sessionMiddleware = (req: Request, res: Response, next: NextFunction) => {
    return session({
        secret: "admin",
        resave: false,
        saveUninitialized: false,
        store: sequelizeSessionStore,
    })(req,res,next);
};

export default sessionMiddleware;
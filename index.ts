import express from "express";
const app = express();
const port = 3000;
import db from "./models";


// View Engine
app.use(express.static("public"));
app.use('/css', express.static(__dirname + "public/css"));
app.use('/js', express.static(__dirname + "public/js"));
app.use('/img', express.static(__dirname + "public/img"));

// Set View Engine
app.set("views", "./views");
app.set("view engine", "ejs");

// Middlewares
import sessionMiddleware from "./middlewares/session.middleware";
import passportMiddleware from "./middlewares/passport.middleware";
import cookieParser from "cookie-parser";
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(sessionMiddleware);
app.use(passportMiddleware.initialize());
app.use(passportMiddleware.session());
app.use(cookieParser());

// Configure Routes
import MainRoute from "./routes/MainRoute";
import UserRoute from "./routes/UserRoute";
import AdminRoute from "./routes/AdminRoute";
app.use("/", MainRoute);
app.use("/auth/", UserRoute);
app.use("/admin/", AdminRoute);

db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Listening at *:${port}`);
    });
});

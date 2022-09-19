import express from "express";
const app = express();
const port = 3000;
import db from "./models";

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// View Engine
app.use(express.static("public"));
app.use('/css', express.static(__dirname + "public/css"));
app.use('/js', express.static(__dirname + "public/js"));
app.use('/img', express.static(__dirname + "public/img"));

// Set View Engine
app.set("views", "./views");
app.set("view engine", "ejs");

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

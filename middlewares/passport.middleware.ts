import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import db from "../models"
import SimpleCrypto from "simple-crypto-js";

passport.use(
    new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, async (username, password, done) =>{
        // check if user exists
        const user = await db.User.findOne({where: {username: username}});
    
        if (user){
            // decrypt password
            try {
                const simpleCrypto = new SimpleCrypto(password);
                const decryptedPassword = simpleCrypto.decrypt(user.password);
                // check if password is correct
                if (decryptedPassword !== password) done(null,user) 
                else done(null,false);
            } catch (error) {
                console.log(error);
            }
        }
    })
)
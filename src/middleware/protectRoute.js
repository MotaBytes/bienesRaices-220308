import jsonwebtoken from "jsonwebtoken";
import user from '../modells/user.js';
import dotenv from 'dotenv';
dotenv.config({path:'src/.env'})

const protectRoute = async(req, res, next) => {
    const { _token } = req.cookies;

    // Verificar que el token existe
    if(!_token){
        return res.redirect('/login');
    } else {
        try {
            const decoded = jsonwebtoken.verify(_token, process.env.JWT_SECRET_HASH_STRING)
            const loggedUser = await user.scope("deletePassword").findByPk(decoded.userID)
            console.log(loggedUser);

            //TODO: Almacenar user en el rq
            if(loggedUser){
                req.loggedUser = loggedUser;
            } else {
                return res.redirect('/login');
            }
        } catch (error) {
            console.log(error);
        }
    }

    

    console.log("Hola desde el middlewarw");
    console.log(req.cookies);
    

    next();
}

export { protectRoute }
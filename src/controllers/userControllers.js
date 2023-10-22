import user from "../modells/user.js";
import { check, validationResult } from "express-validator";

const formLogin = (req, res) => {
    res.render("auth/login.pug", { //Controladore
        page:"Login"
    })
}

const formRegister = (req, res) => {
    res.render("auth/register.pug", {
        page: "Creating a new account..."
    })
}

const recovery = (rq, res) => {
    res.render("auth/recovery.pug", {
        page: "Recovery your password"
    })
}

const insertUser = async (req, res) => {

    console.log("Intentando registrar los datos del nuevo usuario en la Base de Datos");
    console.log(`Nombre: ${req.body.name}`);//
        //*Validando
    await check("name").notEmpty().withMessage("YOUR NAME IS REQUIRED").run(req) //* Express checa el nombre que no venga vacio AHORA MISMO
    await check("email").notEmpty().withMessage("YOUR EMAIL IS REQUIRED").isEmail().withMessage("THIS ISN'T EMAIL FORMAT").run(req)
    await check("password").notEmpty().withMessage("YOUR PASSWORD IS REQUIRED").isLength({ min: 8 })
    .withMessage("YOUR PASSWORD MUST HAVE 8 CHARACTERS AT LEAST").run(req)
    await check("repeatPassword").notEmpty().withMessage("YOUR PASSWORD IS REQUIRED").isLength({ 
        min: 8
     }).withMessage("YOUR PASSWORD MUST HAVE 8 CHARACTERS AT LEAST").equals(req.body.password).withMessage("BOTH PASSWORDS FIELDS MUST BE THE SAME").run(req)
    // res.json(validationResult(req));//*PARA VER EL JSON
    console.log(`El total de errores fueron de: ${validationResult.length} errores de validación`)
    let resultValidate = validationResult(req);
    if (resultValidate.isEmpty()) {
        let newUser = await user.create(req.body); //* Esta linea es la que inserta
    }
    else{
        res.render("auth/register.pug",({
            page:"New account",
            errors:resultValidate.array()
        }))
    }

}

export {formLogin,formRegister, recovery, insertUser}
import user from "../modells/user.js";
import {check, validationResult} from "express-validator";
import {generateToken} from '../lib/tokens.js'
import {emailRegister} from '../lib/emails.js'

const formLogin = (req, res) => {
    res.render("auth/login.pug", {
        isLogged: false,
        page: "Login",
        csrfToken:req.csrfToken()
    })
}

const formRegister = (req, res) => {
    res.render("auth/register.pug", {
        page: "Creating a new account...",
        csrfToken:req.csrfToken()
    })
}

const recovery = (req, res) => {
    res.render("auth/recovery.pug", {
        page: "Password Recovery",
        csrfToken:req.csrfToken()
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
    await check("recovery-password").notEmpty().withMessage("YOUR PASSWORD IS REQUIRED").isLength({
        min: 8
    }).withMessage("YOUR PASSWORD MUST HAVE 8 CHARACTERS AT LEAST").equals(req.body.password).withMessage("BOTH PASSWORDS FIELDS MUST BE THE SAME").run(req)
    // res.json(validationResult(req));//*PARA VER EL JSON
    
    console.log(`El total de errores fueron de: ${validationResult.length} errores de validación`)
    let resultValidate = validationResult(req);

    const userExists = await user.findOne({
        where: {
            email: req.body.email
        }
    });

    const {name, email, password} = req.body

    if (userExists){
        res.render("auth/register.pug", ({
            page: "Creating a new account...",
            errors: [{msg: `the user ${req.body.email} already exist`}],
            user:{
                name: req.body.name,
                email: req.body.email
            },
            csrfToken:req.csrfToken()
            
        }))
    }
     else if (resultValidate.isEmpty() ) {
        const token = generateToken()

        let newUser = await user.create({
            name,
            email,
            password,
            token
        });
        res.render('templates/message.pug', {
            page: "New account created",
            message: `We have sent an email to: ${email}, please verify your account`,
            csrfToken:req.csrfToken()
        })

        //TODO: HACER QUE SE EJECUTE LA FUNCIÓN
        emailRegister({
            name,
            email,
            token
        });
    }
    else {
        res.render("auth/register.pug", ({
            page: "Creating a new account...",
            errors: resultValidate.array(), user: {
                name: req.body.name,
                email: req.body.email
            },
            csrfToken:req.csrfToken()
        }))
    }



}

const confirmAccount= async (req, res) => {
    //TODO: Verificar token

    const tokenReceived = req.params.token;
    const userOwner = await user.findOne({
        where: {
            token: tokenReceived
        }
    })
    if(!userOwner){

       console.log("no existe")
        res.render('auth/confirm-account', {
            page: 'Status verification.',
            error: true,
            msg: 'We have found some issues and could not verify your account.',
            csrfToken:req.csrfToken()
        })
    } else {
        console.log("existe");
        userOwner.token = '';
        userOwner.verified = true;
        await userOwner.save();
        // ESTA OPERACION REALIZA EL UPDATE EN LA BASE DE DATOS.
        res.render('auth/confirm-account', {
            page: 'Status verification.',
            error: false,
            msg: 'Your account has been confirmed successfuly.',
            csrfToken:req.csrfToken()
        });
    }

    
}


export {formLogin, formRegister, recovery, insertUser, confirmAccount}
//TODO: INCORPORAR LOS TOKENS CSRF EN VISTAS
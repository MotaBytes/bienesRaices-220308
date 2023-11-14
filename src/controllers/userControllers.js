import user from "../modells/user.js";
import {check, validationResult} from "express-validator";
import {generateToken, generateJwt} from '../lib/tokens.js';
import {emailRegister, emailPasswordRecovery} from '../lib/emails.js';
import bcrypt from 'bcrypt';

const formLogin = (req, res) => {
    res.render("auth/login.pug", {
        isLogged: false,
        page: "Login"
    })
}

const formPasswordUpdate = (request, response) => {
    
    response.render("../views/auth/password-update.pug", {
        isLogged: false,
        page: "Password update",
        
    })
}

const formRegister = (req, res) => {
    res.render("auth/register.pug", {
        page: "Creating a new account..."
    })
}

const recovery = (req, res) => {
    res.render("auth/recovery.pug", {
        page: "Password Recovery"
    })
}

const insertUser = async (req, res) => {

    console.log("Intentando registrar los datos del nuevo usuario en la Base de Datos");
    console.log(`Nombre: ${req.body.name}`);//
    //*Validando
    await check("name").notEmpty().withMessage("YOUR NAME IS REQUIRED").run(req) //* Express checa el nombre que no venga vacio AHORA MISMO
    await check("email").notEmpty().withMessage("YOUR EMAIL IS REQUIRED").isEmail().withMessage("THIS ISN'T EMAIL FORMAT").run(req)
    await check("password").notEmpty().withMessage("YOUR PASSWORD IS REQUIRED").isLength({
        max: 20,
        min: 8
    }).withMessage("PASSWORD MUST CONTAIN BETWEEN 8 AND 20 CHARACTERS").run(req)
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
            }
            
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
            type: "success"
        })

        
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
            }
        }))
    }



}

const confirmAccount= async (req, res) => {

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
            button: 'Access denied' 
        })
    } else {
        console.log("existe");
        userOwner.token = null;
        userOwner.verified = true;
        await userOwner.save();
        // ESTA OPERACION REALIZA EL UPDATE EN LA BASE DE DATOS.
        res.render('auth/confirm-account', {
            page: 'Status verification.',
            error: false,
            msg: 'Your account has been confirmed successfuly.',
            button: 'Now you can login'
        });
    };
}

const updatePassword = async (req, res) => {
    console.log(`Guardando password`);

    await check("password").notEmpty().withMessage("YOUR PASSWORD IS REQUIRED").isLength({ min: 8 }).withMessage("YOUR PASSWORD MUST HAVE 8 CHARACTERS AT LEAST").run(req)
    await check("confirmPassword").notEmpty().withMessage("YOUR PASSWORD IS REQUIRED").isLength({ min: 8 }).withMessage("YOUR PASSWORD MUST HAVE 8 CHARACTERS AT LEAST").equals(req.body.password).withMessage("BOTH PASSWORDS FIELDS MUST BE THE SAME").run(req)
    let resultValidate = validationResult(req);
    if(resultValidate.isEmpty()) {
        const {token} = req.params
    const {password} = req.body
    const user = await User.findOne({where:{token}})

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password,salt);
    user.token = null;
    await user.save();
    res.render('auth/confirm-account.pug',{
        page:"Password recovery",
        button:"Back to login",
        msg:"The password has been change succesfully"
    })
    }

    else{ 
        res.render("auth/password-update.pug", ({
        page: "New account",
        errors:resultValidate.array()

    }))}
}

const emailChangePassword = async (req, res) => {
    console.log(`El usuario ha solicitado un cambio de contraseña, por lo que se le enviará un correo electrónico a ${req.body.email} con la liga para atualización de contraseña`);

    await check("email").notEmpty().withMessage("YOUR EMAIL IS REQUIRED").isEmail().withMessage("THIS ISN'T EMAIL FORMAT").run(req);

    let resultValidate = validationResult(req);
    const {name, email} = req.body

    if(resultValidate.isEmpty()) {
        const userExists = await user.findOne({
            where: {
                email: req.body.email
            }
        });

        if (!userExists){
            console.log(`El usuario ${email} que está intentando recuperar su contraseña no existe`);
            res.render("templates/message.pug", {
                page: "User not found",
                part1:`The user associated with: `,
                part2: ` does not exist in database.`,
                message: `${email}`,
                type: "error"
            });
        } 
        else {
            console.log("Envio de correo");
            const token = generateToken();
            userExists.token = token;
            userExists.save();

            
            emailPasswordRecovery({
                name:userExists.name,
                email:userExists.email,
                token:userExists.token
            })

            res.render('templates/message.pug', {
                page: 'Email send',
                msg: `We have sent an email to account ${email}`,
                type: 'success'
            })

        }
    } 
    else {
        res.render("auth/recovery", ({
            page: "Status verification",
            error: false,
            msg: 'Your account has been confirmed successfuly',
            button: 'Now you can login',
            errors: resultValidate.array(), user: {
                name: req.body.name,
                email: req.body.email
            },
        }))
    }
    return 0;
}

const authenticateUser = async(request,response ) =>{
    //Verificar los campos de correo y contraseña
    await check("email").notEmpty().withMessage("Email field is required").isEmail().withMessage("This is not in email format").run(request)
    await check("password").notEmpty().withMessage("Password field is required").isLength({max:20,min:8}).withMessage("Password must contain between 8 and 20 characters").run(request)

    // En caso de errores mostrarlos en pantalla
    let resultValidation=validationResult(request);
    if(resultValidation.isEmpty()){
        const {email,password} = request.body;
        console.log(`El usuario: ${email} esta intentando acceder a la plataforma`)
       
        const userExists = await user.findOne({where:{email}})
       
        if(!userExists){
            console.log("El ususario no existe")
            response.render("auth/login.pug",{
                page:"Login",
                errors:[{msg:`The user associated to: ${email} was not found`}],
                user: {
                    email
                                }
            })
        }else{
            console.log("El usuario existe")
            if(!userExists.verified){
                console.log("Existe, pero no esta verificado");
                
                response.render("auth/login.pug",{
                    page:"Login",
                    errors:[{msg:`The user associated to: ${email} was found but not verified`}],
                    user: {
                        email
                    }
                })
            } else{
                if(!userExists.verifyPassword(password)){
                    response.render("auth/login.pug",{
                        page:"Login",
                        errors:[{msg:`User and password does not match`}],
                        user: {
                            email
                        }
                    })
                }else{
                    console.log(`El usuario: ${email} Existe y esta autenticado`);
                    //Generar el token de accesso
                    const token = generateJwt(userExists.id);
                    response.cookie('_token',token,{
                        httpOnly:true,//Solo via navegador, a nivel API no
                        //secure:true  //Esto solo se habilitara en caso de conta con un certificado https


                    }).redirect('/login/home');
                }
            }
        }
 
    } else{
        response.render("../views/auth/login.pug",{
            page:"Login",
            errors:resultValidation.array(),
            user: {
                email: request.body.email
            }
        })
    }

    return 0;
}

const userHome = (req, res) => {
    res.render('user/home',{
        showHeader:true
    })
}




export { formLogin, formRegister, recovery, formPasswordUpdate, insertUser, authenticateUser, confirmAccount, updatePassword, emailChangePassword, userHome};

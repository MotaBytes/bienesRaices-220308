import dotenv from 'dotenv';
import nodemailer from 'nodemailer'
dotenv.config({path:'../src/.env'});

const emailRegister =  async(userData) => {
  const {name, email, token} = userData;  
    console.log(`Ìntentando enviar un correo electrónico de activación de cuenta al usuario ${email}`);

    var transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD
        }
      });

    

    //* CREANDO Y ENVIANDO EL CORREO


    await transport.sendMail({
        from: '220308@utxicotepec.edu.mx',
        to: email,
        subject: 'RealState-220308: Verify your account',
        text: 'Welcome to Real State-220308, to continue is mandatory that you click on link below to activate your account.',
        html: `
        <body align="center">
          <p style="background-color: aqua; text-align: center; height: 70px; width: auto; font-family: monospace; font-size: 25px; letter-spacing: 4px; border-radius: 20px;"> Hello, ${name}</p>

          <p>Thank you for chosing us to search, sell and buy properties. If you want to continue using our plattaform, please click link on below.</p>
          
          <a href="http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/login/confirm/${token}">Click here to activate your account.</a>
          <p>Best regards.</p>
          <p>Diego Hernández Mota</p>
          <p>C.E.O. of RealState-220308</p>
          <p>*If you didn´t create this account, please ignore this message.</p>
        </body>`
    })
}





export {emailRegister}
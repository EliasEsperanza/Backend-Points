import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

export const enviarMensaje = async (req,res) => {
    const {email, asunto, mensaje} = req.body;
    const archivo = req.file;
    try {
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            auth:{
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        let info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: asunto,
            text: mensaje,
            attachments: [
                {
                    filename: archivo ? archivo.originalname : undefined,
                    path: archivo ? archivo.path : undefined
                }
            ]
        });
        console.log('Mensaje enviado: %s', info.messageId);
        res.json({
            message: 'Mensaje enviado',
            data: info.messageId
        });
    }catch(error){
        res.status(500).json({
            message: error.message
        });
    }
}
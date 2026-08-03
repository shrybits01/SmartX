//utils contain helper function
import nodemailer from "nodemailer";

export const sendMail = async (email, subject, body)=>{
    try{
    

        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD,
            },
        });

        //sendMail method to send the mail
        const info = await transporter.sendMail({
            from: "SmartX" ,
            to: email,
            subject: subject,
            html: body, //actual me kis cheez ke liye otp bhej rhe
        });

        return info;

    }
    catch (error) {
       console.log("Error occur during sending mail", error);
    }
}
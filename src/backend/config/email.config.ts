import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const host_mail = process.env.HOST_MAIL;
const host_port = process.env.HOST_PORT || "587";
const host_user = process.env.HOST_USER;
const host_pass = process.env.HOST_PASS;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: host_mail,
  port: parseInt(host_port),
  secure: false, 
  auth: {
    user: host_user,
    pass: host_pass,
  },
});

interface emailContentProps {
    subject: string;
    text: string;
    html: string;
}

async function sendEmail (receiver: string, mailContent: emailContentProps) {
    try {
        await transporter.sendMail({
            from: `ELLP <${host_user}>`,
            to: receiver,
            subject: mailContent.subject,
            text: mailContent.text,
            html: mailContent.html
        });
    } catch (error) {
        console.error("Erro ao enviar email: ", error);
    }
}

export default sendEmail;
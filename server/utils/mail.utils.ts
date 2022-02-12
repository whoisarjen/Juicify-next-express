import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "juicify.app",
    // port: 587,
    // secure: false,
    // requireTLS: true,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    },
    logger: true,
    tls: { //<= it was available for last working time
        // do not fail on invalid certs
        rejectUnauthorized: false
    }
});

export const sendEmail = async ({ clientEmail, subject, html }: { clientEmail: string, subject: string, html: string }) => {
    // send mail with defined transport object
    let message = await transporter.sendMail({
        from: 'contact@juicify.app', // sender address
        to: clientEmail, // list of receivers
        subject, // Subject line
        // text: "Hello world?", // plain text body
        html, // html body
    });

    return message;
}
const emailSettings = async (cutomer_email: string, email_value: any) => {

    const nodemailer = require("nodemailer");

    async function main() {

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "juicify.app",
            // port: 465,
            // secure: true, // true for 465, false for other ports
            auth: {
                user: 'contact@juicify.app',
                pass: 'Preetini49e89d5b'
            },
	        tls: { //<= it was available for last working time
	            // do not fail on invalid certs
	            rejectUnauthorized: false
	        }
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: 'contact@juicify.app', // sender address
            to: cutomer_email, // list of receivers
            subject: email_value.subject, // Subject line
            // text: "Hello world?", // plain text body
            html: email_value.text, // html body
        });
    }

    main().catch(console.error);

}

export default emailSettings;
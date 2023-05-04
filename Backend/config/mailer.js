import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    // service:'gmail',
    auth: {
        user: process.env.GOOGLE_JAAD_APP_EMAIL,
        pass: process.env.GOOGLE_JAAD_APP_PASS,
    },
    // tls:{rejectUnauthorized:false}
})

transporter.verify().then(() => {
    console.log('Ready to send emails')
})

export default transporter
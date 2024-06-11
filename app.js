const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/submit-form', (req, res) => {
    let formData = req.body;
    sendEmail(formData)
        .then(() => res.send('Email sent successfully!'))
        .catch(err => res.status(500).send(err.message));
});

function sendEmail(formData) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'email',
            pass: 'password'
        }
    });

    let mailOptions = {
        from: 'email',
        to: 'email',
        subject: 'Form Submission',
        text: JSON.stringify(formData, null, 2)
    };

    return transporter.sendMail(mailOptions);
}

app.listen(3000, () => console.log('Server listening on port 3000'));

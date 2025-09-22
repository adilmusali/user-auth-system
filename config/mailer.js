const SibApiV3Sdk = require('sib-api-v3-sdk');
const dotenv = require('dotenv');

dotenv.config();

const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY;

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();


exports.sendVerificationEmail = async (userEmail, token) => {
    const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(); 

    sendSmtpEmail.subject = "Please verify your email address";
    sendSmtpEmail.htmlContent = `
        <p>Hello,</p>
        <p>Thank you for registering. Please click the link below to verify your email address:</p>
        <a href="${verificationLink}" style="background-color: #4CAF50; color: white; padding: 14px 25px; text-align: center; text-decoration: none; display: inline-block;">Verify Email</a>
        <p>If you did not create an account, no further action is required.</p>
    `;
    sendSmtpEmail.sender = { name: "Authentication System Project", email: process.env.BREVO_FROM_EMAIL };
    sendSmtpEmail.to = [{ email: userEmail }];

    try {
        await apiInstance.sendTransacEmail(sendSmtpEmail);
        console.log('Verification email sent successfully!');
    } catch (error) {
        console.error('Error sending verification email:', error);
        if (error.response) {
            console.error('Brevo Error Body:', JSON.stringify(error.response.body, null, 2));
        }
    }
};
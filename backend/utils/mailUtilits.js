"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Configure transporter for Gmail service
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAILER_EMAIL,
        pass: process.env.MAILER_PASSWORD, // Use App Password
    },
});
function testMail() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield transporter.verify();
            console.log('SMTP Connection Successful ✅');
        }
        catch (error) {
            console.error('SMTP Connection Failed ❌', error);
        }
    });
}
testMail();
class MailUtility {
    /**
     * Send an email with generic HTML content for Gallery App codes
     * @param {string} email - Recipient email address
     * @param {string} content - The code or message to include in the email body
     * @param {string} subject - Email subject line
     * @returns {Promise<{message: string}>}
     */
    static sendMail(email, content, subject) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('MAILER_EMAIL:', process.env.MAILER_EMAIL);
            console.log('MAILER_PASSWORD:', process.env.MAILER_PASSWORD);
            if (!process.env.MAILER_EMAIL || !process.env.MAILER_PASSWORD) {
                throw new Error('Missing MAILER_EMAIL or MAILER_PASSWORD in environment variables');
            }
            // Generic HTML template for Gallery App notifications
            const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${subject}</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background-color: #f9f9f9;">
        <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <header style="background-color: #4a90e2; padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Gallery App</h1>
          </header>
          <main style="padding: 30px;">
            <h2 style="font-size: 20px; color: #4a4a4a;">${subject}</h2>
            <p style="font-size: 16px; color: #555;">Hello,<br><br>
            Here is your requested code:<br></p>
            <div style="background-color: #eef; border-radius: 4px; padding: 15px; font-family: 'Courier New', monospace; font-size: 18px; text-align: center; letter-spacing: 5px; margin: 20px 0;">
              ${content}
            </div>
            <p style="font-size: 14px; color: #888;">If you did not request this code, please ignore this email.</p>
          </main>
          <footer style="background-color: #f0f0f0; padding: 15px; text-align: center; color: #aaa; font-size: 12px;">
            © ${new Date().getFullYear()} Gallery App. All rights reserved.
          </footer>
        </div>
      </body>
      </html>
    `;
            const mailOptions = {
                from: `Gallery App <${process.env.MAILER_EMAIL}>`,
                to: email,
                subject,
                html: htmlContent,
            };
            try {
                yield transporter.sendMail(mailOptions);
                return { message: 'Mail sent successfully' };
            }
            catch (error) {
                console.error('Error sending mail:', error);
                throw new Error('Failed to send email');
            }
        });
    }
}
exports.default = MailUtility;

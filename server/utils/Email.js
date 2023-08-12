const nodemailer = require("nodemailer");

class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.firstName;
    this.from = `Abbas Bhanpura wala <${process.env.EMAIL_FROM}>`;
    this.url = url;
  }

  newTransport() {
    return nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.NODEMAILER_USERNAME,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });
  }

  async send(subject) {
    const text =
      "Hello, Thank you for choosing to register with us and become a valued member of our community.Your journey with us begins now, and we are committed to providing you with an exceptional experience.";

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      text,
    };

    await this.newTransport().sendMail(mailOptions);
  }

  async sendwelcome() {
    await this.send(`Welcome ${this.firstName}`);
  }
}

module.exports = Email;

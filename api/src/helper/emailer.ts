import nodemailer from 'nodemailer';

export interface Email {
  from: string;
  to: string;
  subject: string;
  text: string;
  html: string;
}

export const emailer = async (emailInfo: Email) => {
  const { from, to, subject, text, html } = emailInfo;

  //const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    /* host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    }, */
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: '16a7ded4b34373',
      pass: 'bb6a9464e6d82c',
    },
  });

  const info = await transporter.sendMail({
    from,
    to,
    subject,
    text,
    html,
  });
};

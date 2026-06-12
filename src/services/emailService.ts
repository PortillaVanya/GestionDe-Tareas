import nodemailer from 'nodemailer';
import env from '../config/env';
import logger from '../utils/logger';

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: Number(env.SMTP_PORT),
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
});

export const sendEmail = async (
  to: string,
  subject: string,
  text: string,
  html?: string
): Promise<void> => {
  try {
    const info = await transporter.sendMail({
      from: '"Gestión de Tareas" <no-reply@example.com>',
      to,
      subject,
      text,
      html,
    });
    logger.info(`Email sent: ${info.messageId}`);
  } catch (error: any) {
    logger.error(`Error sending email: ${error.message}`);
    throw error;
  }
};

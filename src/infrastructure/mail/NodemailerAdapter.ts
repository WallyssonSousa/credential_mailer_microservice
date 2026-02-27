import nodemailer, { Transporter } from 'nodemailer';
import { MailProviderPort, MailMessage } from '../../domain/ports/output/MailProviderPort';
import { env } from '../../config/env';

export class NodemailerMailAdapter implements MailProviderPort {
  private readonly transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: env.smtp.host,
      port: env.smtp.port,
      secure: false,
      auth: {
        user: env.smtp.user,
        pass: env.smtp.pass,
      },
    });
  }

  async send(message: MailMessage): Promise<void> {
    await this.transporter.sendMail({
      from: env.smtp.from,
      to: message.to,
      subject: message.subject,
      html: message.html,
    });
  }
}
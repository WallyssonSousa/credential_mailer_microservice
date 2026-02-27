import 'dotenv/config';

export const env = {
    port: Number(process.env.PORT) || 3000, 
    jwtSecret: process.env.JWT_SECRET || 'secret',
    smtp: {
    host: process.env.SMTP_HOST || '',
    port: Number(process.env.SMTP_PORT) || 587,
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
    from: process.env.SMTP_FROM || 'No Reply <noreply@example.com>',
  },
};
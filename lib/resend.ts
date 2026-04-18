import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default resend;

export const FROM_EMAIL = process.env.ADMIN_EMAIL || 'onboarding@resend.dev';

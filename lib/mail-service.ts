import { Resend } from 'resend';
import { z } from 'zod';

// Configuración de Resend con validación de API KEY
const apiKey = process.env.RESEND_API_KEY;

if (!apiKey && process.env.NODE_ENV === 'production') {
  console.warn('RESEND_API_KEY no está configurada en el entorno de producción.');
}

export const resend = new Resend(apiKey || 're_mock_key');

// Configuración de correos
// NOTA: Si no tienes dominio verificado en Resend, DEBES usar 'onboarding@resend.dev'
// y solo podrás enviar correos a la dirección con la que te registraste en Resend.
export const EMAIL_CONFIG = {
  from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
  replyTo: process.env.ADMIN_EMAIL || 'fundacionazulanza@gmail.com',
};

// Esquema de validación para el envío de correos
export const SendEmailSchema = z.object({
  to: z.union([z.string().email(), z.array(z.string().email())]),
  subject: z.string().min(1),
  react: z.any(), // El componente de React para el email
  text: z.string().optional(),
});

export type SendEmailParams = z.infer<typeof SendEmailSchema>;

/**
 * Función base para enviar correos con reintentos y manejo de errores
 */
export async function sendMail(params: SendEmailParams, retries = 3) {
  try {
    // Validar parámetros
    const validatedParams = SendEmailSchema.parse(params);

    let attempt = 0;
    while (attempt < retries) {
      try {
        const { data, error: resendError } = await resend.emails.send({
          from: EMAIL_CONFIG.from,
          to: validatedParams.to,
          subject: validatedParams.subject,
          react: validatedParams.react,
          reply_to: EMAIL_CONFIG.replyTo,
        });

        if (resendError) {
          throw new Error(resendError.message);
        }

        console.info(
          `[Email Success] Subject: "${validatedParams.subject}" To: ${validatedParams.to}`
        );
        return { data, error: null };
      } catch (err: any) {
        attempt++;
        console.warn(`[Email Retry ${attempt}/${retries}] Error: ${err.message}`);
        if (attempt >= retries) throw err;
        // Espera exponencial básica antes del reintento (solo si no estamos en tests)
        if (process.env.NODE_ENV !== 'test') {
          await new Promise((resolve) => setTimeout(resolve, Math.pow(2, attempt) * 1000));
        }
      }
    }
  } catch (error: any) {
    console.error(`[Email Fatal Error] Subject: "${params.subject}" Error:`, error);
    return { data: null, error: error.message };
  }
}

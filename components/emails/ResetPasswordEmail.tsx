import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface ResetPasswordEmailProps {
  resetLink: string;
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || '';

export const ResetPasswordEmail = ({ resetLink }: ResetPasswordEmailProps) => (
  <Html>
    <Head />
    <Preview>Restablecer tu contraseña - Fundación Azulanza</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logoSection}>
          <Img
            src={`${baseUrl}/logo.png`}
            width="170"
            height="50"
            alt="Azulanza Logo"
            style={logo}
          />
        </Section>
        <Heading style={h1}>Restablecer contraseña</Heading>
        <Text style={text}>
          Has solicitado restablecer la contraseña de tu cuenta administrativa en la Fundación
          Azulanza.
        </Text>
        <Text style={text}>Haz clic en el siguiente botón para elegir una nueva contraseña:</Text>
        <Section style={btnContainer}>
          <Link style={button} href={resetLink}>
            Restablecer contraseña
          </Link>
        </Section>
        <Text style={text}>
          Si no solicitaste este cambio, puedes ignorar este correo de forma segura. Tu contraseña
          no cambiará.
        </Text>
        <Hr style={hr} />
        <Text style={footer}>Fundación Azulanza - Panel Administrativo</Text>
      </Container>
    </Body>
  </Html>
);

export default ResetPasswordEmail;

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
};

const logoSection = {
  padding: '32px 0',
  textAlign: 'center' as const,
};

const logo = {
  margin: '0 auto',
};

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  padding: '0 48px',
};

const text = {
  color: '#525f7f',
  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'left' as const,
  padding: '0 48px',
};

const btnContainer = {
  textAlign: 'center' as const,
  padding: '32px 48px',
};

const button = {
  backgroundColor: '#0356CB',
  borderRadius: '5px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  width: '100%',
  padding: '12px',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
  textAlign: 'center' as const,
};

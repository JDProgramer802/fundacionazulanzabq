import * as React from 'react';

interface ContactEmailProps {
  name: string;
  email: string;
  message: string;
}

export const ContactNotificationEmail: React.FC<Readonly<ContactEmailProps>> = ({
  name,
  email,
  message,
}) => (
  <div style={{ fontFamily: 'sans-serif', padding: '20px', color: '#333' }}>
    <h1 style={{ color: '#0356CB' }}>Nuevo mensaje de contacto</h1>
    <p>Has recibido un nuevo mensaje desde el sitio web de la Fundación Azulanza.</p>
    <div style={{ background: '#f9f9f9', padding: '15px', borderRadius: '10px', marginTop: '20px' }}>
      <p><strong>Nombre:</strong> {name}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Mensaje:</strong></p>
      <p style={{ whiteSpace: 'pre-wrap' }}>{message}</p>
    </div>
    <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '30px 0' }} />
    <p style={{ fontSize: '12px', color: '#666' }}>
      Este es un correo automático enviado desde el sistema de administración.
    </p>
  </div>
);

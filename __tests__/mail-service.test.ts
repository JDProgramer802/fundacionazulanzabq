import { describe, it, expect, vi, beforeEach } from 'vitest';
import { sendMail } from '@/lib/mail-service';
import { resend } from '@/lib/mail-service';
import * as React from 'react';

// Mock del componente React para el email
const MockEmail = () => React.createElement('div', null, 'Test Email');

describe('MailService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debe enviar un email exitosamente', async () => {
    // Mock de la respuesta exitosa de Resend
    const mockSend = vi.spyOn(resend.emails, 'send').mockResolvedValue({
      data: { id: 'test_id' },
      error: null,
    });

    const result = await sendMail({
      to: 'test@example.com',
      subject: 'Test Subject',
      react: MockEmail(),
    });

    expect(mockSend).toHaveBeenCalled();
    expect(result.data).toEqual({ id: 'test_id' });
    expect(result.error).toBeNull();
  });

  it('debe fallar si los parámetros son inválidos', async () => {
    const result = await sendMail({
      to: 'invalid-email',
      subject: '',
      react: null,
    });

    expect(result.error).toBeDefined();
    expect(result.data).toBeNull();
  });

  it('debe reintentar en caso de error de Resend', async () => {
    // Mock que falla 2 veces y tiene éxito a la 3ra
    const mockSend = vi
      .spyOn(resend.emails, 'send')
      .mockRejectedValueOnce(new Error('Network Error'))
      .mockRejectedValueOnce(new Error('Rate Limit'))
      .mockResolvedValueOnce({
        data: { id: 'retry_success_id' },
        error: null,
      });

    const result = await sendMail(
      {
        to: 'retry@example.com',
        subject: 'Retry Test',
        react: MockEmail(),
      },
      3
    );

    expect(mockSend).toHaveBeenCalledTimes(3);
    expect(result.data?.id).toBe('retry_success_id');
  });

  it('debe devolver un error después de agotar los reintentos', async () => {
    vi.spyOn(resend.emails, 'send').mockRejectedValue(new Error('Persistent Error'));

    const result = await sendMail(
      {
        to: 'fail@example.com',
        subject: 'Fail Test',
        react: MockEmail(),
      },
      2
    );

    expect(result.error).toBe('Persistent Error');
  });
});

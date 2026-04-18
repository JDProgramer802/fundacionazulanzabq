'use client';

import { useState } from 'react';
import { api } from '@/lib/api-client';

interface UseFormHandlerOptions<T> {
  initialData: T;
  endpoint: string;
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
  method?: 'POST' | 'PUT';
}

export function useFormHandler<T>({
  initialData,
  endpoint,
  onSuccess,
  onError,
  method = 'POST',
}: UseFormHandlerOptions<T>) {
  const [formData, setFormData] = useState<T>(initialData);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as any;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as any).checked : value,
    }));
  };

  const updateField = (name: keyof T, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setStatus('loading');
    setErrorMsg(null);

    const { data, error } = await (method === 'POST' ? api.post(endpoint, formData) : api.put(endpoint, formData));

    if (error) {
      setStatus('error');
      setErrorMsg(error);
      if (onError) onError(error);
    } else {
      setStatus('success');
      if (onSuccess) onSuccess(data);
    }
  };

  const reset = () => {
    setFormData(initialData);
    setStatus('idle');
    setErrorMsg(null);
  };

  return {
    formData,
    setFormData,
    status,
    setStatus,
    errorMsg,
    handleChange,
    updateField,
    handleSubmit,
    reset,
  };
}

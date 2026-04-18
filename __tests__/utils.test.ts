import { cn, formatDate, slugify } from '@/lib/utils';
import { describe, expect, it } from 'vitest';

describe('utils', () => {
  describe('cn', () => {
    it('should merge classes correctly', () => {
      expect(cn('class1', 'class2')).toBe('class1 class2');
      expect(cn('class1', { class2: true, class3: false })).toBe('class1 class2');
    });
  });

  describe('formatDate', () => {
    it('should format date string correctly', () => {
      // Use a date that is less likely to have timezone shifts to another month
      const date = new Date(2024, 0, 15);
      const formatted = formatDate(date);
      expect(formatted).toContain('enero');
      expect(formatted).toContain('2024');
    });
  });

  describe('slugify', () => {
    it('should convert text to slug', () => {
      expect(slugify('Hola Mundo')).toBe('hola-mundo');
      expect(slugify('  Test with SPACES  ')).toBe('test-with-spaces');
      expect(slugify('Special @ Chars!')).toBe('special-chars');
    });
  });
});

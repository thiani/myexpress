// src/utils/helpers.ts
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export const formatDate = (date: string | Date): string => {
  return new Intl.DateTimeFormat('en-KE', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
};

// Validate Kenyan phone number
export const isValidKenyanPhone = (phone: string): boolean => {
  // Supports formats: 07XX XXX XXX, 254-7XX-XXX-XXX, +254 7XX XXX XXX
  const regex = /^(?:254|\+254|0)?([71])[0-9]{8}$/;
  return regex.test(phone.replace(/[\s-]/g, ''));
};

// Format phone number to M-PESA format (254XXXXXXXXX)
export const formatPhoneForMpesa = (phone: string): string => {
  const cleaned = phone.replace(/[\s-]/g, '');
  if (cleaned.startsWith('+')) {
    return cleaned.substring(1);
  }
  if (cleaned.startsWith('0')) {
    return '254' + cleaned.substring(1);
  }
  return cleaned;
};

export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
};
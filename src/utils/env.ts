export const isDevelopment = () => process.env.NODE_ENV === 'development';

export const CookiesType = {
  DEVELOPMENT: 'next-auth.session-token',
  PRODUCTION: '__Secure-next-auth.session-token',
};

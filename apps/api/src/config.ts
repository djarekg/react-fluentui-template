export const corsOrigin = process.env['CORS_ORIGIN']!;
export const accessTokenSecret = process.env['ACCESS_TOKEN_SECRET']!;
export const port = Number(process.env['PORT'] || 4000);
export const isDev = process.env['NODE_ENV'] === 'development';
export const isProd = process.env['NODE_ENV'] === 'production';

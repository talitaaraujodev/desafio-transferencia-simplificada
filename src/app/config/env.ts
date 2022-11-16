export default {
  port: process.env.PORT || 3333,
  jwtSecret: process.env.JWT_SECRET || 'default',
  expiresIn: '60s',
};

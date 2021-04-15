module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', '1fda2a9b2d2b2afb0d3c3605e5dc5a4b'),
    },
  },
});

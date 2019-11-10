const gateway = require('fast-gateway');
const helmet = require('helmet');
const yenv = require('yenv');
const env = yenv();

const validateToken = (req, res, next) => {
  // res.send("Aquí no entra nadie");
  next();
};

const server = gateway({
  middlewares: [helmet()],
  routes: [
    {
      prefix: '/cinema',
      target: `http://${env.HOSTS.MOVIES.HOST}:${env.HOST.MOVIES.PORT}`,
      middlewares: [validateToken]
    },
    {
      prefix: '/users',
      target: `http://${env.HOSTS.USERS.HOST}:${env.HOST.USERS.PORT}`,
      middlewares: [validateToken]
    }
  ]
});

server
  .start(env.PORT)
  .then(() => console.log(`Gateway is running on port ${env.PORT}`))
  .catch(err => {
    console.log(err);
    process.exit(1);
  });

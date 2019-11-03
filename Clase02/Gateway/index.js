const gateway = require('fast-gateway');
const helmet = require('helmet');
const yenv = require('yenv');

const env = yenv();

const validateToken = (req, res, next) => {
  //res.send('Aqui no entra nadie');
  next();
};

const server = gateway({
  middlewares: [helmet()],
  routes: [
    {
      prefix: '/cinema',
      target: `http://${env.HOST.NAME}:${env.HOST.PORT}`,
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

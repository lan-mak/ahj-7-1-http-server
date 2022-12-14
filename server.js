const http = require('http');
const Koa = require('koa');

const appServer = new Koa();

appServer.use((ctx, next) => {
  console.log(ctx)

  ctx.response.body = 'ответ получен'
  next()
})

appServer.use((ctx) => {
  console.log('ответ полученwwww')

})

const server = http.createServer(appServer.callback())


const port = 2121;

server.listen(port, (err) => {
  if (err) {
    console.log(err);

    return;
  }

  console.log('server work! port: ' + port)
})

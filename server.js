const http = require('http');
const fs = require('fs');
const Koa = require('koa');
const {koaBody} = require('koa-body');

const appServer = new Koa();

const base = fs.readFileSync('base.json')
const baseTickets = JSON.parse(base)

appServer.use(koaBody({
  urlencoded: true,
}));

appServer.use( ctx => {
  const { method, id } = ctx.request.query;

  switch (method) {
      case 'allTickets':
          ctx.response.body = baseTickets;
          return;

      case 'ticketById': 
          baseTickets.forEach(item => {
            if (item.id === +id) {
              ctx.response.body = item;
            }
          })
          return;

      case 'createTicket': 
          if (ctx.method === 'POST') {
            ctx.request.body.id = baseTickets[baseTickets.length-1].id + 1
            baseTickets.push(ctx.request.body)

            fs.writeFile('base.json', JSON.stringify(baseTickets), function(error){
              if(error) throw error; // если возникла ошибка
              console.log("Запись файла base.json завершена");
            })
          }
          return

      default:
          ctx.response.status = 404;
          return;
  }
});

const server = http.createServer(appServer.callback())


const port = 2121;

server.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Сервер запущен! \nАдрес localhost:' + port)
})

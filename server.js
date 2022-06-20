const http = require("http");
const fs = require('fs');

const requestListener = (request, response) => {
  response.setHeader('Content-Type', 'application/json');
  response.setHeader('X-Powered-By', 'NodeJS');
  response.setHeader('X-Author', 'Muhammad_Ashari_Abdillah');
  const { url, method } = request;

  switch (true) {
    case url === "/":
      switch (true) {
        case method === "GET":
          response.statusCode = 200
          response.end(JSON.stringify({
            message: 'Ini adalah Home Page'
          }))
          break;

        case method === "POST":
          response.statusCode = 200
          let key = ''

          request.on("data", (thisKey) => {
            key = thisKey
          })

          request.on("end", () => {
            response.end(JSON.stringify({
              message: key
            }));
          })
          break;

        case method === "PUT":
          response.statusCode = 200
          response.write('<html>');
          response.write('<body>');
          response.write('<h1>Hello World!</h1>');
          response.write('</body>');
          response.write('</html>');
          response.end();
          break;

        default:
          response.statusCode = 400;
          response.end(JSON.stringify({
            message: `Halaman tidak dapat diakses dengan ${method} request`
          }));
          break;
      }
      break;

    case url === "/about":
      switch (true) {
        case method === "POST":
          let body = [];

          request.on("data", (chunk) => {
            body.push(chunk);
          });

          request.on("end", () => {
            body = Buffer.concat(body).toString();
            const { name } = JSON.parse(body);
            response.end(JSON.stringify({
              message: `Hai ${name}`
            }));
          });
          break;

        case method === "GET":
            fs.readFile('server.txt', 'UTF-8', (err, data) => {

                switch (err) {
                    case err:
                        response.end(JSON.stringify({
                          message: 'Terjadi Kesalahan Saat Membaca File!!'
                        }))
                        break;
                }

                response.end(JSON.stringify({
                  message: data
                }))

            })
        break;

        default:
          response.statusCode = 400;
          response.end(JSON.stringify({
            message: `Halaman tidak dapat diakses dengan ${method} request`,
          }));
          break;
      }

    default:
      response.statusCode = 404;
      response.end(JSON.stringify({
        message: 'Halaman tidak ditemukan!',
      }))
      break;
  }
};

const server = http.createServer(requestListener);
const port = 5000;
const host = "localhost";

server.listen(port, host, () => {
  console.log(`Server Berjalan Pada http://${host}:${port}`);
});

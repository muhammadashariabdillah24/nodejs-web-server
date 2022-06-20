const http = require("http");
const fs = require("fs");

const requestListener = (request, response) => {
  // Response Header
  response.setHeader("Content-Type", "application/json");

  // Response Header Buatan Sendiri
  response.setHeader("X-Powered-By", "NodeJS");
  response.setHeader("X-Author", "Muhammad_Ashari_Abdillah");
  const { url, method } = request;

  switch (true) {
    case url === "/":
      switch (true) {
        case method === "GET":
          console.log(
            `URL: http://localhost:5000${url}\n
                     METHOD: ${method}
                    `
          );
          break;

        case method === "POST":
          console.log(
            `URL: http://localhost:5000/${url}\n
                     METHOD: ${method}
                    `
          );

        default:
          console.log(`Terjadi Kesalahan Pada URL: [ ${url} ]`);
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
            response.end(`<h1>Hai ${name}</h1>`);
          });
          break;

        case method === "GET":
          fs.readFile("server.txt", "UTF-8", (err, data) => {
            switch (err) {
              case err:
                console.log("Terjadi Kesalahan Saat Membaca File!!");
                break;
            }

            console.log(data);
          });
          break;

        default:
          console.log(`Terjadi Kesalahan Pada URL: [ ${url} ]`);
          break;
      }

    default:
      return request;
  }
};

const server = http.createServer(requestListener);
const port = 5000;
const host = "localhost";

server.listen(port, host, () => {
  console.log(`Server Berjalan Pada http://${host}:${port}`);
});

const http = require("http");

const requestListener = (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    const { url, method } = req;

    switch (true) {
        case url === '/':
            
            switch (true) {
                case method === 'GET':
                    res.statusCode = 200;
                    res.end('Ini adalah Home Page')
                    break;
            
                default:
                    res.statusCode = 400;
                    res.end(`Halaman tidak dapat diakses dengan ${method} request`);
                    break;
            }

        break;

        case url === '/about':
            
        switch (true) {
            case method === 'GET':
                res.statusCode = 200;
                res.end('Halo! Ini adalah halaman about');
                break;

            case method === 'POST':
                let  body = [];

                req.on("data", (thisName) => {
                    body.push(thisName);
                })

                req.on("end", () => {
                    body = Buffer.concat(body).toString();
                    const { name } = JSON.parse(body);
                    res.statusCode = 200;
                    res.end(`<h1>Halo, ${name}! Ini adalah halaman ${url}</h1>`)
                })
            break;

            default:
                res.statusCode = 400;
                res.end(`Halaman tidak dapat diakses dengan ${method} request`);
            break;
        }

        break;
    
        default:
            res.statusCode = 404;
            res.end(`Halaman Tidak Ditemukan!`);
            break;
    }
}

const server = http.createServer(requestListener);
const port = 7000;
const host = "localhost";

server.listen(port, host, () => {
  console.log(`Server Latihan Berjalan Pada  http://${host}:${port}`);
});

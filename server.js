const http = require('http');
const url = require('url');
const qs = require('qs');
const cookie = require('cookie');
const fs = require('fs');
let Controller = require('./controller/controller');


const server = http.createServer((req, res) => {
    let urlPath = url.parse(req.url, true).pathname;
    let queryString = url.parse(req.url, true).query
    let controller = new Controller();

    switch (urlPath) {
        case '/':
            controller.readPage('./view/home.html').then(dataHtml => {
                controller.getListCity().then(result => {
                    dataHtml = dataHtml.replace('{result}', result)
                    res.writeHead(200, 'ok', {'content-type': 'text/html'})
                    res.write(dataHtml);
                    res.end()
                });
            })
            break;

        case'/delete':
            controller.deleteCity(queryString.id).then(() => {
                res.writeHead(301, {location: '/'})
                res.end();
            });
            break;

        case '/edit':
            if (req.method === 'GET') {
                controller.readPage('./view/edit.html').then(dataHtml => {
                    controller.getCityInfo(queryString.id).then(result => {
                        dataHtml = dataHtml.replace('<input type="text" name="id">', `<input type="text" name="id" value="${result[0].id}" readonly>`)
                        dataHtml = dataHtml.replace('<input type="text" name="name">', `<input type="text" name="name" value="${result[0].name}">`)
                        dataHtml = dataHtml.replace('<input type="text" name="country">', `<input type="text" name="country" value="${result[0].country}">`)
                        dataHtml = dataHtml.replace('<input type="text" name="area">', `<input type="text" name="area" value="${result[0].area}">`)
                        dataHtml = dataHtml.replace('<input type="text" name="population">', `<input type="text" name="population" value="${result[0].population}">`)
                        dataHtml = dataHtml.replace('<input type="text" name="gdp">', `<input type="text" name="gdp" value="${result[0].gdp}">`)
                        res.writeHead(200, 'utf8', {'content-type': 'text/html'})
                        res.write(dataHtml)
                        res.end()
                    })
                })
            } else {
                let data = ''
                req.on('data', chunk => data += chunk)
                req.on('end', () => {
                    let dataForm = qs.parse(data)
                    controller.setCityInfo(dataForm.id, dataForm.name, dataForm.country, dataForm.area, dataForm.population, dataForm.gdp)
                        .then(() => {
                            res.writeHead(301, {location: '/'})
                            res.end()
                        }).catch(err => console.log(err))
                })
            }
            break;

        case '/add':
            let data = ''
            req.on('data', chunk => data += chunk)
            req.on('end', () => {
                let dataForm = qs.parse(data);
                controller.addNewCity(dataForm.name, dataForm.country, dataForm.area, dataForm.population, dataForm.gdp)
                    .then(() => {
                        res.writeHead(301, {location: '/'})
                        res.end();
                    })
            })
            break;

        case '/dasd':

            break;

    }

})

server.listen(8080, 'localhost', () => {
    console.log('http://localhost:8080');
})
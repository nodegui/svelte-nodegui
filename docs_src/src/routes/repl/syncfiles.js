import * as https from 'https';

export function post(req, res) {

    console.log("Got request!")
    let options = {
        hostname: 'play.nativescript.org',
        path: '/api/files',
        method: 'POST'
    }

    var creq = https.request(options, function (cres) {
        console.log("Got proxy response", cres.statusCode);
        cres.setEncoding('utf8');
        res.writeHead(cres.statusCode);

        cres.on('data', function (chunk) {
            res.write(chunk);
        });

        cres.on('close', function () {
            res.end();
        });

        cres.on('end', function () {
            res.end();
        });

    });

    creq.on('error', function (e) {
        console.log(e.message);
        res.writeHead(500);
        res.end();
    });

    req.on('data', function (chunk) {
        creq.write(chunk);
    })

    req.on('close', function () {
        creq.end();
    })

    req.on('end', function () {
        creq.end();
    })
}

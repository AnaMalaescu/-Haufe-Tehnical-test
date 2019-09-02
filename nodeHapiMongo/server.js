const Hapi = require('hapi');
const inert = require('inert');

const server = new Hapi.Server({
    host: 'localhost',
    port: 3101,
});

// add each route
server.route([
    {
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'I am the home route';
        },
    },
    {
        method: 'GET',
        path: '/example',
        handler: (request, h) => {
            return { msg: 'I am json' };
        },
    },
    {
        method: 'GET',
        path: '/mongoDB',
        handler: (request, h) => {
            return h.file('./main.html')
        },
    }
]);

// define server start function
const launch = async () => {
    try {
        await server.register(inert);
        await server.start();
    } catch (err) {
        console.error(err);
        process.exit(1);
    };
    console.log(`Server running at ${server.info.uri}`);
}

launch();

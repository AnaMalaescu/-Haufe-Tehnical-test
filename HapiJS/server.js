const hapi = require('hapi');
const server = hapi.server({
    port: 3000,
    host: 'localhost'
});

// route
server.route({
    method: 'GET',
    path: '/aboutus',
    handler: (req, h) => {
        return '<h1>About Us</h1>'
    }
})

const bootUpServer = async () => {
    await server.start();
    console.log(`Server is running at ${server.info.uri}`)

    process.on('unhandledRejection', (err) => {
        console.log(err);
        process.exit(1);
    })
}

bootUpServer();

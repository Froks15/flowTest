const Hapi = require('hapi');
const Boom = require("boom");
process.env.NODE_ENV = 'production';
const NODE_ENV = process.env.NODE_ENV || 'development';

const server = Hapi.server({
    port: 8000,
    host: 'localhost'
});

(async () => {
    server.route({
        method: 'GET',
        path: '/',
        handler: function (req, res) {
            try {
                return `hello, world`;
            } catch (error) {
                return new Boom(error);
            }
        }
    });

    const preResponse = function (request, h) {

        const response = request.response;
        if (!response.isBoom) {
            return h.continue;
        }

        const error = response;
        if (NODE_ENV === 'development') {
            error.reformat(true);
        }

        return error;
    };

    server.ext('onPreResponse', preResponse);

    process.on('unhandledRejection', err => {

        console.log(err);
        process.exit(1);
    });

    await server.start();
})();

module.exports = server;
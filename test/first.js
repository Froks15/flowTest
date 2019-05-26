'use strict';

const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');
const { afterEach, beforeEach, describe, it } = exports.lab = Lab.script();
const server = require('../production/index');

describe('GET /', () => {
    let res;

    beforeEach(async () => {
        res = await server.inject({
            method: 'get',
            url: '/'
        });
    });

    it('responds with 200', async () => {
        expect(res.statusCode).to.equal(200);
    });

    it('responds payload text', async () => {
        expect(res.payload).to.equal('hello, world');
    })
});
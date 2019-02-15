const expect = require('chai').expect;
const Utils = require('../../src/utils/Utils');

describe('Utils class', () => {
    describe('A method for making a successful response for Lambda', () => {
        it('should return an object with statusCode and body properties', () => {
            const response = Utils.success('');

            expect(response).to.be.an('object');
            expect(response).to.have.property('statusCode', 200);
            expect(response).to.have.property('body', '""');
        });

        it('should return an object with body property which holds JSON', () => {
            const response = Utils.success({ a: 123, b: "string" });

            expect(response).to.have.property('body', '{"a":123,"b":"string"}');
        });
    });

    describe('A method for making an error response for Lambda', () => {
        it('should return an object with statusCode and body properties', () => {
            const response = Utils.error('');

            expect(response).to.be.an('object');
            expect(response).to.have.property('statusCode', 400);
            expect(response).to.have.property('body', '""');
        });

        it('should return an object with body property which holds JSON', () => {
            const response = Utils.error({ a: 123, b: "string" });

            expect(response).to.have.property('body', '{"a":123,"b":"string"}');
        });
    });
});

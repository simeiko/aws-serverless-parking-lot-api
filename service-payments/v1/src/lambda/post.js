const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const verifyJWT = promisify(jwt.verify);
const Utils = require('../utils/Utils');
const Database = require('../utils/Database/Database');


exports.handler = async event => {
    if (!event.headers.pay_token) {
        return Utils.error({ message: 'Header `pay_token` must be present.' });
    }

    /**
     * @type {{id: number, cost_of_stay: number}}
     */
    let ticket;

    try {
        await verifyJWT(event.headers.pay_token, process.env.JWT_SECRET_KEY);
        // eslint-disable-next-line prefer-destructuring
        ticket = jwt.decode(event.headers.pay_token, process.env.JWT_SECRET_KEY).ticket;

        if (!ticket) {
            throw new Error('Ticket info is not present.');
        }
    } catch (e) {
        return Utils.error({ message: 'Unauthorized.' });
    }

    const db = new Database();
    await db.create.payment(ticket.id, ticket.cost_of_stay);
    db.close();

    return Utils.success({ message: 'Payment was completed successfully.' });
};

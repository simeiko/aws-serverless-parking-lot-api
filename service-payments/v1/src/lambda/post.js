const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const verifyJWT = promisify(jwt.verify);
const Utils = require('../utils/Utils');
const Database = require('../utils/Database/Database');

/**
 * POST: process pay_token and complete the payment.
 */
exports.handler = async event => {
    if (!event.headers.pay_token || !event.headers.credit_card) {
        return Utils.error({ message: 'Headers `pay_token` and `credit_card` must be present.' });
    }

    if (!/^\d{12,19}$/.test(event.headers.credit_card)) {
        return Utils.error({ message: 'Invalid credit card.' });
    }

    /** @type {{id: number, cost_of_stay: number}} */
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

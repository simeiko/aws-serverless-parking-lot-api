const jwt = require('jsonwebtoken');
const AWS = require('aws-sdk');
const { promisify } = require('util');
const sns = new AWS.SNS();

const verifyJWT = promisify(jwt.verify);
const Utils = require('../utils/Utils');
const Database = require('../utils/Database/Database');

/**
 * POST: process pay_token and complete the payment.
 * @todo before creating a ticket, ensure that ticket was not paid.
 */
exports.handler = async event => {
    if (!event.headers.pay_token || !event.headers.credit_card) {
        return Utils.error({ message: 'Headers `pay_token` and `credit_card` must be present.' });
    }

    // Validate credit card number. Let's pretend that we actually take money...
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

    // Notify other microservices about successful payment.
    sns.publish({
        Message: `Successful payment for ticket ID ${ticket.id}`,
        TopicArn: `arn:aws:sns:us-east-1:${process.env.AWS_ACCOUNT_ID}:closeTicket`,
    });

    return Utils.success({ message: 'Payment was completed successfully.' });
};

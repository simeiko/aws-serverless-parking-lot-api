const jwt = require('jsonwebtoken');
const Database = require('../utils/Database/Database');
const Utils = require('../utils/Utils');
const PriceCalculator = require('../utils/PriceCalculator');

/**
 * GET: Retrieve ticket information.
 */
exports.handler = async event => {
    const db = new Database();
    const id = parseInt(event.pathParameters.id, 10);

    if (!Number.isInteger(id) || id <= 0 || !Number.isFinite(id)) {
        return Utils.error({ message: 'Invalid ID' });
    }

    const ticket = await db.read.ticket(id);
    db.close();

    if (!ticket) {
        return Utils.error({ message: 'Ticket does not exist.' });
    }

    if (ticket.paid_at !== null) {
        return Utils.error({ message: 'Ticket was already paid.' });
    }

    const stayDuration = Math.round(((Date.now() - Date.parse(ticket.issued_at)) / 1000 / 60));
    const costOfStay = PriceCalculator.calculate(stayDuration);

    return Utils.success({
        ticket_id: id,
        cost_of_stay: costOfStay,
        stay_duration: stayDuration,
        pay_token: jwt.sign(
            { ticket: { id, cost_of_stay: costOfStay } },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '2m' }
        )
    });
};

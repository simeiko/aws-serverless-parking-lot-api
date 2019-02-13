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

    if (!ticket) {
        return Utils.error({ message: 'Ticket does not exist.' });
    }

    if (ticket.paid_at !== null) {
        return Utils.error({ message: 'Ticket was already paid.' });
    }

    const stayDuration = Math.round(((Date.now() - Date.parse(ticket.issued_at)) / 1000 / 60));

    return Utils.success({
        ticket_id: id,
        cost_of_stay: PriceCalculator.calculate(stayDuration),
        stay_duration: stayDuration
    });
};

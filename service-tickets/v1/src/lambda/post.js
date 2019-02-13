const Database = require('../utils/Database/Database');
const Utils = require('../utils/Utils');

/**
 * POST: Create ticket if there are available spots.
 */
exports.handler = async () => {
    const db = new Database();

    if (await db.read.availableSpots() === 0) {
        return Utils.error({ message: 'All parking lots are taken.' });
    }

    const ticketID = await db.create.ticket();

    return Utils.success({
        ticket_id: ticketID
    });
};

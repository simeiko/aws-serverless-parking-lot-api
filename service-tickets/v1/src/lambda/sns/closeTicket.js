const Database = require('../../utils/Database/Database');

/**
 * SNS: Update ticket with `paid_at` date (close ticket).
 */
exports.handler = async event => {
    const message = event.Records[0].Sns.Message;
    const ticketID = message.match(/\d+/)[0];
    const db = new Database();

    await db.update.ticket(
        ticketID,
        { paid_at: new Date().toISOString().slice(0, 19).replace('T', ' ') }
    );

    db.close();
};

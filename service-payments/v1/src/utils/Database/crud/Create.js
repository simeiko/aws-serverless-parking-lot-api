class Create {
    /**
     * Initialize Read functions.
     *
     * @public
     * @version 1.0
     * @param {Knex|Knex.QueryInterface|Knex.QueryBuilder} knex
     */
    constructor(knex) {
        this.query = knex;
    }

    /**
     * Make payment.
     *
     * @public
     * @version 1.0
     * @param   {number} ticketId   Ticket ID
     * @param   {number} amount     Pay amount
     * @returns {Promise<number>} Payment ID
     */
    async payment(ticketId, amount) {
        const [paymentID] = await this.query('payments')
            .returning('id')
            .insert({ ticket_id: ticketId, amount });

        return paymentID;
    }
}

module.exports = Create;

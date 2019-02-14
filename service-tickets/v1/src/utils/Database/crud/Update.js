class Update {
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
     * Update ticket by ID.
     *
     * @public
     * @version 1.0
     * @param   {number} id     Ticket ID
     * @param   {Ticket} data   Ticket data
     * @returns {Promise<void>}
     */
    async ticket(id, data) {
        await this.query('tickets')
            .where('id', '=', id)
            .update(data);
    }
}

module.exports = Update;

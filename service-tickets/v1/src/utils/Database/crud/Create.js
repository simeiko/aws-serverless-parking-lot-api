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
     * Create ticket.
     *
     * @public
     * @version 1.0
     * @returns {Promise<number>} Ticket ID
     */
    async ticket() {
        const [ticketID] = await this.query('tickets')
            .returning('id')
            .insert({});

        return ticketID;
    }
}

module.exports = Create;

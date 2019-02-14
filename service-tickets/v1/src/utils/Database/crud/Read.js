class Read {
    /**
     * @typedef  {Object} Ticket
     * @property {number}       [id]        Ticket ID
     * @property {string}       [issued_at] Issue date
     * @property {string|null}  [paid_at]   Paid date
     */

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
     * Get number of available spots.
     *
     * @public
     * @version 1.0
     * @returns {Promise<number>} Number of available spots
     */
    async availableSpots() {
        const spotsInUse = await this.query('tickets')
            .where('paid_at', null);

        return process.env.LOT_LIMIT - spotsInUse.length;
    }

    /**
     * Get ticket information by ID.
     *
     * @public
     * @version 1.0
     * @param   {number} id Ticket ID
     * @returns {Promise<Ticket>}
     */
    async ticket(id) {
        const [ticket] = await this.query('tickets')
            .where('id', id);

        return ticket;
    }
}

module.exports = Read;

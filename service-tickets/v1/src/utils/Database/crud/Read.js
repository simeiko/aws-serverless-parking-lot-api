class Read {
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
    async getAvailableSpots() {
        const spotsInUse = await this.query('tickets')
            .where('paid_at', null);

        return process.env.LOT_LIMIT - spotsInUse.length;
    }
}

module.exports = Read;

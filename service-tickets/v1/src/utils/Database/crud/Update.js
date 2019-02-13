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
}

module.exports = Update;

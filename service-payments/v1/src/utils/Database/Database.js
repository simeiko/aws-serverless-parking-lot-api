const knex = require('knex');
const Create = require('./crud/Create');

/**
 * Database facade.
 */
class Database {
    /**
     * Initialize database connection.
     *
     * @public
     * @version 1.0
     */
    constructor() {
        /**
         * @private
         * @type {Knex.QueryBuilder | Knex}
         */
        this.knex = knex({
            client: 'mysql',
            connection: {
                host: process.env.MYSQL_HOST,
                user: process.env.MYSQL_USER,
                password: process.env.MYSQL_PASSWORD,
                database: process.env.MYSQL_DATABASE
            }
        });

        /**
         * @public
         * @type {Create}
         */
        this.create = new Create(this.knex);
    }

    /**
     * Close database connection.
     *
     * @public
     * @version 1.0
     */
    close() {
        if (this.knex !== null) {
            this.knex.destroy();
        }
    }
}

module.exports = Database;

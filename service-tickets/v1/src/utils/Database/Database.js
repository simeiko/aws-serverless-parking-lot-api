const knex = require('knex');
const Read = require('crud/Read');
const Create = require('crud/Create');
const Update = require('crud/Update');

/**
 * Database facade.
 */
class Database
{
    /**
     * Initialize database connection.
     *
     * @public
     * @version 1.0
     */
    constructor()
    {
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
         * @type {Read}
         */
        this.read = new Read(this.knex);

        /**
         * @public
         * @type {Create}
         */
        this.create = new Create(this.knex);

        /**
         * @public
         * @type {Update}
         */
        this.update = new Update(this.knex);
    }

    /**
     * Close database connection.
     *
     * @public
     * @version 1.0
     */
    close()
    {
        if (this.knex !== null) {
            this.knex.destroy();
        }
    }
}

module.exports = Database;

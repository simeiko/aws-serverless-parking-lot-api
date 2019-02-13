class PriceCalculator {
    /**
     * @typedef  {Object} PriceLevelDetails
     * @property {number} cost_per_hour Cost of stay per hour
     * @property {number} min_stay      Min stay (in minutes)
     * @property {number} max_stay      Max stay (in minutes)
     */

    /**
     * Get price level details.
     *
     * @private
     * @version 1.0
     * @returns {{
     *      less_than_1hr: PriceLevelDetails,
     *      less_than_3hr: PriceLevelDetails,
     *      less_than_6hr: PriceLevelDetails,
     *      all_day: PriceLevelDetails
     *  }}
     */
    static get prices() {
        return {
            less_than_1hr: {
                cost_per_hour: 3.00,
                min_stay: 0,
                max_stay: 60
            },
            less_than_3hr: {
                cost_per_hour: 4.50,
                min_stay: 60,
                max_stay: 180
            },
            less_than_6hr: {
                cost_per_hour: 6.75,
                min_stay: 180,
                max_stay: 360
            },
            all_day: {
                cost_per_hour: 10.125,
                min_stay: 360,
                max_stay: Infinity
            }
        };
    }

    /**
     * Calculate cost of stay.
     *
     * @public
     * @version 1.0
     * @throws  {Error}             Will throw an error if can't calculate the price
     * @param   {number} duration   Duration of stay in minutes
     * @returns {number}            Cost of stay
     */
    static calculate(duration) {
        const prices = Object.values(PriceCalculator.prices);

        for (/** @type {PriceLevelDetails} */ const price of prices) {
            if (duration >= price.min_stay && duration <= price.max_stay) {
                return Math.ceil(duration / 60) * price.cost_per_hour; // Round up.
            }
        }

        throw new Error('Can\'t calculate the price of stay.');
    }
}

module.exports = PriceCalculator;

class Utils {
    /**
     * Get successful response message for Lambda.
     *
     * @public
     * @version 1.0
     * @param   {*} message Response message
     * @returns {{statusCode: number, body: *}}
     */
    static success(message) {
        return {
            statusCode: 200,
            body: JSON.stringify(message)
        };
    }

    /**
     * Get error response message for Lambda.
     *
     * @public
     * @version 1.0
     * @param   {*} message Response message
     * @returns {{statusCode: number, body: *}}
     */
    static error(message) {
        return {
            statusCode: 400,
            body: JSON.stringify(message)
        };
    }
}

module.exports = Utils;

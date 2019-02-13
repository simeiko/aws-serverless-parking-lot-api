const Database = require('../utils/Database/Database');

exports.handler = async event => {
    const db = new Database();

    return {
        statusCode: 200,
        body: JSON.stringify(
            await db.read.getAvailableSpots()
        )
    };
};

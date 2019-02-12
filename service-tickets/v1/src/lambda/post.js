const Database = require('../utils/Database/Database');

exports.handler = async event => {
    return {
        statusCode: 200,
        body: JSON.stringify('Hello!')
    };
};

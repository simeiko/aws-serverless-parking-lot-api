const AWS = require('aws-sdk');

let sns;

/**
 * This was required by `serverless-offline-sns` plugin.
 * Without this it will not be possible to test SNS locally.
 * @todo Find other way to handle local development. Dirty & ugly.
 */
if (process.env.STAGE === 'local') {
    AWS.config.update({ accessKeyId: 'aaa', secretAccessKey: 'aaa' });

    sns = new AWS.SNS({
        endpoint: 'http://localhost:4000',
        region: 'us-east-1'
    });
} else {
    sns = new AWS.SNS();
}

class SNS {
    /**
     * Publish message to SNS topic.
     *
     * @public
     * @version 1.0
     * @param   {string} topic      SNS Topic
     * @param   {string} message    Message
     * @param   {string} region     AWS Region
     */
    static publish(topic, message, region = 'us-east-1') {
        sns.publish({
            Message: message,
            TopicArn: `arn:aws:sns:${region}:${process.env.AWS_ACCOUNT_ID}:${topic}`,
        }, (error) => { if (error) SNS.handleError(error); });
    }

    /**
     * Handle SNS errors.
     *
     * @private
     * @version 1.0
     * @param   {*} error
     */
    static handleError(error) {
        // eslint-disable-next-line no-console
        console.log(error); // This will be saved by AWS CloudWatch.
    }
}

module.exports = SNS;

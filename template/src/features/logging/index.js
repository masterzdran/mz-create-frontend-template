const { logs } = require('@opentelemetry/api-logs');

function getLogger(name = 'app-logger') {
    return logs.getLogger(name);
}

function logInfo(message, context = {}, loggerName = 'app-logger') {
    const logger = getLogger(loggerName);
    logger.emit({
        severityText: 'INFO',
        body: message,
        attributes: context,
    });
}

function logWarn(message, context = {}, loggerName = 'app-logger') {
    const logger = getLogger(loggerName);
    logger.emit({
        severityText: 'WARN',
        body: message,
        attributes: context,
    });
}

function logError(message, context = {}, loggerName = 'app-logger') {
    const logger = getLogger(loggerName);
    logger.emit({
        severityText: 'ERROR',
        body: message,
        attributes: context,
    });
}

module.exports = {
    logInfo,
    logWarn,
    logError,
    getLogger,
};
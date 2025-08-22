"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startOpenTelemetry = startOpenTelemetry;
const { NodeSDK } = require("@opentelemetry/sdk-node");
const { getNodeAutoInstrumentations } = require("@opentelemetry/auto-instrumentations-node");
const { OTLPTraceExporter } = require("@opentelemetry/exporter-trace-otlp-http");
const { OTLPLogExporter } = require("@opentelemetry/exporter-logs-otlp-http");
const { LoggerProvider } = require("@opentelemetry/sdk-logs");
const { logInfo, logWarn } = require('../logging');

function startOpenTelemetry() {
    const otlpEndpoint = process.env.OTEL_EXPORTER_OTLP_ENDPOINT;
    let traceExporter, logExporter;
    if (otlpEndpoint) {
        traceExporter = new OTLPTraceExporter({ url: otlpEndpoint });
        logExporter = new OTLPLogExporter({ url: otlpEndpoint });
        logInfo("[otel] OTLP endpoint configured: " + otlpEndpoint);
    }
    else {
        traceExporter = undefined;
        logExporter = undefined;
        logWarn('[otel] No OTLP endpoint configured. Traces and logs will not be exported.');
    }
    // Set up the LoggerProvider and add the OTLPLogExporter if available
    if (logExporter) {
        const loggerProvider = new LoggerProvider();
        loggerProvider.addLogRecordProcessor(
            new (require("@opentelemetry/sdk-logs").BatchLogRecordProcessor)(logExporter)
        );
        loggerProvider.register();
    }
    const sdk = new NodeSDK({
        traceExporter: traceExporter,
        instrumentations: [getNodeAutoInstrumentations()],
    });
    const result = sdk.start();
    if (result && typeof result.then === "function") {
        return result.then(function () {
            console.log('[otel] OpenTelemetry SDK started');
        });
    }
    else {
        return Promise.resolve(console.log('[otel] OpenTelemetry SDK started (no exporter)'));
    }
}
module.exports = { startOpenTelemetry };
//# sourceMappingURL=startOpenTelemetry.js.map

